import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Button,
  DrawerCloseButton,
  VStack,
  StackDivider,
  useToast,
  Box,
  Text,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { UserState } from "../context/UserProvider";
import NotificacaoService from "../service/NotificacaoService";
const DrawerNotification = ({ isOpen, onClose }) => {
  const [notificacaoes, setNotificacaoes] = useState([]);
  const Toast = useToast();
  const { user } = UserState();
  const fetchNotificacoes = async () => {
    try {
      const data = await NotificacaoService.getNotificacao(user.token);
      setNotificacaoes(data);
    } catch (error) {
      Toast({
        title: "Falha no processo de procura de notificacoes",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    fetchNotificacoes();
  }, []);
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Notificações</DrawerHeader>

        <DrawerBody height="container.lg">
          <VStack
            spacing="10px"
            divider={<StackDivider borderColor="gray.200" />}
          >
            {notificacaoes.length > 0 ? (
              notificacaoes.map((not) => (
                <Box key={not._id} alignSelf="start">
                  <Text fontSize="md" fontWeight="semibold">
                    {not.tipo}
                  </Text>
                  <Text fontSize="sm">{not.descricao}</Text>
                </Box>
              ))
            ) : (
              <Text>Sem notificações</Text>
            )}
          </VStack>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Voltar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
DrawerNotification.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default DrawerNotification;
