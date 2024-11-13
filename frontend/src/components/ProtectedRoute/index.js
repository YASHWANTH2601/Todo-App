import {useEffect}from "react";
import { useNavigate  } from "react-router-dom";


const ProtectedRoute = ({ element: Component }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login" , { replace: true });
    }
  }, [token, navigate]);

  return token ? Component : null;
};

export default ProtectedRoute;
