import {
  Box,
  VStack,
  Image,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Button,
  Text,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserState } from "../context/UserProvider";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { authenticate } = UserState();
  const Toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      if (user.type === "ADMIN") {
        navigate("/admin/home");
      } else navigate("/user/home");
    }
  }, [navigate]);
  const handleClick = () => {
    setShow(!show);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      if (!username || !password) {
        Toast({
          title: "Preencha todos os campos",
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        return;
      }
      const data = await authenticate(username, password); //authenticate user
      if (data.type === "ADMIN") {
        navigate("/admin/home");
      } else navigate("/user/home");
      Toast({
        title: "Bem vindo ao SGJC",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setLoading(false)
    } catch (error) {
      console.log(error);
      Toast({
        title: "O username e o password Nao combinam",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setLoading(false)
    }
  };
  return (
    <Box display="flex" alignItems="center" justifyContent="center" w="100%">
      <Box
        w="280px"
        p="15px"
        background="white"
        borderRadius="base"
        boxShadow="base"
      >
        <VStack spacing="15px">
          <Image
            boxSize="100px"
            objectFit="cover"
            src="/up.png"
            alt="UPM Logo"
          />
          <Text fontSize="3xl" fontWeight="semibold">
            Login
          </Text>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "hide" : "show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button colorScheme="blue" w="full" onClick={handleSubmit} loading={loading}>
            Login
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};
export default Login;
