import { createContext, useState, ReactNode, useEffect } from "react";
import { UserType } from "../models/User";
import axios from "axios";
import config from "../../config";

export type AuthContextType = {
  user: UserType | null;
  login: (user: UserType) => void;
  logout: () => void;
  updateUserContext: (updatedUser: UserType) => void;
};
const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const header = {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        };

        axios
          .post(`${config.SERVER_URL}/api/users/verifyToken`, {}, header)
          .then((response) => {
            if (response.status == 200) {
              const loggedIn = {
                _id: response.data.id,
                email: response.data.email,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
              };

              setUser(loggedIn);
            }
          })
          .catch();
      }
    };
    verifyToken();
  }, []);

  const [user, setUser] = useState<UserType | null>(null);

  const login = (user: UserType) => {
    setUser(user);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const updateUserContext = (updatedUser: UserType) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUserContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthContextProvider };
