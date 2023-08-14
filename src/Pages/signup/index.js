import Link from "next/link";
import FullButton from "@aio/components/FullButton";
import Input from "@aio/components/Input";
import Logo from "@aio/components/Logo";
import styles from "./signup.module.css";
import { useState } from "react";
import signup from "pages/api/signup";

const Signup = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      name, email, password, retypePassword
  }

    signup(user);
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
              <h1>Signup</h1>
              <p>Create a new Account</p>
            </div>
            <form onSubmit={handleSubmit}>
               <Input
                inputContainerStyle={{ padding: "15px 30px" }}
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                name="name"
                label={"Name"}
              />
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
                onChange={(e) => setPassword  (e.target.value)}
                name="password"
                label={"Password"}
              />
              <Input
                inputContainerStyle={{ padding: "15px 30px" }}
                type="password"
                placeholder="Password"
                onChange={(e) => setRetypePassword(e.target.value)}
                name="retypePassword"
                label={"Re-type Password"}
              />
              <FullButton label={"Login"} />

              <p className="tc-grey t-center">
                If you already have an account.{" "}
                <Link className="link" href={`/login`}>Login</Link>
              </p>
            </form>
          </div>
        </section>
      </div>
  );
};

export default Signup;
