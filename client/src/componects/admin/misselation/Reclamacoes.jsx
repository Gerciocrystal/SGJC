import {
  Modal,
  ModalOverlay,
  Button,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  useToast,
  Box,
  Text,
  StackDivider,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { UserState } from "../../../context/UserProvider";
import ReclamacaoService from "../../../service/ReclamacaoService";
import ApresentacoesLoading from "../ApresentacoesLoading";
const Reclamacoes = ({ isOpen, onClose }) => {
  const [reclamacoes, setReclamacoes] = useState([]);
  const { user } = UserState();
  const Toast = useToast();
  const fecthReclamacoes = async () => {
    try {
      const data = await ReclamacaoService.getReclamacoes(user.token);
      setReclamacoes(data);
    } catch (error) {
      Toast({
        title: "Erro de coneccao",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };
  useEffect(() => {
    fecthReclamacoes();
  }, []);

  return (
    <>
      {reclamacoes ? (
        <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Formulario de leitura de Reclamacoes</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack
                height="400px"
                spacing="10px"
                divider={<StackDivider borderColor="gray.200" />}
              >
                {reclamacoes.map((reclamacao) => (
                  <Box key={reclamacao._id}>
                    <VStack spacing="8px">
                      <Text
                        color="red.400"
                        alignSelf="start"
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        {reclamacao.problema}
                      </Text>
                      <Text alignSelf="flex-start">
                        {reclamacao.cod_estudante}
                      </Text>
                      <Text alignSelf="flex-start">{reclamacao.email}</Text>
                      <Box
                        alignSelf="flex-start"
                        height="40px"
                        textAlign="justify"
                      >
                        {reclamacao.descricao}
                      </Box>
                    </VStack>
                  </Box>
                ))}
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mx={3} onClick={onClose}>
                voltar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      ) : (
        <ApresentacoesLoading />
      )}
    </>
  );
};
Reclamacoes.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default Reclamacoes;
