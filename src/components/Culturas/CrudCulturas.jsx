import { useEffect, useState } from "react";
import styles from "@/styles/CrudCulturas.module.css"
import axios from "axios";

const urlSensores = "http://localhost:5088/api/Sensor/";

export default function CrudCulturas(props) {
  const urlAPI = "http://localhost:5088/api/Cultura/";
  const [sensores, setSensores] = useState([]);
  const [cultura, setCultura] = useState(props.culturaForm);
  const initialState = { id: 0,  nome: "", tbasal: 0.0, gb: 0.0, gd:0.0, sgd:.0, sensorId: 0, irrigar: false, colher: false };
  const limpar = () => {
    setCultura(initialState);
  };
  const salvar = () => {
    const dadosCultura = props.culturaForm;
    dadosCultura.c = Number(dadosCultura.id);
    const metodo = dadosCultura.id ? "put" : "post";
    const url = dadosCultura.id ? `${urlAPI}${dadosCultura.id}` : urlAPI;
    console.log("metodo do salvar: " + metodo + url);
    axios[metodo](url, dadosCultura).then((resp) => {
      limpar();
    });
  };

  useEffect(() => {
    axios.get(urlSensores).then((response) => {
      setSensores(response.data);
    });
  }, []);
  const atualizaCampo = (evento) => {
    //clonar usuário a partir do state, para não alterar o state diretamente
    const culturaAtual = { ...props.culturaForm };
    //usar o atributo NAME do input para identificar o campo a ser atualizado
    culturaAtual[evento.target.name] = evento.target.value;
    //atualizar o state
    props.culturaSet(culturaAtual);
  };
  return (
    <div className={styles.incluiContainer}>
      <label className={styles.labelForm}> Nome: </label>
      <input
        type="text"
        id="nome"
        className={styles.formInput}
        name="nome"
        value={props.culturaForm.nome}
        onChange={(e) => atualizaCampo(e)}
      />
      <label> Tbasal: </label>
      <input
        type="text"
        id="tbasal"
        className={styles.formInput}
        name="tbasal"
        value={props.culturaForm.tbasal}
        onChange={(e) => atualizaCampo(e)}
      />
      <label> GD: </label>
      <input
        type="number"
        id="gd"
        className={styles.formInput}
        name="gd"
        value={props.culturaForm.gd}
        onChange={(e) => atualizaCampo(e)}
      />
      <label> SGD: </label>
      <input
        type="number"
        id="sgd"
        className={styles.formInput}
        name="sgd"
        value={props.culturaForm.sgd}
        onChange={(e) => atualizaCampo(e)}
      />
      <label className={styles.labelForm}> Sensor: </label>
      <select
        name="sensorId"
        className={styles.formInput}
        value={cultura.sensorId}
        onChange={atualizaCampo}
      >
        {sensores.length > 0 && (
          <>
            {sensores.map((sensor) => (
              <option key={sensor.id} value={sensor.id}>
                {sensor.id}
              </option>
            ))}
          </>
        )}
      </select>
      <button className={styles.btnSalvar} onClick={(e) => salvar(e)}>
        Salvar
      </button>
      <button className={styles.btnCancelar} onClick={(e) => limpar(e)}>
        Cancelar
      </button>
    </div>
  );
}
