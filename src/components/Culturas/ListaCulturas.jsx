import { useEffect, useState } from "react";
import styles from "@/styles/ListaCulturas.module.css";
import { IconeEdicao, IconeLixo, IconeVoltar, IconeLupa } from "@/components/Icones";
import axios from "axios";
import { format } from 'date-fns';

export default function ListaCulturas(props) {
  const urlAPI = "http://localhost:5088/api/Cultura/";
  const [lista, setLista] = useState([]);
  const [temperaturas, setTemperaturas] = useState([]);
  const [culturaSelecionada, setCulturaSelecionada] = useState(null);

  useEffect(() => {
    axios(urlAPI).then((resp) => {
      setLista(resp.data);
    });
  }, []);

  const carregarTemperaturas = (cultura) => {
    axios(`${urlAPI}${cultura.id}/Temperatura`).then((resp) => {
      setTemperaturas(resp.data);
      setCulturaSelecionada(cultura);
    });
  };

  const voltarParaLista = () => {
    setCulturaSelecionada(null);
  };

  const renderTable = () => {
    return (
      <table className={styles.tabCulturas}>
        <thead>
          <tr className={styles.cabecTabela}>
            <th className={styles.tabTituloId}>Id</th>
            <th className={styles.tabTituloNome}>Nome</th>
            <th className={styles.tabTituloCultura}>Tbasal</th>
            <th className={styles.tabTituloCultura}>GD</th>
            <th className={styles.tabTituloCultura}>SGD</th>
            <th className={styles.tabTituloSensor}>Sensor</th>
            <th className={styles.tabTituloCultura}>Colher</th>
            <th className={styles.tabTituloCultura}>Irrigar</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {lista.map((cultura, i) => {
            let mensagemColher = "";
            let corColher = "";
            if (cultura.colher) {
              mensagemColher = "Pode colher";
              corColher = styles.verde;
            } else {
              mensagemColher = "Ainda não pode colher";
            }
            let mensagemIrrigar = "";
            let corIrrigar = "";
            if (cultura.irrigar) {
              mensagemIrrigar = "Hora de irrigar";
              corIrrigar = styles.vermelho;
            } else {
              mensagemIrrigar = "Umidade adequada";
            }

            if (culturaSelecionada && cultura.id !== culturaSelecionada.id) {
              return null;
            }

            return (
              <tr key={cultura.id}>
                <td> {cultura.id} </td>
                <td> {cultura.nome} </td>
                <td> {cultura.tbasal} </td>
                <td> {cultura.gd} </td>
                <td> {cultura.sgd} </td>
                <td> {cultura.sensorId} </td>
                <td className={corColher}> {mensagemColher} </td>
                <td className={corIrrigar}> {mensagemIrrigar} </td>
                <td>
                {!culturaSelecionada && (
                  <button
                    className={styles.btnEditar}
                    style={{ color: "blue" }}
                    onClick={() => props.carregar(cultura)}
                  >
                    {IconeEdicao}
                  </button>
                )}
                  {!culturaSelecionada && (
                  <button
                    className={styles.btnRemover}
                    style={{ color: "red" }}
                    onClick={() => props.remover(cultura)}
                  >
                    {IconeLixo}
                  </button>
                  )}
                  {culturaSelecionada && (
                  <button
                    className={styles.btnVoltar}
                    onClick={() => setCulturaSelecionada(null)}
                  >
                    {IconeVoltar}
                  </button>
                )}
                </td>
                <td>
                {!culturaSelecionada && (
                  <button
                    className={styles.btnTemperatura}
                    style={{ color: "black" }}
                    onClick={() => carregarTemperaturas(cultura)}
                  >
                    {IconeLupa}
                  </button>
                )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  const renderTemperaturas = () => {
    if (culturaSelecionada) {
      return (
        <div>
          <h3 className={styles.H3}>Temperaturas de {culturaSelecionada.nome}</h3>
          <table className={styles.tabTemperaturas}>
            <thead>
              <tr className={styles.cabecTabela}>
                <th className={styles.tabTituloCultura}>Data</th>
                <th className={styles.tabTituloCultura}>Tmin</th>
                <th className={styles.tabTituloCultura}>Tmedia</th>
                <th className={styles.tabTituloCultura}>Tmax</th>
                <th className={styles.tabTituloCultura}>Sensor</th>
              </tr>
            </thead>
            <tbody>
              {temperaturas.map((temperatura) => (
                <tr key={temperatura.id}>
                  <td>{format(new Date(temperatura.data), 'dd-MM-yyyy')}</td>
                  <td>{temperatura.tmin}</td>
                  <td>{temperatura.tmedia}</td>
                  <td>{temperatura.tmax}</td>
                  <td>{temperatura.sensorId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {renderTable()}
      {renderTemperaturas()}
    </div>
  );
}
