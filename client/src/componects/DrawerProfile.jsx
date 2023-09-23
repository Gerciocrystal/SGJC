import {
  Box,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  VStack,
  Image,
  Text,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import { UserState } from "../context/UserProvider";
import PropTypes from "prop-types";
import ChangePassword from "./ChangePassword";
const DrawerProfile = ({ isOpen, onClose }) => {
  const {
    isOpen: isPasswordOpen,
    onClose: onPasswordClose,
    onOpen: onPasswordOpne,
  } = useDisclosure();
  const { user, logout } = UserState();
  return (
    <Box color="black">
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Perfil</DrawerHeader>
          <DrawerBody>
            <VStack spacing="5px">
              <Image boxSize="90px" src={user.pic} borderRadius="full" />
              <Text fontWeight="bold" fontSize="xl">
                {user.name}
              </Text>
              <Text fontSize="sm" textAlign="center" color="#889F9E">
                {user.departamento.nome}
              </Text>
              <Text textDecoration="underline" fontSize="sm">
                {user.email}
              </Text>
              <Box
                my="10px"
                w="100%"
                display="flex"
                flexDirection="column"
                alignContent="center"
                justifyContent="Center"
              >
                <Text
                  alignSelf="center"
                  my="10px"
                  mt="15px"
                  fontWeight="semibold"
                >
                  Estatística do utilizador
                </Text>
                <HStack spacing="30px" alignSelf="center" fontWeight="semibold">
                  <Box textAlign="center">
                    <Text fontSize="lg" color="#46D676">
                      20
                    </Text>
                    <Text color="#405246">Aprovados</Text>
                  </Box>
                  <Box textAlign="center">
                    <Text fontSize="lg" color="#ED3548">
                      20
                    </Text>
                    <Text color="#433133">Reprovados</Text>
                  </Box>
                  <Box textAlign="center">
                    <Text fontSize="lg">20</Text>
                    <Text>Total</Text>
                  </Box>
                </HStack>
              </Box>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <VStack w="100%" alignItems="start" justifyContent="start">
              <Button
                background="#33aa55"
                color="white"
                fontWeight="semibold"
                w="100%"
                onClick={onPasswordOpne}
                _hover={{
                  background: "#33bb55",
                }}
              >
                Trocar Password
              </Button>
              <Button
                background="black"
                color="white"
                fontWeight="semibold"
                w="100%"
                onClick={() => logout()}
                _hover={{
                  background: "#00000090",
                }}
              >
                Log out
              </Button>
            </VStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <ChangePassword isOpen={isPasswordOpen} onClose={onPasswordClose} />
    </Box>
  );
};
DrawerProfile.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default DrawerProfile;
