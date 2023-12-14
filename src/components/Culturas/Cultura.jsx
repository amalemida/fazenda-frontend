import { useState } from "react";
import CrudCulturas from "@/components/Culturas/CrudCulturas";
import ListaCulturas from "./ListaCulturas";
import axios from "axios";

export default function Culturas() {
  const urlAPI = "http://localhost:5088/api/Cultura/";
  const culturaIni = {
    id: 0,
    nome: "",
    tbasal: 0.0,
    gd: 0.0,
    sgd: 0.0,
    sensorId: 0,
    colher: false,
    irrigar: false
  };
  const [cultura, setCultura] = useState(culturaIni);
  function carregar(culturaForm) {
    setCultura(culturaForm);
  }
  const remover = (culturaForm) => {
    const url = urlAPI + culturaForm.id;
    console.log(url);
    if (window.confirm("Confirma remoção do cultura: " + culturaForm.nome)) {
      axios["delete"](url, culturaForm).then((resp) => {
        console.log(resp.data);
      });
    }
  };
  return (
    <>
      <CrudCulturas culturaForm={cultura} culturaSet={setCultura} />
      <ListaCulturas carregar={setCultura} remover={remover} />
    </>
  );
}
