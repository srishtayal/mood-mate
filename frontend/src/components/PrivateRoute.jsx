import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');        // you can also verify expiry here
  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;