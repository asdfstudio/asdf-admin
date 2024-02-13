import React, { useEffect, useState } from 'react';
import axios from 'axios';import Link from "next/link";
import Logo from "@aio/components/Logo";
import styles from "./login.module.css";
import { IoStar, IoTime } from "react-icons/io5";
import Input from '@aio/components/Input';
import FullButton from '@aio/components/FullButton';
import { useRouter } from 'next/router';
import { resetPassword } from 'src/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Spinner from '@aio/components/Spinner';
import PopupAlert from '@aio/components/PopupAlert';

const ResetPasswordPage = () => {
  const router = useRouter();
  const { token } = router.query;
  const user = useSelector(state => state.user);
  const userError = useSelector(state => state.user.error);
  const userMessage = useSelector(state => state.user.message);
  const sendEmail = useSelector(state => state.user.sendEmail);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

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

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

      try {
        setIsLoading(true);
          await dispatch(resetPassword(token, password));
          {!sendEmail && router.push('/')}
        setIsLoading(false);
        userError && handleShowAlert()
      } catch (error) {
        setIsLoading(false);
        console.log(error)
      }
  };

  return (
    user.loading ? 
    <Spinner/> :
    isLoading ? 
    <Spinner/> :
      <div className={styles.container}>
        <section className={styles["login-container"]}>
          <div className={styles["brand-container"]}>
            <Logo />
            <div className={styles['logo-explain']}>ASDF Studio Dashboard</div>
          </div>
          <div className={styles["form-container"]}>
            <div className="t-center" style={{ margin: "15px 0" }}>
              <div className={styles["sm-brand-container"]}>
                <Logo />
              </div>
              <h1>Reset Password <IoStar/></h1>
            </div>
            <form onSubmit={handleSubmit}>
              <Input
                inputContainerStyle={{ padding: "15px 30px" }}
                type="password"
                placeholder="New Password"
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                value={password}
              />
              <Input
                inputContainerStyle={{ padding: "15px 30px" }}
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                name="password"
                value={confirmPassword}
              />
              {message && <p style={{color:'red', display:'flex', justifyContent:'center'}}>{message}</p>}
              <FullButton label={"Reset Password"} />
            </form>
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

export default ResetPasswordPage;
