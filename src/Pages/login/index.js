import Link from "next/link";
import FullButton from "@aio/components/FullButton";
import Input from "@aio/components/Input";
import Logo from "@aio/components/Logo";
import styles from "./login.module.css";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import login from "pages/api/login";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email, password
  }

    login(user);
  };

  return (
      <div className={styles.container}>
        <section className={styles["login-container"]}>
          <div className={styles["brand-container"]}>
            <Logo />
            <div className={styles['logo-explain']}>Airly Studio Dashboard</div>
          </div>

          {/* login form */}
          <div className={styles["form-container"]}>
            <div className="t-center" style={{ margin: "15px 0" }}>
              <div className={styles["sm-brand-container"]}>
                <Logo />
              </div>
              <h1>Login</h1>
              <p>Please enter email and password to login</p>
            </div>
            <form onSubmit={handleSubmit}>
              <Input
                inputContainerStyle={{ padding: "15px 30px" }}
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                label={"Email"}
              />
              <Input
                inputContainerStyle={{ padding: "15px 30px" }}
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                name="email"
                label={"Password"}
              />

              <FullButton label={"Login"} />
              {/* <button type="submit" className={styles['btn-style']}>label</button> */}

              <p className="tc-grey t-center">
                Dont have an account?{" "}
                <Link className="link" href={`/signup`}>Signup for free</Link>
              </p>
            </form>
          </div>
        </section>
      </div>
  );
};

export default Login;
