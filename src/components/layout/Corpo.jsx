import Titulo from "./Titulo";
import styles from "../../styles/Fazenda.module.css";

export default function Corpo(props) {
  return (
    <div className={styles.content}>
      <Titulo {...props} />
      <main>
        <div className={styles.corpo}>{props.children}</div>
      </main>
    </div>
  );
}
