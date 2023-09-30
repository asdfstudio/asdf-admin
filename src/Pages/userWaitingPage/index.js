import Link from "next/link";
import Logo from "@aio/components/Logo";
import styles from "./login.module.css";
import { IoTime } from "react-icons/io5";

const UserWaitingPage = (props) => {

  return (
      <div className={styles.container}>
        <section className={styles["login-container"]}>
          <div className={styles["brand-container"]}>
            <Logo />
            <div className={styles['logo-explain']}>Airly Studio Dashboard</div>
          </div>
          <div className={styles["form-container"]}>
            <div className="t-center" style={{ margin: "15px 0" }}>
              <div className={styles["sm-brand-container"]}>
                <Logo />
              </div>
              <h1>Waiting lobby <IoTime/></h1>
              <p style={{paddingTop:'10px'}}>Your request has not been approved yet</p>
            </div>
            <p className="tc-grey t-center">
              Approved?{" "}
              <Link className="link" href={`/login`}>Login here</Link>
            </p>
          </div>
        </section>
      </div>
  );
};

export default UserWaitingPage;
