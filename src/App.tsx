import React, { useReducer, useState } from "react";
import "./App.scss";
import Home from "./home/Home/Home";
import Login from "./user/Login/Login";
import { UserAction, UserActionType, UserState, initialState } from "./types";

export const UserContext = React.createContext<UserState>(initialState);
export const DispatchContext = React.createContext<React.Dispatch<UserAction>>(
  () => {}
);

export default function App() {
  const [showLogin, setShowLogin] = useState(false);

  const reducer = (state: UserState, action: UserAction) => {
    const { type, payload } = action;
    switch (type) {
      case UserActionType.SWITCH:
        if (state.users.some((user) => user.name === payload.name)) {
          return { ...state, currentUser: payload };
        } else {
          console.log("User not found");
          return state;
        }
      case UserActionType.ADD:
        if (state.users.some((user) => user.name === payload.name)) {
          console.log("User already exists");
          return state;
        } else {
          return { ...state, users: [...state.users, payload] };
        }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const loggedIn = state.currentUser;

  return (
    <UserContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <div className="navBar">
          <h1>Evaluate My Professor</h1>

          <span
            className="loginLink"
            onClick={() => {
              setShowLogin(!showLogin);
            }}
          >
            {loggedIn ? `Logged in as ${loggedIn.name}` : "Log in"}
          </span>
        </div>

        {showLogin && <Login />}

        <Home />
      </DispatchContext.Provider>
    </UserContext.Provider>
  );
}
