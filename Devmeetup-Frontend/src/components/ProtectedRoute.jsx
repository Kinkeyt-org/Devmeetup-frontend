// components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const user = localStorage.getItem("user");

  // If no user is found, redirect them to the signup/login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user exists, render the protected child routes
  return <Outlet />;
};

export default ProtectedRoute;