import Login from 'pages/login';
import { useSelector } from 'react-redux';

function PrivateContent({ children }) {
    const PrivateAuth = useSelector(state => state.auth)

  if (!PrivateAuth.authenticate) {
    return <Login />;
  }

  return(children);
}

export default PrivateContent;