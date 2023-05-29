import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
const Header = () => {
  const navigate = useNavigate();
  return (
    <Box
      color="white"
      display="flex"
      p="4px"
      py="10px"
      justifyContent="space-between"
      alignItems="center"
      backdropFilter="auto"
      backdropInvert="20%"
      backdropBlur="2px"
    >
      <Image boxSize="35px" objectFit="cover" src="/up.png" alt="UPM Logo" />
      <Box display="flex" justifyContent="space-around" alignItems="center">
        <Text fontSize=".9rem" cursor="pointer">
          <Link to="home" spy={true} smooth={true} offset={50} duration={500}>
            Home
          </Link>
        </Text>
        <Text mx={"26px"} fontSize=".9rem" cursor="pointer">
          <Link to="sobre" spy={true} smooth={true} offset={50} duration={500}>
            Sobre
          </Link>
        </Text>
        <Text fontSize=".9rem" cursor="pointer">
          <Link
            to="contacto"
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
          >
            contacto
          </Link>
        </Text>
      </Box>
      <Button
        colorScheme="blackAlpha"
        size="md"
        onClick={() => navigate("/login")}
      >
        Login
      </Button>
    </Box>
  );
};
export default Header;
