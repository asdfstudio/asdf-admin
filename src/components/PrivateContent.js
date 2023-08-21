import Login from 'pages/login';
import { useSelector } from 'react-redux';

function PrivateContent({ children }) {
    const auth = useSelector(state => state.auth)

  if (!auth.authenticate) {
    return <Login />;
  }

  return(children);
}

export default PrivateContent;