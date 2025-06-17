import { Navigate } from 'react-router-dom';
import Landing from '../pages/Landing';
import { hasToken } from '../utils/auth';

const HomeRoute = () => (hasToken() ? <Navigate to="/dashboard" replace /> : <Landing />);

export default HomeRoute;