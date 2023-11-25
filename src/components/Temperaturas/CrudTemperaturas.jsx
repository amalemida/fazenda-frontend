import { useEffect, useState } from "react";
import styles from "@/styles/CrudTemperaturas.module.css";
import axios from "axios";

export default function CrudTemperaturas(props) {
  const urlAPI = "http://localhost:5088/api/Temperatura/";
  const [temperatura, setTemperatura] = useState(props.temperaturaForm);
  const initialState = { id: 0, tmax: 0.0, tmin: 0.0, data: "", hora: "", sensorId: 0 };
  const limpar = () => {
    setTemperatura(initialState);
  };
  const salvar = () => {
    const dadosTemperatura = props.temperaturaForm;
    dadosTemperatura.c = Number(dadosTemperatura.id);
    const metodo = dadosTemperatura.id ? "put" : "post";
    const url = dadosTemperatura.id ? `${urlAPI}${dadosTemperatura.id}` : urlAPI;
    console.log("metodo do salvar: " + metodo + url);
    axios[metodo](url, dadosTemperatura).then((resp) => {
      limpar();
    });
  };
  const atualizaCampo = (evento) => {
    //clonar usuário a partir do state, para não alterar o state diretamente
    const temperaturaAtual = { ...props.temperaturaForm };
    //usar o atributo NAME do input para identificar o campo a ser atualizado
    temperaturaAtual[evento.target.name] = evento.target.value;
    //atualizar o state
    props.temperaturaSet(temperaturaAtual);
  };
  return (
    <div className={styles.incluiContainer}>
      <label className={styles.labelForm}> Tmax: </label>
      <input
        type="number"
        id="tmax"
        className={styles.formInput}
        name="tmax"
        value={props.temperaturaForm.tmax}
        onChange={(e) => atualizaCampo(e)}
      />
      <label> Tmin: </label>
      <input
        type="number"
        id="tmin"
        className={styles.formInput}
        name="tmin"
        value={props.temperaturaForm.tmin}
        onChange={(e) => atualizaCampo(e)}
      />
      <label> Data: </label>
      <input
        type="text"
        id="data"
        className={styles.formInput}
        name="data"
        value={props.temperaturaForm.data}
        onChange={(e) => atualizaCampo(e)}
      />
      <label> Hora: </label>
      <input
        type="text"
        id="hora"
        className={styles.formInput}
        name="hora"
        value={props.temperaturaForm.hora}
        onChange={(e) => atualizaCampo(e)}
      />
      <label> Sensor: </label>
      <input
        type="number"
        id="sensorId"
        className={styles.formInput}
        name="sensorId"
        value={props.temperaturaForm.sensorId}
        onChange={(e) => atualizaCampo(e)}
      />
      <button className={styles.btnSalvar} onClick={(e) => salvar(e)}>
        Salvar
      </button>
      <button className={styles.btnCancelar} onClick={(e) => limpar(e)}>
        Cancelar
      </button>
    </div>
  );
}
