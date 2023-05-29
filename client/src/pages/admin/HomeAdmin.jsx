import { Box } from "@chakra-ui/react";
import Dashboard from "../../componects/admin/Dashboard";
import Header from "../../componects/admin/Header";
import SideBar from "../../componects/admin/SideBar";
import { UserState } from "../../context/UserProvider";

const HomeAdmin = () => {
  const { user, selectedSection } = UserState();

  return (
    <Box w="100%" display="flex" justifyContent="flex-start">
      <SideBar />
      <Box flex={1}>
        {user && <Header name={user.name} />}
        {selectedSection === "dashboard" && <Dashboard />}
      </Box>
    </Box>
  );
};
export default HomeAdmin;
