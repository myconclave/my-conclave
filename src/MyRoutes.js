import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import Menubar from "./Menubar/Menubar";
import Footer from "./Footer/Footer";
import LoginPage from "./LoginPage/LoginPage";
import Dashboard from "./Dashboard/Dashboard";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";

const MyRoutes = () => {
  const isAuthenticated = useSelector((state) => {
    return state.auth.isAuthenticated;
  });

  return (
    <div className="my-conclave">
      <BrowserRouter>
        {isAuthenticated ? <Menubar /> : null}
        <Routes>
          <Route exact={true} path="/" element={<LoginPage />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="*"
            element={
              <div className="holder">
                <div className="not-found">No Page Found</div>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
      {isAuthenticated ? <Footer /> : null}
    </div>
  );
};

export default MyRoutes;
