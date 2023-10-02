import React, { useEffect, useState } from 'react';
import axios from 'axios';import Link from "next/link";
import Logo from "@aio/components/Logo";
import styles from "./login.module.css";
import { IoStar, IoTime } from "react-icons/io5";
import Input from '@aio/components/Input';
import FullButton from '@aio/components/FullButton';
import { forgotPassword } from 'src/actions';
import { useDispatch } from 'react-redux';
import Spinner from '@aio/components/Spinner';
import { useSelector } from 'react-redux';
import PopupAlert from '@aio/components/PopupAlert';
import { IoMdDoneAll } from 'react-icons/io';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const userError = useSelector(state => state.user.error);
  const userMessage = useSelector(state => state.user.message);
  const sendEmail = useSelector(state => state.user.sendEmail);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
  }, [userError, userMessage, dispatch]);

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await dispatch(forgotPassword(email));
      userError && handleShowAlert()
    } catch (error) {
      console.log(error);
    }
  };
  return (
    user.loading ? 
    <Spinner/> : 
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
              <h1>Forgot Password <IoStar/></h1>
            </div>
            {
              sendEmail ? <h4 style={{padding:'10px'}}>Email has been sent <IoMdDoneAll/> </h4> : 
              <form onSubmit={handleSubmit}>
                <Input
                    inputContainerStyle={{ padding: "15px 30px" }}
                    type="text"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    value={email}
                  />
                {message && <p>{message}</p>}
                <FullButton label={"Verify"} />
              </form>
            }
            <p className="tc-grey t-center">
              Have Password?{" "}
              <Link className="link" href={`/login`}>Login here</Link>
            </p>
            {
                showAlert && (
                  <PopupAlert
                    message={userError}
                    onClose={handleCloseAlert}
                    color="red"
                  />
                )
              }
          </div>
        </section>
      </div>
  );
};

export default ForgotPasswordPage;
