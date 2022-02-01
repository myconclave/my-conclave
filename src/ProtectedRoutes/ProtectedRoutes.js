import { useSelector } from "react-redux";

const ProtectedRoutes = ({ children }) => {
  const isAuthenticated = useSelector((state) => {
    return state.auth.isAuthenticated;
  });

  return isAuthenticated ? children : <div>No Page Found</div>;
};

export default ProtectedRoutes;
