import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../actions/authActions";
import { InputField } from "../HelperComponents/Forms/Forms";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (store.auth.isAuthenticated) {
      navigate("/dashboard");
    }
  }, [store.auth.isAuthenticated]);

  const handleInputChange = (id, value) => {
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const loginUser = {
      email: email,
      password: password,
    };
    dispatch(login(loginUser));
  };

  return (
    <div className="holder">
      <div className="login-page">
        <div className="login-header">
          <div>
            Welcome to <span className="main-color">My Conclave</span>
          </div>
        </div>
        <div className="login-form">
          <form className="dynamic-form">
            {store.error.msg.msg ? (
              <div className="msg-display danger-background white-color">
                {store.error.msg.msg}
              </div>
            ) : null}
            <InputField
              type="email"
              title="Email"
              id="email"
              setInputValue={handleInputChange}
              entity={email}
            />
            <InputField
              type="password"
              title="Password"
              id="password"
              setInputValue={handleInputChange}
              entity={password}
            />
            <div className="action-buttons">
              <button onClick={handleLogin} className="success-outline">
                Login
              </button>
            </div>
          </form>
          <div className="not-registered">
            <div className="seperator">OR</div>
            <div className="action-buttons">
              <button
                className="regular"
                onClick={() => {
                  navigate("/register", { replace: true });
                }}
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
