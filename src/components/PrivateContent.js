import Login from 'pages/login';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { getBlogs, getPortfolioVisitors, getPortfolios, getUsers, isUserLoggedIn, visitor } from 'src/actions';

export default function PrivateContent({ children }) {

  const dispatch = useDispatch();
  const PrivateAuth = useSelector(state => state.auth)

  useEffect(() => {
    if (!PrivateAuth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if (PrivateAuth.authenticate) {
      dispatch(getPortfolios());
      dispatch(getBlogs());
      dispatch(getUsers());
      dispatch(visitor());
      dispatch(getPortfolioVisitors());
    }
  }, [PrivateAuth.authenticate, dispatch]);

  if (!PrivateAuth.authenticate) {
    return <Login />
  }

  return children;
}