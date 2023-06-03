import {
  Box,
  Image,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  // MenuItemOption,
  // MenuGroup,
  IconButton,
} from "@chakra-ui/react";
import { getRandomColor, createImageFromInitials } from "./chart/Util";
import { AiFillSetting } from "react-icons/ai";
import {
  AddIcon,
  ExternalLinkIcon,
  RepeatIcon,
  EditIcon,
} from "@chakra-ui/icons";
import PropTypes from "prop-types";
import { UserState } from "../../context/UserProvider";
import DrawerProfile from "../DrawerProfile";
import NovoDocente from "./misselation/NovoDocente";
import NovoAluno from "./misselation/NovoAluno";
const Header = ({ name }) => {
  const { selectedSection } = UserState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDocente,
    onOpen: onOpenDocente,
    onClose: onCloseDocente,
  } = useDisclosure();
  const {
    isOpen: isOpenEstudante,
    onOpen: onOpenEstudante,
    onClose: onCloseEstudante,
  } = useDisclosure();
  let imgSrc = "";
  return (
    <Box
      w="100%"
      background="white"
      p="10px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      {selectedSection && (
        <Text color="#889F9E" fontSize="2xl" fontWeight="semibold">
          {selectedSection === "dashboard"
            ? "Dashboard"
            : `Apresentacoes ${selectedSection}`}
        </Text>
      )}
      <Box display="flex" justifyContent="space-around" alignItems="center">
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<AiFillSetting fontSize="1.5rem" />}
            variant="outline"
          />
          <MenuList>
            <MenuItem icon={<AddIcon />} command="⌘D" onClick={onOpenDocente}>
              Adiconar docente
            </MenuItem>
            <MenuItem
              icon={<ExternalLinkIcon />}
              command="⌘N"
              onClick={onOpenEstudante}
            >
              Adicionar estudante
            </MenuItem>
            <MenuItem icon={<RepeatIcon />} command="⌘⇧N">
              Reclamacoes
            </MenuItem>
            <MenuItem icon={<AddIcon />} command="⌘O">
              Adicionar Departamento
            </MenuItem>
            <MenuItem icon={<EditIcon />} command="⌘O">
              Adicionar Categoria
            </MenuItem>
          </MenuList>
        </Menu>
        <Image
          onClick={onOpen}
          boxSize="30px"
          ml="20px"
          borderRadius="full"
          src={
            imgSrc.length <= 0
              ? createImageFromInitials(500, name, getRandomColor())
              : imgSrc
          }
        />
        <DrawerProfile isOpen={isOpen} onClose={onClose} />
        <NovoDocente isOpen={isOpenDocente} onClose={onCloseDocente} />
        <NovoAluno isOpen={isOpenEstudante} onClose={onCloseEstudante} />
      </Box>
    </Box>
  );
};
Header.propTypes = {
  name: PropTypes.string.isRequired,
};
export default Header;
