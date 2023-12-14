import { useEffect, useState } from "react";
import styles from "@/styles/ListaCulturas.module.css";
import { IconeEdicao, IconeLixo } from "@/components/Icones";
import axios from "axios";

export default function ListaCulturas(props) {
  const urlAPI = "http://localhost:5088/api/Cultura/";
  const [lista, setLista] = useState([]);
  
    useEffect(() => {
      axios(urlAPI).then((resp) => {
        setLista(resp.data);
      });
    }, []);
    const renderTable = () => {
      return (
        <table className={styles.tabCulturas}>
          <thead>
            <tr className={styles.cabecTabela}>
              <th className={styles.tabTituloCultura}>Id</th>
              <th className={styles.tabTituloCultura}>Nome</th>
              <th className={styles.tabTituloCultura}>Tbasal</th>
              <th className={styles.tabTituloCultura}>GD</th>
              <th className={styles.tabTituloCultura}>SGD</th>
              <th className={styles.tabTituloCultura}>Sensor</th>
              <th className={styles.tabTituloCultura}>Irrigar</th>
              <th className={styles.tabTituloCultura}>Colher</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {lista.map((cultura, i) => {
              let mensagemColher = ''
              let corColher = ''
              if (cultura.colher) {
                mensagemColher = 'Pode colher'
                corColher = styles.verde;
              } else {
                mensagemColher = 'Ainda não pode colher'
              }
              let mensagemIrrigar = ''
              let corIrrigar = '';
              if (cultura.irrigar) {
                mensagemIrrigar = 'Hora de irrigar'
                corIrrigar = styles.vermelho;
              } else {
                mensagemIrrigar = 'Umidade adequada'
              }
              return (
                <tr key={cultura.id}>
                  <td> {cultura.id} </td>
                  <td> {cultura.nome} </td>
                  <td> {cultura.tbasal} </td>
                  <td> {cultura.gd} </td>
                  <td> {cultura.sgd} </td>
                  <td> {cultura.sensorId} </td>
                  <td className={corIrrigar}> {mensagemIrrigar} </td>
                  <td className={corColher}> {mensagemColher} </td>
                  <td>
                    <button
                      className={styles.linhaButton}
                      style={{ color: "blue" }}
                      onClick={() => props.carregar(cultura)}
                      >
                      {IconeEdicao}
                    </button>
                    <button
                      className={styles.linhaButton}
                      style={{ color: "red" }}
                      onClick={() => props.remover(cultura)}
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
