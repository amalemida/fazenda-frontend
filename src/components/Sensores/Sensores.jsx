import { useState } from "react";
import CrudSensores from "@/components/Sensores/CrudSensores";
import ListaSensores from "@/components/Sensores/ListaSensores";
import axios from "axios";
export default function Sensores() {
  const urlAPI = "http://localhost:5088/api/Sensor/";
  const sensorIni = {
    id: 0,
    descricao: "",
  };
  const [sensor, setSensor] = useState(sensorIni);
  function carregar(sensorForm) {
    setSensor(sensorForm);
  }
  const remover = (sensorForm) => {
    const url = urlAPI + sensorForm.id;
    console.log(url);
    if (window.confirm("Confirma remoção do sensor: " + sensorForm.descricao)) {
      console.log("entrou no confirm");
      axios["delete"](url, sensorForm).then((resp) => {
        console.log(resp.data);
      });
    }
  };
  return (
    <>
      <CrudSensores sensorForm={sensor} sensorSet={setSensor} />
      <ListaSensores carregar={setSensor} remover={remover} />
    </>
  );
}
