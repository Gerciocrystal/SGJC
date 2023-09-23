import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  useToast,
  Link,
  VStack,
  HStack,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure,
  Textarea,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { UserState } from "../../context/UserProvider";
import ApresentacaoService from "../../service/ApresentacaoService";
import ApresentacoesLoading from "./ApresentacoesLoading";
import { AiOutlineFilePdf } from "react-icons/ai";
import NotificacaoService from "../../service/NotificacaoService";

const Reprovados = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = UserState();
  const Toast = useToast();
  const [apresentacoes, setApresentacoes] = useState([]);
  const [currentPage, setCurentPage] = useState(1);
  const [fecthAgain, setFecthAgain] = useState(false);
  const [selectedApresentacao, setSelectedApresentacao] = useState(false);
  const [descricao, setDescricao] = useState(
    "um texto aleatorio inventado no momento para prencher a base de dados no texte de aprovacao"
  );
  const recordPerPage = 3;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;

  const records = apresentacoes.slice(firstIndex, lastIndex);
  const npage = Math.ceil(apresentacoes.length / recordPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const [loading, setLoading] = useState(false);
  async function fetchApresentacoes() {
    setLoading(true);
    try {
      const response = await ApresentacaoService.getApresentacoesEspecificas(
        user.token,
        "REPROVADO"
      );
      setApresentacoes(response.data);
      setSelectedApresentacao(apresentacoes[0]);
      setLoading(false);
    } catch (error) {
      Toast({
        title: "Erro",
        description: "Falha no processo de procura de apresentacoes",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchApresentacoes();
  }, [fecthAgain]);
  const changePage = (id) => {
    setCurentPage(id);
  };
  const handleStatus = async (_id, _idAuthor, status) => {
    setLoading(true);
    try {
      const data = await ApresentacaoService.updadeApresentacao(
        { idApresentacao: _id, status: status },
        user.token
      );
      const notificacao = await NotificacaoService.saveNotificacao(
        {
          user: _idAuthor,
          tipo: `${data.tema}, ${data.status}`,
          descricao: `${descricao}`,
        },
        user.token
      );
      console.log(notificacao);
      Toast({
        title: data.status,
        description: `Apresentacao ${data.status}`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      onClose();
      setLoading(false);
      setFecthAgain(!fecthAgain);
    } catch (error) {
      Toast({
        title: "Erro",
        description: "Falha no processo de aprovacao da apresentacoes",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      setLoading(false);
    }
  };
  const handleAvaliar = (apresentacao) => {
    console.log(apresentacao);
    setSelectedApresentacao(apresentacao);

    onOpen();
  };
  return (
    <Box
      w="100%"
      display="flex"
      justifyContent="center"
      height="60vh"
      mt="20px"
      alignItems="center"
    >
      {apresentacoes ? (
        <VStack spacing="0">
          <TableContainer background="white" boxShadow="base" height="40vh">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th color="#889F9E">Autor</Th>
                  <Th color="#889F9E">Supervisor</Th>
                  <Th color="#889F9E">Ficheiro</Th>
                  <Th color="#889F9E">Status</Th>
                  <Th color="#889F9E">accoes</Th>
                </Tr>
              </Thead>
              <Tbody>
                {records.map((apresentacao) => (
                  <Tr
                    key={apresentacao._id}
                    color="#6E7C7C"
                    fontWeight="semibold"
                    fontSize="sm"
                  >
                    <Td>{apresentacao.author.name}</Td>
                    <Td>{apresentacao.supervisor.name}</Td>
                    <Td color="#E89191">
                      <HStack spacing="2px">
                        <AiOutlineFilePdf fontSize="1.2rem" />
                        <Text>
                          <Link href={apresentacao.arquivo_path} isExternal>
                            {apresentacao.tema}
                          </Link>
                        </Text>
                      </HStack>
                    </Td>

                    <Td>
                      {apresentacao.status === "PENDENTE" && (
                        <Box
                          background="#FBD679"
                          color="white"
                          py="2px"
                          px="3px"
                          borderRadius="base"
                        >
                          {apresentacao.status}
                        </Box>
                      )}
                      {apresentacao.status === "REPROVADO" && (
                        <Box
                          background="#ED3548"
                          color="white"
                          py="2px"
                          px="3px"
                          borderRadius="base"
                        >
                          {apresentacao.status}
                        </Box>
                      )}
                      {apresentacao.status === "APROVADO" && (
                        <Box
                          background="#46D676"
                          color="white"
                          py="2px"
                          px="3px"
                          borderRadius="base"
                        >
                          {apresentacao.status}
                        </Box>
                      )}
                    </Td>

                    <Td>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Button
                          fontWeight="normal"
                          w="31%"
                          borderRadius="base"
                          height="30px"
                          background="#F0F6FF"
                          color="#46D676"
                          isDisabled={loading}
                          onClick={() =>
                            handleStatus(
                              apresentacao._id,
                              apresentacao.author._id,
                              "APROVADO"
                            )
                          }
                        >
                          <Image
                            src="/icons8-approved-48.png"
                            borderRadius="full"
                            boxSize="18px"
                            mr="3px"
                            alignSelf="center"
                          />
                          <Text alignSelf="center">Aprovar</Text>
                        </Button>
                        <Button
                          fontWeight="normal"
                          w="31%"
                          borderRadius="base"
                          height="30px"
                          background="#F0F6FF"
                          color="#ED3548"
                          isDisabled={true}
                          onClick={() =>
                            handleStatus(
                              apresentacao._id,
                              apresentacao.author._id,
                              "REPROVADO"
                            )
                          }
                        >
                          <Image
                            src="/icons8-remove-30.png"
                            borderRadius="full"
                            boxSize="18px"
                            mr="3px"
                            alignSelf="center"
                          />
                          <Text alignSelf="center">Reprovar</Text>
                        </Button>
                        <Button
                          fontWeight="normal"
                          w="31%"
                          borderRadius="base"
                          isDisabled={loading}
                          height="30px"
                          background="#F0F6FF"
                          color="#E0A536"
                          onClick={() => handleAvaliar(apresentacao)}
                        >
                          <Image
                            src="/icons8-star-half-empty-30.png"
                            borderRadius="full"
                            boxSize="18px"
                            mr="3px"
                            alignSelf="center"
                          />
                          <Text alignSelf="center">Avaliar</Text>
                        </Button>
                      </Box>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <HStack
            height="50px"
            width="100%"
            boxShadow="base"
            background="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {numbers.map((n, i) => (
              <Box
                key={i}
                border="1px"
                py="1px"
                px="8px"
                borderColor="#D9D9D9"
                color={currentPage === n ? "black" : "#D9D9D9"}
                borderRadius="base"
                background={currentPage === n ? "#D9D9D9" : ""}
                fontWeight="semibold"
              >
                <Link to="#" onClick={() => changePage(n)}>
                  {n}
                </Link>
              </Box>
            ))}
          </HStack>
        </VStack>
      ) : (
        <ApresentacoesLoading />
      )}

      {selectedApresentacao && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedApresentacao.tema}</ModalHeader>
            <ModalCloseButton />
            <ModalBody w="100%">
              <VStack pacing="5px">
                <Text alignSelf="start">
                  {selectedApresentacao.author.name}
                </Text>
                <Text alignSelf="start">
                  {selectedApresentacao.author.email}
                </Text>
                <Box color="#E89191">
                  <HStack spacing="2px" cursor="pointer">
                    <AiOutlineFilePdf fontSize="1.2rem" />
                    <Text>{selectedApresentacao.tema}</Text>
                  </HStack>
                </Box>
                <FormControl>
                  <FormLabel>Avalie o trabalho</FormLabel>
                  <Textarea
                    w="100%"
                    h="60px"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                  ></Textarea>
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button
                background="#46D676"
                color="white"
                loading={loading}
                mx={3}
                onClick={() =>
                  handleStatus(
                    selectedApresentacao._id,
                    selectedApresentacao.author._id,
                    "APROVADO"
                  )
                }
              >
                Aprovar
              </Button>

              <Button colorScheme="blue" mx={3} onClick={onClose}>
                Voltar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default Reprovados;
