import { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { logout } from "../actions/authActions";

import { tokenConfigUtil } from "../utils/Utils";

const Menubar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const store = useSelector((state) => {
    return state.auth && state.auth;
  });

  const [showDropdown, setShowDropdown] = useState(false);
  const [menuItem, setMenuItem] = useState([]);

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const getPaths = useCallback(() => {
    axios
      .get(`/api/paths/${store.user._id}`, tokenConfigUtil(store.token))
      .then((result) => {
        setMenuItem(result.data);
      });
  }, [store]);

  useEffect(() => {
    if (store) {
      getPaths();
    }
  }, [store, getPaths]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <div className="navigation main-background">
      <div className="logo white-color">My Conclave</div>
      <div className="navigation-menu">
        {menuItem.map((item) => {
          return (
            <div
              className={
                location.pathname === item.path
                  ? "menu-active"
                  : "menu-inactive"
              }
              onClick={() => {
                navigate(item.path);
              }}
              key={item.id}
            >
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>

      <div className="dropdown white-color">
        <div className="dropdown-caret">
          <MdOutlineArrowDropDownCircle onClick={handleDropdown} />
        </div>

        {showDropdown ? (
          <div className="dropdown-body white-background main-color">
            <div className="dropdown-item">Settings</div>
            <div className="dropdown-item" onClick={handleLogout}>
              Logout
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Menubar;
