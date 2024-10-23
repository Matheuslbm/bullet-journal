import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Verifique se há um token 

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
