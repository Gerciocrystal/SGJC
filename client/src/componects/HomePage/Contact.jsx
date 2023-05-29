import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  VStack,
  RadioGroup,
  HStack,
  Radio,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";
import { MdAttachEmail, MdEmail } from "react-icons/Md";
import {
  AiFillPhone,
  AiFillTwitterSquare,
  AiFillFacebook,
} from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { useState } from "react";
import ReclamacaoService from "../../service/ReclamacaoService";
const Contact = () => {
  const [nome, setNome] = useState("");
  const [cod_estudante, setCod_estudante] = useState("");
  const [email, setEmail] = useState("");
  const [contacto, setContacto] = useState("");
  const [problema, setProblema] = useState("login");
  const [descricao, setDescricao] = useState("");
  const Toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !problema ||
      !nome ||
      !cod_estudante ||
      !email ||
      !contacto ||
      !descricao
    ) {
      Toast({
        title: "Dados Incorectos",
        description: "Preencha todos os campos.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      return;
    }
    try {
      const data = await ReclamacaoService.saveReclamacao({
        nome,
        cod_estudante,
        email,
        contacto,
        problema,
        descricao,
      });

      console.log(data);
      Toast({
        title: "Reclamacao enviada",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      Toast({
        title: "Erro no processo de criacao de Reclamacao",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Box
      id="contacto"
      mx={20}
      my={5}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Text my={5} fontSize="3xl" fontWeight="bold">
        Contacto
      </Text>
      <Box
        display="flex"
        // height={{ base: "auto", md: "465px" }}
        width={{ base: "350px", md: "100%" }}
        // alignItems="center"
        background="white"
        borderRadius="base"
        boxShadow="base"
        p={{ base: "5", md: "10px" }}
      >
        <Box
          display={{ base: "none", md: "block" }}
          borderRadius="md"
          backgroundImage="/bg-sidebar-desktop.svg"
          backgroundPosition="center"
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          // h="full"
          w="290px"
          color="white"
        >
          <VStack spacing="90px" px={5} py={3}>
            <Box mt={2}>
              <Text fontSize="2xl" fontWeight="semibold" mb={2}>
                Contactos de suporte
              </Text>
              <Text fontSize="sm">
                Preencha todos os campos para que a nossa equipe de suporte
                possa o ajudar
              </Text>
            </Box>
            <VStack spacing="15px" align="start">
              <Box display="flex" alignItems="center">
                <MdAttachEmail />
                <Text mx={2}>Emailfake@gmail.com</Text>
              </Box>
              <Box display="flex" alignItems="center">
                <AiFillPhone />
                <Text mx={2}>840224546</Text>
              </Box>
              <Box display="flex" alignItems="center">
                <GoLocation />
                <Text mx={2}>Campus de Lhanguene - Maputo </Text>
              </Box>
            </VStack>
            <HStack spacing="5px" alignSelf="revert" align="start">
              <AiFillFacebook fontSize="1.3rem" />
              <MdEmail fontSize="1.3rem" />
              <AiFillTwitterSquare fontSize="1.3rem" />
            </HStack>
          </VStack>
        </Box>
        <Box flex={1}>
          <VStack
            spacing="20px"
            px={{ base: "0", md: "10" }}
            py={{ base: "0", md: "20px" }}
          >
            <Box display={{ base: "block", md: "flex" }} w="full">
              <FormControl mr={10}>
                <FormLabel>Nome completo</FormLabel>
                <Input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Codigo de Estudane</FormLabel>
                <Input
                  type="text"
                  value={cod_estudante}
                  onChange={(e) => setCod_estudante(e.target.value)}
                />
              </FormControl>
            </Box>
            <Box display={{ base: "block", md: "flex" }} w="full">
              <FormControl mr={10}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Numero de telefone</FormLabel>
                <Input
                  type="text"
                  value={contacto}
                  onChange={(e) => setContacto(e.target.value)}
                />
              </FormControl>
            </Box>
            <Box w="full">
              <FormControl as="fieldset">
                <FormLabel as="legend">
                  Escolha o problema que o site tem apresentado (Opcional)
                </FormLabel>
                <RadioGroup
                  defaultValue="login"
                  onChange={(e) => setProblema(e)}
                >
                  <HStack spacing="24px">
                    <Radio value="login">Login</Radio>
                    <Radio value="dados_incorectos">Dados incorectos</Radio>
                    <Radio value="Lentidao">Outro</Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
            </Box>
            <Box display="flex" w="full" px>
              <FormControl>
                <FormLabel>Detalhes do problema</FormLabel>
                <Textarea
                  height="110px"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </FormControl>
            </Box>
            <Button alignSelf="end" colorScheme="blue" onClick={handleSubmit}>
              Submeter
            </Button>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};
export default Contact;
