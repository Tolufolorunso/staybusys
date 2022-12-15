import React, { useReducer, useContext } from "react";
const AppContext = React.createContext();

const reducer = (state, { type, payload }) => {
  if ("UPDATE_USER" === type) {
    return { ...state, user: payload };
  }
};

let user;

if (typeof window != "undefined") {
  user = localStorage.getItem("user");
}

const initialState = {
  user: user ? JSON.parse(user) : null,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function updateUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({ type: "UPDATE_USER", payload: user });
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        updateUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
