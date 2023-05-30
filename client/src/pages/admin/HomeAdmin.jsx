import { Box, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
// import { useState } from "react";
import Dashboard from "../../componects/admin/Dashboard";
import Disponiveis from "../../componects/admin/Disponiveis";
import Header from "../../componects/admin/Header";
import SideBar from "../../componects/admin/SideBar";
import { UserState } from "../../context/UserProvider";

const HomeAdmin = () => {
  const { user, selectedSection } = UserState();
  // const [fectAgain,setFetchAgain] = useState();

  return (
    <Box w="100%" display="flex" justifyContent="flex-start">
      <SideBar />
      <Box flex={1}>
        {user && <Header name={user.name} />}
        {selectedSection === "dashboard" && <Dashboard />}
        {selectedSection === "disponiveis" && <Disponiveis />}
      </Box>
    </Box>
  );
};
export default HomeAdmin;
