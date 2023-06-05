import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillAppstore } from "react-icons/ai";
import { VscGraph } from "react-icons/vsc";
import { CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { UserState } from "../../context/UserProvider";
const SideBar = () => {
  const { selectedSection, setSelectedSection } = UserState();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Box
      background="#C0F5FF"
      h="100vh"
      w={isOpen ? "150px" : "60px"}
      display="flex"
      justifyContent="center"
      py="10px"
      transition="ease-in-out"
    >
      <VStack spacing="2px" w="100%">
        {!isOpen ? (
          <Button
            mb="40px"
            onClick={toggleOpen}
            backgroundColor="#DFFAFF"
            borderRadius="base"
            w="50px"
            _hover={{
              background: "#DFFDEF",
            }}
          >
            <Text fontSize="3xl">
              <GiHamburgerMenu color="#889F9E" />
            </Text>
          </Button>
        ) : (
          <CloseIcon
            mb="50px"
            mr="15px"
            my="10px"
            fontSize="xl"
            onClick={toggleOpen}
            color="#889F9E"
            alignSelf="end"
          />
        )}

        <HStack
          justifyContent="center"
          w="100%"
          height="50px"
          cursor="pointer"
          background={selectedSection === "dashboard" ? "#DFFAFF" : ""}
          onClick={() => setSelectedSection("dashboard")}
        >
          <VscGraph fontSize="1.3rem" />
          {isOpen && <Text>Dashbord</Text>}
        </HStack>
        <HStack
          justifyContent="center"
          w="100%"
          height="50px"
          cursor="pointer"
          background={selectedSection === "disponiveis" ? "#DFFAFF" : ""}
          onClick={() => setSelectedSection("disponiveis")}
        >
          <AiFillAppstore fontSize="1.2rem" />
          {isOpen && <Text>Disponiveis</Text>}
        </HStack>
      </VStack>
    </Box>
  );
};
export default SideBar;
