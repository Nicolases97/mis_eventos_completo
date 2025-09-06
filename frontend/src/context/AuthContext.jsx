import { createContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  token: localStorage.getItem("token") || null,
  user: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, token: action.payload.token, user: action.payload.user };
    case "LOGOUT":
      return { ...state, token: null, user: null };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
