import { createContext, useReducer } from "react";
import { useEffect } from "react";
import Reducer from "./Reducer";

let token;
try {
  // token = JSON.parse(localStorage.getItem("token")) || JSON.parse(sessionStorage.getItem("token"));
  token = localStorage.getItem("token") || sessionStorage.getItem("token");
} catch (e) {
  token = null;
}

const INITIAL_STATE = {
  token: token || null,
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    if (state.token) {
      if (localStorage.getItem("rememberMe") === "true") {
        localStorage.setItem("token", state.token);
        sessionStorage.removeItem("token");
      } else {
        sessionStorage.setItem("token", state.token);
        localStorage.removeItem("token");
      }
    }
  }, [state.token]);

  return (
    <Context.Provider
      value={{
        token: state.token,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};


