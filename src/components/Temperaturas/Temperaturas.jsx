import { useState } from "react";
import CrudTemperaturas from "@/components/Temperaturas/CrudTemperaturas";
import ListaTemperaturas from "./ListaTemperaturas";
import axios from "axios";
export default function Temperaturas() {
  const urlAPI = "http://localhost:5088/api/Temperatura/";
  const temperaturaIni = {
    id: 0,
    data: "",
    tmax: 0.0,
    tmin: 0.0,
    tmedia: 0.0,
    sensorId: 0,
  };
  const [temperatura, setTemperatura] = useState(temperaturaIni);
  function carregar(temperaturaForm) {
    setTemperatura(temperaturaForm);
  }
  const remover = (temperaturaForm) => {
    const url = urlAPI + temperaturaForm.id;
    console.log(url);
    if (window.confirm("Confirma remoção do temperatura: " + temperaturaForm.data)) {
      console.log("entrou no confirm");
      axios["delete"](url, temperaturaForm).then((resp) => {
        console.log(resp.data);
      });
    }
  };
  return (
    <>
      <CrudTemperaturas temperaturaForm={temperatura} temperaturaSet={setTemperatura} />
      <ListaTemperaturas carregar={setTemperatura} remover={remover} />
    </>
  );
}
