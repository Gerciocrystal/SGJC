import { Box, VStack, Button, Text } from "@chakra-ui/react";
import Header from "./Header";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
const Hero = () => {
  const navigate = useNavigate();
  return (
    <Box
      id="home"
      overflow="hidden"
      display="100%"
      height="100vh"
      background="rgba(0, 0, 0, 0.6) url('/hero.jpg')"
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundBlendMode="darken"
    >
      <Header />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        px="20%"
        color="white"
      >
        <VStack spacing={5} align="center">
          <Text
            fontSize={{ base: "3xl", md: "6xl" }}
            fontWeight="bold"
            textAlign="center"
            mt={12}
          >
            <span style={{ color: "#F8CB2E" }}> Bem vindo</span> ao Sistema de
            Gestao de{" "}
            <span style={{ color: "#F8CB2E" }}>jornadas cientificas</span>
          </Text>
          <Text fontSize={{ base: "sm", md: "xl" }} textAlign="center">
            Faça parte da comunidade cientifica da UPM, mostrando seus projectos
            ao mundo, venha e participe das jornadas cientificas
          </Text>
          <Box display="flex">
            <Button
              colorScheme="blackAlpha"
              background="black"
              size={{ base: "sm", md: "lg" }}
              mx={4}
            >
              <Link
                to="sobre"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
              >
                Saiba Mais
              </Link>
            </Button>
            <Button
              colorScheme="blue"
              size={{ base: "sm", md: "lg" }}
              onClick={() => navigate("/login")}
            >
              Fazer Parte
            </Button>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};
export default Hero;
