import React, { useEffect } from "react";
import { useAuth } from "../Contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated]);
  return isAuthenticated && children;
};

export default ProtectedRoute;
