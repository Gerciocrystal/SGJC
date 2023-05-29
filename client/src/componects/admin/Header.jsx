import { Box, Image, Text } from "@chakra-ui/react";
import { getRandomColor, createImageFromInitials } from "./chart/Util";
import { AiFillSetting } from "react-icons/Ai";
import PropTypes from "prop-types";
import { UserState } from "../../context/UserProvider";
const Header = ({ name }) => {
  const { selectedSection } = UserState();

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
        <AiFillSetting fontSize="1.5rem" />
        <Image
          boxSize="30px"
          ml="20px"
          borderRadius="full"
          src={
            imgSrc.length <= 0
              ? createImageFromInitials(500, name, getRandomColor())
              : imgSrc
          }
        />
      </Box>
    </Box>
  );
};
Header.propTypes = {
  name: PropTypes.string.isRequired,
};
export default Header;