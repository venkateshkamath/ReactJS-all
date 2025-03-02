import { createContext, useContext, useReducer } from "react";

//USER API => fake
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };

    case "logout":
      return initialState;
    default:
      throw new Error("Type mismatch in the Auth reducer");
  }
}

const AuthProvider = ({ children }) => {
  //use reducers
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }
  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("Context wrongly used");
  else return context;
};

export { AuthProvider, useAuth };
