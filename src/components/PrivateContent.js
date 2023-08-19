import Login from 'pages/login';
import { useSelector } from 'react-redux';

function PrivateContent({ children }) {
    const auth = useSelector(state => state.auth)

  if (!auth.authenticate) {
    return <Login />;
  }

  return(console.log('authhhhhh', auth.authenticate), children);
}

export default PrivateContent;