import { useState } from "react";
import CrudPlantios from "../Plantio/CrudPlantios";
import ListaPlantios from "../Plantio/ListaPlantios";
import axios from "axios";

export default function Plantios() {
  const urlAPI = "http://localhost:5088/api/Plantio/";
  const plantioIni = {
    id: 0,
    dataInicio: "",
    dataFim: "",
  };
  const [plantio, setPlantio] = useState(plantioIni);
  function carregar(plantioForm) {
    setPlantio(plantioForm);
  }
  const remover = (plantioForm) => {
    const url = urlAPI + plantioForm.id;
    console.log(url);
    if (window.confirm("Confirma remoção do plantio: " + plantioForm.id)) {
      console.log("entrou no confirm");
      axios["delete"](url, plantioForm).then((resp) => {
        console.log(resp.data);
      });
    }
  };
  return (
    <>
      <CrudPlantios plantioForm={plantio} plantioSet={setPlantio} />
      <ListaPlantios carregar={setPlantio} remover={remover} />
    </>
  );
}
