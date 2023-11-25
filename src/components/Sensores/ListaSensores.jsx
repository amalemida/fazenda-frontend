import { useEffect, useState } from "react";
import styles from "@/styles/ListaSensores.module.css";
import { IconeEdicao, IconeLixo } from "@/components/Icones";
import axios from "axios";

export default function ListaSensores(props) {
  const urlAPI = "http://localhost:5088/api/Sensor/";
  const [lista, setLista] = useState([]);

    useEffect(() => {
      axios(urlAPI).then((resp) => {
        setLista(resp.data);
      });
    }, []);
    const renderTable = () => {
      return (
        <table className={styles.tabSensores}>
          <thead>
            <tr className={styles.cabecTabela}>
              <th className={styles.tabTituloSensor}>Id</th>
              <th className={styles.tabTituloSensor}>Descrição</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {lista.map((sensor, i) => {
              return (
                <tr key={sensor.id}>
                  <td> {sensor.id} </td>
                  <td> {sensor.descricao} </td>
                  <td>
                    <button
                      className={styles.linhaButton}
                      style={{ color: "blue" }}
                      onClick={() => props.carregar(sensor)}
                    >
                      {IconeEdicao}
                    </button>
                    <button
                      className={styles.linhaButton}
                      style={{ color: "red" }}
                      onClick={() => props.remover(sensor)}
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
