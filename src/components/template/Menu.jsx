import Link from "next/link";
import styles from "../../styles/Fazenda.module.css";

export default function Menu(props) {
    return (
    <nav className={styles.menu}>
      <div className={styles.div}>
        <Link href="/fazenda?id=culturas">Culturas</Link>
        <Link href="/fazenda?id=temperaturas">Temperaturas</Link>
        <Link href="/fazenda?id=sensores">Sensores</Link>
        <Link href="/fazenda?id=plantios">Plantios</Link>
      </div>
    </nav>
  );
}
