import { Box, Text, HStack } from "@chakra-ui/react";
import { MdEmail } from "react-icons/Md";
import { AiFillTwitterSquare, AiFillFacebook } from "react-icons/ai";
const Footer = () => {
  return (
    <Box
      w="full"
      background="#0078C1"
      h={{ base: "auto", md: "290px" }}
      mt={20}
      py={10}
      p={{ base: "15px", md: "0" }}
      display="flex"
      bottom="0"
      alignItems="center"
      justifyContent="space-around"
      color="white"
      flexWrap="wrap"
    >
      <Box w={{ base: "100%", md: "320px" }}>
        <Text fontSize="3xl" fontWeight="bold">
          SGJC
        </Text>
        <Text mb={4} color="#15ABA2">
          Sistema de Gestao de Jornadas Científicas
        </Text>
        <Text>
          Sistema de gestão de jornadas científicas é uma plataforma onde
          estudantes e docentes compartilham ideias e inovações.
        </Text>
      </Box>
      <Box w={{ base: "100%", md: "auto" }} my={{ base: "20px", md: "0" }}>
        <Text fontSize="2xl" mb={3} fontWeight="bold">
          Sobre
        </Text>
        <Text>Normas das jornadas científicas</Text>
        <Text>Certificados</Text>
        <Text>Eventos Passados</Text>
        <Text>Sugestoes e reclamações</Text>
      </Box>
      <Box
        w={{ base: "100%", md: "auto" }}
        height={{ base: "auto", md: "50%" }}
      >
        <Text fontSize="2xl" mb={3} fontWeight="bold">
          Conctacto
        </Text>
        <HStack spacing="5px" alignSelf="revert" align="start">
          <AiFillFacebook fontSize="1.5rem" />
          <MdEmail fontSize="1.5rem" />
          <AiFillTwitterSquare fontSize="1.5rem" />
        </HStack>
      </Box>
    </Box>
  );
};

export default Footer;
