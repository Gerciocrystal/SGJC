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
import EstudantesService from "../../../service/EstudantesService";

const NovoAluno = ({ isOpen, onClose }) => {
  const [departamentos, setDepartamentos] = useState([]);
  const [name, setName] = useState("");
  const [cod_estudante, setCodEstudante] = useState("");
  const [email, setEmail] = useState("");
  const [ano_entrada, setAnoEntrada] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = UserState();
  const Toast = useToast();

  const fetchDepartamentos = async () => {
    const data = await DepartamentoService.getDepartamentos(user.token);
    setDepartamentos(data);
    setDepartamento(data[0]._id);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!cod_estudante || !ano_entrada || !email || !name || !departamento) {
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
      const data = await EstudantesService.saveEstudante(
        {
          cod_estudante: cod_estudante,
          email: email,
          nome: name,
          departamento: departamento,
          ano_entrada: ano_entrada,
        },
        user.token
      );
      setLoading(false);
      console.log(data);
      Toast({
        title: data.name,
        description: "Estuante Incrito com sucesso",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      onClose();
    } catch (error) {
      Toast({
        title: "Erro",
        description: "Falha no processo de Criacao de novo Estudante",
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
        <ModalHeader>Formulario de Registro de Estudante</ModalHeader>
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
              <FormLabel>codigo de estudante</FormLabel>
              <Input
                type="text"
                value={cod_estudante}
                onChange={(e) => setCodEstudante(e.target.value)}
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
              <FormLabel>Ano de inscricao</FormLabel>
              <Input
                type="number"
                value={ano_entrada}
                onChange={(e) => setAnoEntrada(e.target.value)}
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
NovoAluno.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default NovoAluno;
