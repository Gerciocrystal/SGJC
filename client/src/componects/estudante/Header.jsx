import {
  Box,
  Button,
  Image,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { getRandomColor, createImageFromInitials } from "../chart/Util";
import NotificationBagde, { Effect } from "react-notification-badge";
import { UserState } from "../../context/UserProvider";
import DrawerProfile from "../DrawerProfile";
import NotificacaoService from "../../service/NotificacaoService";
import { useEffect, useState } from "react";
import { BellIcon } from "@chakra-ui/icons";
import DrawerNotification from "../DrawerNotification";
const Header = () => {
  const { selectedSection, user } = UserState();
  const [notification, setNotification] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpneNotificacao,
    onOpen: onOpenNotificacao,
    onClose: onCloseNotificacao,
  } = useDisclosure();
  const Toast = useToast();
  let imgSrc = "";

  const fecthNotificacoes = async () => {
    try {
      const data = await NotificacaoService.getNotificacao(user.token);
      setNotification(data);
    } catch (error) {
      Toast({
        title: "Erro",
        description: "Falha no processo de aprovacao da apresentacoes",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  };
  useEffect(() => {
    fecthNotificacoes();
  }, []);

  return (
    <Box
      w="100%"
      background="white"
      p="10px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      {selectedSection && (
        <Text color="#889F9E" fontSize="2xl" fontWeight="semibold">
          {selectedSection === "dashboard"
            ? "Dashboard"
            : `Apresentacoes ${selectedSection}`}
        </Text>
      )}
      <Box display="flex" justifyContent="space-around" alignItems="center">
        <Button
          onClick={onOpenNotificacao}
          background="white"
          borderRadius="full"
          leftIcon={<BellIcon fontSize="3xl" />}
        >
          <NotificationBagde
            position="absolute"
            count={notification.length}
            effect={Effect.SCLALE}
          />
        </Button>
        <Image
          onClick={onOpen}
          boxSize="30px"
          ml="10px"
          borderRadius="full"
          src={
            imgSrc.length <= 0
              ? createImageFromInitials(500, user.name, getRandomColor())
              : imgSrc
          }
        />
        <DrawerProfile isOpen={isOpen} onClose={onClose} />
        <DrawerNotification
          isOpen={isOpneNotificacao}
          onClose={onCloseNotificacao}
        />
      </Box>
    </Box>
  );
};
export default Header;
