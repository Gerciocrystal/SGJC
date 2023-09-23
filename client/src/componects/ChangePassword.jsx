import {
  Modal,
  ModalOverlay,
  Button,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useState } from "react";
import UserService from "../service/UserService";
import { UserState } from "../context/UserProvider";
const ChangePassword = ({ isOpen, onClose }) => {
  const { user } = UserState();
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const Toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!username || !password || !newPassword) {
        Toast({
          title: "Aviso",
          description: "Preencha todos os campos",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setLoading(false);
        return;
      }
      if (password == newPassword) {
        Toast({
          title: "Aviso",
          description: "A Nova password nao pode ser igual a actual",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setLoading(false);
        return;
      }
      const data = await UserService.changePassword(
        {
          username: username,
          password: password,
          newPassword: newPassword,
        },
        user.token
      );

      setLoading(false);
      Toast({
        title: data.name,
        description: "Troca de Password efetuada com sucesso",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setNewPassword("");
      setPassword("");
      onClose();
    } catch (error) {
      Toast({
        title: "Erro",
        description: "Falha no processo de Troca de Password",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setNewPassword("");
      setPassword("");
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Formulario de Registro de Docente</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing="5px">
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>New Password</FormLabel>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="linkedin"
            onClick={handleSubmit}
            isLoading={loading}
          >
            Trocar
          </Button>
          <Button colorScheme="blue" mx={3} onClick={onClose}>
            voltar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
ChangePassword.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default ChangePassword;
