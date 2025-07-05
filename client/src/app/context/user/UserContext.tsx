import React, {
    createContext,
    useContext,
    useReducer,
    useEffect,
    ReactNode,
  } from "react";
  import { UserState, UserAction } from "./userTypes";
  import { userReducer, initialUserState } from "./userReducer";
  
  const UserContext = createContext<{
    state: UserState;
    dispatch: React.Dispatch<UserAction>;
  } | null>(null);
  
  export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(userReducer, initialUserState);
  
    useEffect(() => {
      const fetchUsers = async () => {
        const res = await fetch("/api/users");
        const data = await res.json();
        dispatch({ type: "SET_USERS", payload: data });
      };
  
      fetchUsers();
    }, []);
  
    return (
      <UserContext.Provider value={{ state, dispatch }}>
        {children}
      </UserContext.Provider>
    );
  };
  
  export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
  };
  