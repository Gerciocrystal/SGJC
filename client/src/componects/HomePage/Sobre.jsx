import { Box, Text } from "@chakra-ui/react";
import Card from "./Card";
const Sobre = () => {
  return (
    <Box
      id="sobre"
      mx={20}
      my={5}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Text fontSize="3xl" fontWeight="bold">
        Sobre
      </Text>
      <Box
        display="flex"
        alignItems="center"
        flexWrap="wrap"
        justifyContent="space-around"
      >
        <Card title="Repositório" content="" numero={1} />
        <Card title="Certificação" content="" numero={2} />
        <Card title="Networking" content="" numero={3} />
      </Box>
    </Box>
  );
};
export default Sobre;
