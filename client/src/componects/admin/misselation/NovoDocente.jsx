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
  Select,
  VStack,
  useToast,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { UserState } from "../../../context/UserProvider";
import DepartamentoService from "../../../service/DepartamentoService";
import UserService from "../../../service/UserService";
const NovoDocente = ({ isOpen, onClose }) => {
  const [departamentos, setDepartamentos] = useState([]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [departamento, setDepartamento] = useState("FET");
  const [loading, setLoading] = useState(false);
  const { user } = UserState();
  const Toast = useToast();

  const fetchDepartamentos = async () => {
    const data = await DepartamentoService.getDepartamentos(user.token);
    setDepartamentos(data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!username || !email || !name) {
        Toast({
          title: "Aviso",
          description: "Preencha todos os campos",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        return;
      }
      const data = await UserService.saveUser(
        {
          username: username,
          email: email,
          name: name,
          departamento: departamento,
          password: "1234",
        },
        user.token
      );

      setLoading(false);
      Toast({
        title: data.name,
        description: "Docente Incrito com sucesso",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      onClose();
    } catch (error) {
      Toast({
        title: "Erro",
        description: "Falha no processo de Criacao de novo docente",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDepartamentos();
  }, []);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Formulario de Registro de Docente</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing="5px">
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Departamento</FormLabel>
              <Select
                name="departametno"
                onChange={(e) => setDepartamento(e.target.value)}
              >
                {departamentos.length > 0 &&
                  departamentos.map((dep) => (
                    <option key={dep._id} value={dep._id}>
                      {dep.sigla}
                    </option>
                  ))}
              </Select>
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="linkedin"
            onClick={handleSubmit}
            isLoading={loading}
          >
            Adiconar
          </Button>
          <Button colorScheme="blue" mx={3} onClick={onClose}>
            voltar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
NovoDocente.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default NovoDocente;
