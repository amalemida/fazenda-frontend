import { useEffect, useState } from "react";
import styles from "../../styles/ListaPlantio.module.css";
import { IconeEdicao, IconeLixo } from "@/components/Icones";
import axios from "axios";
import { format } from 'date-fns';

export default function ListaPlantios(props) {
  const urlAPI = "http://localhost:5088/api/Plantio/";
  const [lista, setLista] = useState([]);

    useEffect(() => {
      axios(urlAPI).then((resp) => {
        setLista(resp.data);
      });
    }, []);
    const renderTable = () => {
      return (
        <table className={styles.tabPlantios}>
          <thead>
            <tr className={styles.cabecTabela}>
              <th className={styles.tabTituloId}>Id</th>
              <th className={styles.tabTituloPlantio}>Data de Inicio</th>
              <th className={styles.tabTituloPlantio}>Data do Fim</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {lista.map((plantio, i) => {
              return (
                <tr key={plantio.id}>
                  <td> {plantio.id} </td>
                  <td>{format(new Date(plantio.dataInicio), 'dd-MM-yyyy')}</td>
                  <td>{format(new Date(plantio.dataFim), 'dd-MM-yyyy')}</td>
                  <td>
                    <button
                      className={styles.linhaButton}
                      style={{ color: "blue" }}
                      onClick={() => props.carregar(plantio)}
                    >
                      {IconeEdicao}
                    </button>
                    <button
                      className={styles.linhaButton}
                      style={{ color: "red" }}
                      onClick={() => props.remover(plantio)}
                    >
                      {IconeLixo}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    };
    return <div>{renderTable()}</div>;
}
