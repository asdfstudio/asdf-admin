import { useSelector } from "react-redux";
import Dashboard from "./dashboard";
import PrivateContent from "src/components/PrivateContent";
import UserWaitingPage from "src/Pages/userWaitingPage";
import ForgotPasswordPage from "src/Pages/ForgotPasswordPage";
import ResetPasswordPage from "src/Pages/ResetPasswordPage";

export default function Home() {
  const authRole = useSelector(state => state.auth?.user?.role);

  if(authRole == 'user'){
    return <UserWaitingPage/>
  }else {
    return (
      <PrivateContent>
          <Dashboard />
      </PrivateContent>
    )
  }
}