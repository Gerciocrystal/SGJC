import {
  Box,
  Button,
  HStack,
  Image,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { UserState } from "../../context/UserProvider";
import ApresentacaoService from "../../service/ApresentacaoService";
import { AiOutlineFilePdf } from "react-icons/ai";
import NotificacaoService from "../../service/NotificacaoService";
import { AddIcon } from "@chakra-ui/icons";
import NovaApresentacao from "../admin/misselation/NovaApresentacao";
const Disponiveis = () => {
  const [apresentacoes, setApresentacoes] = useState([]);
  const [fecthAgain, setFectchAgain] = useState(false);
  const { user } = UserState();
  const Toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fetchApresentacoes = async () => {
    try {
      const data = await ApresentacaoService.getMinhasApresentacoes(user.token);
      setApresentacoes(data);
    } catch (error) {
      Toast({
        title: "Erro",
        description: "Falha no processo de procura de apresentacoes",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  };
  const handleDelete = async (_id) => {
    try {
      const data = await ApresentacaoService.deleteApresentacao(
        _id,
        user.token
      );
      const notificacao = await NotificacaoService.saveNotificacao(
        {
          user: user._id,
          tipo: `${data.tema}, Apagada`,
          descricao: `A apresentacao intitulada ${data.tema.toUpperCase()} foi eliminada das jornadas cientificas, o seu status era de ${data.status.toUpperCase()}`,
        },
        user.token
      );
      console.log(notificacao);
      Toast({
        title: `Apresentacao ${data.tema} Apagada`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      setFectchAgain(!fecthAgain);
    } catch (error) {
      Toast({
        title: "Erro",
        description: "Falha no processo de delete",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  };
  useEffect(() => {
    fetchApresentacoes();
  }, [fecthAgain]);
  return (
    <Box w="100%" display="flex" alignItems="center" justifyContent="center">
      <Box w="60%" mt="50px" height="80vh">
        <VStack spacing="15px">
          <Button
            leftIcon={<AddIcon />}
            background="#C0F5FF"
            color="black"
            px="6px"
            fontSize="sm"
            height="35px"
            alignSelf="end"
            onClick={onOpen}
          >
            apresentacao
          </Button>

          {apresentacoes.length > 0
            ? apresentacoes.map((apresentacao) => (
                <Box
                  key={apresentacao._id}
                  display="flex"
                  justifyContent="space-between"
                  background="white"
                  borderRadius="base"
                  boxShadow="base"
                  width="100%"
                  height="65px"
                  p="3px"
                  _hover={{
                    boxShadow: "lg",
                  }}
                >
                  <HStack flex={1}>
                    <VStack spacing="2px" color="white">
                      <HStack>
                        <AiOutlineFilePdf fontSize="1rem" color="#E89191" />

                        <Text fontWeight="bold" fontSize="1rem" color="#889F9E">
                          {apresentacao.tema}
                        </Text>

                        <Box
                          ml="10px"
                          py="1px"
                          px="6px"
                          borderRadius="base"
                          display="flex"
                          fontSize="sm"
                          color={
                            apresentacao.status === "APROVADO"
                              ? "#46D676"
                              : "white"
                          }
                          background={
                            apresentacao.status === "PENDENTE"
                              ? "#FBD679"
                              : "#ED3548"
                          }
                          backgroundColor={
                            apresentacao.status === "APROVADO" ? "#F0F6FF" : ""
                          }
                        >
                          {apresentacao.status === "APROVADO" && (
                            <Image
                              boxSize="20px"
                              mr={1}
                              src="/icons8-approved-48.png"
                            />
                          )}
                          {apresentacao.status}
                        </Box>
                      </HStack>
                      <Box alignSelf="flex-start" pl="25px">
                        <HStack spacing="2px">
                          {apresentacao.participantes.length > 0 ? (
                            apresentacao.participantes.map((par) => (
                              <Text
                                key={par._id}
                                color="black"
                                fontWeight="semibold"
                                textAlign="left"
                                fontSize="small"
                              >
                                {par.name},
                              </Text>
                            ))
                          ) : (
                            <Text>{apresentacao.author.name}</Text>
                          )}
                        </HStack>
                      </Box>
                    </VStack>
                  </HStack>
                  <VStack width="100px">
                    <Button
                      height="25px"
                      background="#F0F6FF"
                      color="#ED3548"
                      onClick={() => handleDelete(apresentacao._id)}
                    >
                      <Image
                        src="/icons8-remove-30.png"
                        borderRadius="full"
                        boxSize="18px"
                        mr="3px"
                        alignSelf="center"
                      />
                      <Text alignSelf="center" fontWeight="normal">
                        Excluir
                      </Text>
                    </Button>
                    <Button
                      height="25px"
                      background="#F0F6FF"
                      color="#E0A536"
                      fontWeight="normal"
                    >
                      <Image
                        src="/icons8-star-half-empty-30.png"
                        borderRadius="full"
                        boxSize="18px"
                        mr="3px"
                        alignSelf="center"
                      />
                      <Text alignSelf="center">Editar</Text>
                    </Button>
                  </VStack>
                </Box>
              ))
            : "Sem Registros"}
        </VStack>
      </Box>
      <NovaApresentacao
        isOpen={isOpen}
        onClose={onClose}
        fetcthAgain={fecthAgain}
        setFecthAgain={setFectchAgain}
      />
    </Box>
  );
};
export default Disponiveis;
