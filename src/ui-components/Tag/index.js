import styles from "./tag.module.css";

const Tag = ({ label = "", Icon = null, inverse = false, style = {} }) => {
  return (
    <button
      className={
        inverse ? `${styles["btn"]} ${styles["inverse"]}` : `${styles["btn"]}`
      }
      style={style}
    >
      <span>{label}</span>
    </button>
  );
};

export default Tag;
