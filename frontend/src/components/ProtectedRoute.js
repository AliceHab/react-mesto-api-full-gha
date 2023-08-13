import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ element, isLoggedIn }) => {
  const navigate = useNavigate();

  return isLoggedIn ? element : navigate("signin", { replace: true });
};

export default ProtectedRoute;
