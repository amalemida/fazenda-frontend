import Corpo from "@/components/layout/Corpo";
import Menu from "@/components/template/Menu";
import styles from "../styles/Fazenda.module.css";
import Rodape from "@/components/layout/Rodape";
import { useRouter } from "next/router";
import { useAppContext } from "@/data/context/AppContext";
import Culturas from "@/components/Culturas/Cultura";
import Temperaturas from "@/components/Temperaturas/Temperaturas";
import Sensores from "@/components/Sensores/Sensores";
import Plantios from "@/components/Plantio/Plantio";

export default function fazenda() {
  const router = useRouter();
  const id = router.query.id;

  const dados = useAppContext();

  const renderiza = () => {
    if (!id) {
      return (
        <Corpo titulo="Bem vindo!">

          <h2>{dados.nome}</h2>
        </Corpo>
      );
    }

      if (id === "culturas") {
        return (
          <Corpo titulo="Cadastro de Culturas">
            <Culturas />
          </Corpo>
        );
      }
      if (id === "temperaturas") {
        return (
          <Corpo titulo="Histórico de Temperaturas">
            <Temperaturas/>
          </Corpo>
        );
      }
      if (id === "sensores") {
        return (
          <Corpo titulo="Controle dos Sensores">
            <Sensores/>
          </Corpo>
        );
      }
      if (id === "plantios") {
        return (
          <Corpo titulo="Cadastro de Plantios">
            <Plantios/>
          </Corpo>
        );
      }
    } 
    
  return (
    <div className={styles.fazenda}>
      <Menu />
      {renderiza()}
      <Rodape />
    </div>
  )
}
