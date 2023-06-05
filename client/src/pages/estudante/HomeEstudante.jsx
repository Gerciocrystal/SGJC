import { Box } from "@chakra-ui/react";
import { UserState } from "../../context/UserProvider";
import SideBar from "../../componects/estudante/SideBar";
import Header from "../../componects/estudante/Header";
import Dashboard from "../../componects/estudante/Dashboard";
import Disponiveis from "../../componects/estudante/Disponiveis";
const HomeEstudante = () => {
  const { user, selectedSection } = UserState();

  return (
    <Box w="100%" display="flex" justifyContent="flex-start">
      <SideBar />
      <Box flex={1} overflow="hidden">
        {user && <Header />}
        {selectedSection === "dashboard" && <Dashboard />}
        {selectedSection === "disponiveis" && <Disponiveis />}
      </Box>
    </Box>
  );
};
export default HomeEstudante;
