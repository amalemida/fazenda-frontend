import { useEffect, useState } from "react";
import styles from "@/styles/CrudPlantios.module.css"
import axios from "axios";

export default function CrudPlantios(props) {
  const urlAPI = "http://localhost:5088/api/Plantio/";
  const [plantio, setPlantio] = useState(props.plantioForm);
  const initialState = { id: 0, dataInicio: "", dataFim: "" };
  const limpar = () => {
    setPlantio(initialState);
  };
  const salvar = () => {
    const dadosPlantio = props.plantioForm;
    dadosPlantio.c = Number(dadosPlantio.id);
    const metodo = dadosPlantio.id ? "put" : "post";
    const url = dadosPlantio.id ? `${urlAPI}${dadosPlantio.id}` : urlAPI;
    console.log("metodo do salvar: " + metodo + url);
    axios[metodo](url, dadosPlantio).then((resp) => {
      limpar();
    });
  };
  const atualizaCampo = (evento) => {
    //clonar usuário a partir do state, para não alterar o state diretamente
    const plantioAtual = { ...props.plantioForm };
    //usar o atributo NAME do input para identificar o campo a ser atualizado
    plantioAtual[evento.target.name] = evento.target.value;
    //atualizar o state
    props.plantioSet(plantioAtual);
  };
  return (
    <div className={styles.incluiContainer}>
      
      <label className={styles.labelForm}> Data de inicio do plantio: </label>
      <input
        type="text"
        id="dataInicio"
        className={styles.formInput}
        name="dataInicio"
        value={props.plantioForm.dataInicio}
        onChange={(e) => atualizaCampo(e)}
      />

      <label className={styles.labelForm}> Data do fim do plantio: </label>
      <input
        type="text"
        id="dataFim"
        className={styles.formInput}
        name="dataFim"
        value={props.plantioForm.dataFim}
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
