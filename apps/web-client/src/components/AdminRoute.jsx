import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AdminRoute({ children }) {
  const { token, currentUser } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!currentUser || !['super-admin', 'product-manager', 'order-manager'].includes(currentUser.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;
