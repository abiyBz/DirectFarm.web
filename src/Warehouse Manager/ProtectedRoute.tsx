import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../redux/store';

const ProtectedRoute = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  return isLoggedIn ? <Outlet /> : <Navigate to="/WarehouseLogin" replace />;
};

export default ProtectedRoute;