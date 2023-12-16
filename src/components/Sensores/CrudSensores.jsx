import { useEffect, useState } from "react";
import styles from "@/styles/CrudSensores.module.css"
import axios from "axios";

export default function CrudSensores(props) {
  const urlAPI = "http://localhost:5088/api/Sensor/";
  const [sensor, setSensor] = useState(props.sensorForm);
  const initialState = { id: 0, descricao: "" };
  const limpar = () => {
    setSensor(initialState);
  };
  const salvar = () => {
    const dadosSensor = props.sensorForm;
    dadosSensor.c = Number(dadosSensor.id);
    const metodo = dadosSensor.id ? "put" : "delete";
    const url = dadosSensor.id ? `${urlAPI}${dadosSensor.id}` : urlAPI;
    console.log("metodo do salvar: " + metodo + url);
    axios[metodo](url, dadosSensor).then((resp) => {
      limpar();
    });
  };
  const atualizaCampo = (evento) => {
    //clonar usuário a partir do state, para não alterar o state diretamente
    const sensorAtual = { ...props.sensorForm };
    //usar o atributo NAME do input para identificar o campo a ser atualizado
    sensorAtual[evento.target.name] = evento.target.value;
    //atualizar o state
    props.sensorSet(sensorAtual);
  };
  return (
    <div className={styles.incluiContainer}>
      
      <label className={styles.labelForm}> Descrição: </label>
      <input
        type="text"
        id="descricao"
        className={styles.formInput}
        name="descricao"
        value={props.sensorForm.descricao}
        onChange={(e) => atualizaCampo(e)}
      />
      
      <button className={styles.btnSalvar} onClick={(e) => salvar(e)}>
        Salvar
      </button>
   </div>
  );
}
