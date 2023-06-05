import { Box, Stack, useToast, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { UserState } from "../../context/UserProvider";
import ApresentacaoService from "../../service/ApresentacaoService";
import Card from "./Card";
import ChartGraph from "../chart/ChartGraph";

const Dashboard = () => {
  const [reprovados, setReprovados] = useState(0);
  const [aprovados, setAprovados] = useState(0);
  const [pendentes, setPendentes] = useState(0);
  const [total, setTotal] = useState(1);
  const { user } = UserState();
  const Toast = useToast();

  async function fetchApresentacoes() {
    try {
      const data = await ApresentacaoService.getApresentacoes(user.token);

      setAprovados(data.aprovados || 0);
      setReprovados(data.reprovados || 0);
      setPendentes(data.pendentes || 0);
      setTotal(data.total || 1);
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
    <VStack p="40px" spacing="40px">
      <Stack spacing="30px" direction={["column", "row"]} wrap="wrap">
        <Card
          type="Pendentes"
          total={pendentes}
          percentual={(pendentes * 100) / total}
        />
        <Card
          type="Aprovados"
          total={aprovados}
          percentual={(aprovados * 100) / total}
        />
        <Card
          type="Reprovados"
          total={reprovados}
          percentual={(reprovados * 100) / total}
        />
      </Stack>
      <Box
        w="100%"
        display={{ base: "none", md: "flex" }}
        height="50vh"
        justifyContent="center"
        alignContent="center"
        px="60px"
      >
        <ChartGraph
          type="ColumnChart"
          reprovados={reprovados}
          aprovados={aprovados}
          pendentes={pendentes}
        />
        <ChartGraph
          type="PieChart"
          reprovados={reprovados}
          aprovados={aprovados}
          pendentes={pendentes}
        />
      </Box>
    </VStack>
  );
};
export default Dashboard;
