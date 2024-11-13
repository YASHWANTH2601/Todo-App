import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectRoute = ({ element: Component }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/todos", { replace: true });
    }
  }, [token, navigate]);

  
  return !token ? Component : null;
};

export default RedirectRoute;
