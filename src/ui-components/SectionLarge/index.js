import styles from "./style.module.css";

const SectionLarge = ({
    children
}) => {
    return (
        <section className={styles["section-container"]}>
            {children}
        </section>
    );
}

export default SectionLarge;