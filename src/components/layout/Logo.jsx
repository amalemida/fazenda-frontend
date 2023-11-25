import styles from "@/styles/Fazenda.module.css" 

export default function Logo(){
    return(
        <aside className={styles.logo}>
            <img src="/logo_fazenda.png" />
        </aside>
    )
}