import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Loader2 } from 'lucide-react'; // For a loading state icon

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  // NOTE: A real application would also check for an 'isLoading' state 
  // from the AuthContext while it checks the local storage/token.
  
  // If not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child components (e.g., AdminDashboard)
  return children;
};

export default ProtectedRoute;