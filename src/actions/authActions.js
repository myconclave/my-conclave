import axios from "axios";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../actions/types";
import { returnErrors } from "./errorActions";

//Register User
export const register = (user) => (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const body = {
    name: user.name,
    email: user.email,
    password: user.password,
    headline: user.headline,
    registerAs: user.registerAs,
  };

  let finalUser = {};

  if (user.status === "working") {
    finalUser = {
      ...body,
      status: "working",
      company: user.company,
      position: user.position,
    };
  } else if (user.status === "studying") {
    finalUser = {
      ...body,
      status: "studying",
      institute: user.institute,
      field: user.studyField,
      degree: user.degree,
    };
  } else {
    finalUser = {
      ...body,
    };
  }

  axios
    .post("/api/users", finalUser, config)
    .then((res) => {
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({ type: REGISTER_FAIL });
    });
};

// Check Token and load user
export const loadUser = () => async (dispatch, getState) => {
  //User Loading
  dispatch({ type: USER_LOADING });

  await axios
    .get(`/api/auth/user`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

//Login User
export const login =
  ({ email, password }) =>
  (dispatch) => {
    dispatch({ type: USER_LOADING });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    //Request Body
    const body = JSON.stringify({
      email,
      password,
    });

    axios
      .post("/api/auth", body, config)
      .then((res) => {
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
        );
        dispatch({ type: LOGIN_FAIL });
      });
  };

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const tokenConfig = (getState) => {
  // Get token from localStorage
  const token = getState().auth.token;

  //Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  //If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
