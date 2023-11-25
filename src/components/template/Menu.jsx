import Link from "next/link";
import Logo from "@/components/layout/Logo";
import styles from "../../styles/Fazenda.module.css";

export default function Menu(props) {
    return (
    <nav className={styles.menu}>
      <Logo />
      <div>
        <Link href="/fazenda?id=culturas">Culturas</Link>
        <Link href="/fazenda?id=temperaturas">Temperaturas</Link>
        <Link href="/fazenda?id=sensores">Sensores</Link>
      </div>
    </nav>
  );
}
