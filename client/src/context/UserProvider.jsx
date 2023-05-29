import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [selectedSection, setSelectedSection] = useState("dashboard");
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) navigate("/");
  }, [navigate]);

  const authenticate = async (username, password) => {
    const request = await UserService.Login({ username, password });
    setUser(request);

    const payload = JSON.stringify(request);
    localStorage.setItem("userInfo", payload);

    return request;
  };
  const logout = () => {
    setUser(null);
    localStorage.setItem("userInfo", null);
  };
  return (
    <UserContext.Provider
      value={{
        user,
        authenticate,
        setUser,
        logout,
        selectedSection,
        setSelectedSection,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const UserState = () => {
  return useContext(UserContext);
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default UserProvider;
