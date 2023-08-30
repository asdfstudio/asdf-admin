import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Login from "./login";
import { useSelector } from "react-redux";
import { isUserLoggedIn } from "src/actions/auth.action";
import { useRouter } from "next/router";
import Dashboard from "./dashboard";
import PrivateContent from "src/components/PrivateContent";
import { getPortfolios } from "src/actions";

export default function Home() {

    const dispatch = useDispatch();
    const router = useRouter();
    const auth = useSelector(state => state.auth)

    useEffect(() => {
        if (!auth.authenticate) {
          dispatch(isUserLoggedIn());
        }
        if (auth.authenticate) {
          dispatch(getPortfolios());
        }
      }, [auth.authenticate]);

  return (
    <PrivateContent>
        {/* {auth.authenticate ? <Dashboard/> : <Login />} */}
        <Dashboard />
    </PrivateContent>
  );
}