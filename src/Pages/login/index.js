import Link from "next/link";
import FullButton from "@aio/components/FullButton";
import Input from "@aio/components/Input";
import Logo from "@aio/components/Logo";
import styles from "./login.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "src/actions/auth.action";
import { useRouter } from "next/router";
import { redirect } from 'next/navigation'
import PopupAlert from "@aio/components/PopupAlert";
import Spinner from "@aio/components/Spinner";

const Login = (props) => {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [showAlert, setShowAlert] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

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
      email, password
    }

    if (auth.authenticate) {
      handleCloseAlert()
    } else {
      loginError && handleShowAlert() 
    }
    
    try {
      await dispatch(login(user));
      router.push('/');
    } catch (error) {
      console.error('Error during login:', error);
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
                label={"Email or User name"}
                value={email}
              />
              <Input
                inputContainerStyle={{ padding: "15px 30px" }}
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                name="email"
                label={"Password"}
                value={password}
              />

              <FullButton label={"Login"} />
              {
                showAlert && (
                  <PopupAlert
                    message={loginError}
                    onClose={handleCloseAlert}
                    color="red"
                  />
                )
              }
                
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
