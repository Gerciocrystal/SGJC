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
} from "@chakra-ui/react";
import { UserState } from "../context/UserProvider";
import PropTypes from "prop-types";
const DrawerProfile = ({ isOpen, onClose }) => {
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
                  Estatistica do utilizador
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
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
DrawerProfile.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default DrawerProfile;
