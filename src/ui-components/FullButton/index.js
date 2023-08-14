import Link from "next/link";
import styles from "./fullbutton.module.css";

const FullButton = ({
    label = ''
}) => {
    return (
        <div className={styles['btn-container']}>
            {/* <Link href={'/dashboard'}> */}
                <button type="submit" className={styles['btn-style']}>{label}</button>
            {/* </Link> */}
        </div>
        
    );
}

export default FullButton;