import {
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  useToast,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { UserState } from "../../context/UserProvider";
import ApresentacaoService from "../../service/ApresentacaoService";
import ApresentacoesLoading from "./ApresentacoesLoading";

const Disponiveis = () => {
  const { user } = UserState();
  const Toast = useToast();
  const [apresentacoes, setApresentacoes] = useState([]);

  async function fetchApresentacoes() {
    try {
      const data = await ApresentacaoService.getApresentacoes(user.token);
      setApresentacoes(data.data);
      console.log(data.data);
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
  }
  useEffect(() => {
    fetchApresentacoes();
  }, []);
  return (
    <Box
      w="100%"
      display="flex"
      justifyContent="center"
      height="60vh"
      alignItems="center"
    >
      {apresentacoes ? (
        <TableContainer background="white" boxShadow="base" height="40vh">
          <Table variant="simple">
            <TableCaption>Lista das Apresentacoes disponiveis</TableCaption>
            <Thead>
              <Tr>
                <Th color="#889F9E">Autor</Th>
                <Th color="#889F9E">Supervisor</Th>
                <Th color="#889F9E">Ficheito</Th>
                <Th color="#889F9E">Status</Th>
                <Th color="#889F9E">accoes</Th>
              </Tr>
            </Thead>
            <Tbody>
              {apresentacoes.map((apresentacao) => (
                <Tr
                  key={apresentacao._id}
                  color="#6E7C7C"
                  fontWeight="semibold"
                  fontSize="sm"
                >
                  <Td>{apresentacao.author.name}</Td>
                  <Td>{apresentacao.supervisor.name}</Td>
                  <Td>{apresentacao.arquivo_path}</Td>
                  <Td>{apresentacao.status}</Td>
                  <Td>
                    <Button>remove</Button>
                    <Button>remove</Button>
                    <Button>remove</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Td>paginacao</Td>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      ) : (
        <ApresentacoesLoading />
      )}
    </Box>
  );
};
Disponiveis.propTypes = {
  apresentacoes: PropTypes.array.isRequired,
};
export default Disponiveis;
