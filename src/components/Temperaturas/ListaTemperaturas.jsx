import { useEffect, useState } from "react";
import styles from "@/styles/ListaTemperaturas.module.css";
import { IconeEdicao, IconeLixo } from "@/components/Icones";
import axios from "axios";

export default function ListaTemperaturas(props) {
  const urlAPI = "http://localhost:5088/api/Temperatura/";
  const [lista, setLista] = useState([]);

  useEffect(() => {
    axios(urlAPI).then((resp) => {
      setLista(resp.data);
    });
  }, []);
  const renderTable = () => {
    return (
      <table className={styles.tabTemperaturas}>
        <thead>
          <tr className={styles.cabecTabela}>
            <th className={styles.tabTituloTemperatura}>Data</th>
            <th className={styles.tabTituloTemperatura}>Tmax</th>
            <th className={styles.tabTituloTemperatura}>Tmin</th>
            <th className={styles.tabTituloTemperatura}>Tmedia</th>
            <th className={styles.tabTituloTemperatura}>Sensor</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {lista.map((temperatura, i) => {
            return (
              <tr key={temperatura.id}>
                <td> {temperatura.data} </td>
                <td> {temperatura.tmax} </td>
                <td> {temperatura.tmin} </td>
                <td> {temperatura.tmedia} </td>
                <td> {temperatura.sensorId} </td>
                <td>
                  <button
                    className={styles.linhaButton}
                    style={{ color: "blue" }}
                    onClick={() => props.carregar(temperatura)}
                  >
                    {IconeEdicao}
                  </button>
                  <button
                    className={styles.linhaButton}
                    style={{ color: "red" }}
                    onClick={() => props.remover(temperatura)}
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
