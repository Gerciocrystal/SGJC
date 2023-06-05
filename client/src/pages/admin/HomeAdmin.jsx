import { Box } from "@chakra-ui/react";
import Aprovados from "../../componects/admin/Aprovados";
import Dashboard from "../../componects/admin/Dashboard";
import Disponiveis from "../../componects/admin/Disponiveis";
import Header from "../../componects/admin/Header";
import Pendentes from "../../componects/admin/Pendentes";
import Reprovados from "../../componects/admin/Reprovados";
import SideBar from "../../componects/admin/SideBar";
import { UserState } from "../../context/UserProvider";

const HomeAdmin = () => {
  const { user, selectedSection } = UserState();

  return (
    <Box w="100%" display="flex" justifyContent="flex-start">
      <SideBar />
      <Box flex={1} overflow="hidden">
        {user && <Header name={user.name} />}
        {selectedSection === "dashboard" && <Dashboard />}
        {selectedSection === "disponiveis" && <Disponiveis />}
        {selectedSection === "pendentes" && <Pendentes />}
        {selectedSection === "aprovados" && <Aprovados />}
        {selectedSection === "reprovadas" && <Reprovados />}
      </Box>
    </Box>
  );
};
export default HomeAdmin;
