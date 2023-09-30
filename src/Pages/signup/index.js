import Link from "next/link";
import FullButton from "@aio/components/FullButton";
import Input from "@aio/components/Input";
import Logo from "@aio/components/Logo";
import styles from "./signup.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "src/actions/auth.action";
import { useRouter } from "next/router";
import PopupAlert from "@aio/components/PopupAlert";
import Spinner from "@aio/components/Spinner";

const Signup = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");

  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector(state => state.auth);
  const loginError = useSelector(state => state.auth.error);

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      name, email, password, retypePassword
  }

    if (!loginError) {
      try {
        await dispatch(signup(user));
        router.push('/login');
      } catch (error) {
        console.error('Error during signup:', error);
      }
    } else {
      handleShowAlert();
    }
  };

  return (
    auth.loading === true ? 
    <Spinner/> :
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
                value={name}
              />
              <Input
                inputContainerStyle={{ padding: "15px 30px" }}
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                label={"Email"}
                value={email}
              />
              <Input
                inputContainerStyle={{ padding: "15px 30px" }}
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword  (e.target.value)}
                name="password"
                label={"Password"}
                value={password}
              />
              <Input
                inputContainerStyle={{ padding: "15px 30px" }}
                type="password"
                placeholder="Password"
                onChange={(e) => setRetypePassword(e.target.value)}
                name="retypePassword"
                label={"Re-type Password"}
                value={retypePassword}
              />
              <FullButton label={"Signup"} />

              {
                showAlert && (
                  <PopupAlert
                    message={loginError}
                    onClose={handleCloseAlert}
                    color="red"
                  />
                )
              }

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
