import {
  Box,
  Button,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import { GiHamburgerMenu } from "react-icons/gi";
const Header = () => {
  const navigate = useNavigate();

  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  return (
    <Box
      color="white"
      display="flex"
      p="10px"
      // py="10px"
      justifyContent="space-between"
      alignItems="center"
      backdropFilter="auto"
      backdropInvert="20%"
      backdropBlur="2px"
    >
      <Image boxSize="35px" objectFit="cover" src="/up.png" alt="UPM Logo" />
      {isLargerThan768 ? (
        <>
          <Box display="flex" justifyContent="space-around" alignItems="center">
            <Text fontSize=".9rem" cursor="pointer">
              <Link
                to="home"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
              >
                Inicío
              </Link>
            </Text>
            <Text mx={"26px"} fontSize=".9rem" cursor="pointer">
              <Link
                to="sobre"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
              >
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
                Contacto
              </Link>
            </Text>
          </Box>
          <Button
            colorScheme="blackAlpha"
            size="md"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>{" "}
        </>
      ) : (
        <Menu color="black">
          <MenuButton
            colorScheme="blue"
            as={IconButton}
            aria-label="Options"
            icon={<GiHamburgerMenu />}
          ></MenuButton>
          <MenuList>
            <Link to="home" spy={true} smooth={true} offset={50} duration={500}>
              <MenuItem command="⌘H" color="black">
                Inicío
              </MenuItem>
            </Link>
            <Link
              to="sobre"
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
            >
              <MenuItem command="⌘S" color="black">
                Sobre
              </MenuItem>
            </Link>
            <Link
              to="contacto"
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
            >
              <MenuItem command="⌘C" color="black">
                Contacto
              </MenuItem>
            </Link>
            <MenuItem
              command="⌘C"
              color="black"
              onClick={() => navigate("/login")}
            >
              <Text>Login</Text>
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </Box>
  );
};
export default Header;
