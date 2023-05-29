import PropTypes from "prop-types";
import { Box, Text } from "@chakra-ui/react";
const Card = ({ title, content, numero }) => {
  console.log(title);
  console.log(content);
  return (
    <Box
      minW="320px"
      w="350px"
      m={2}
      p={4}
      background="white"
      borderRadius="base"
      boxShadow="base"
      position="relative"
    >
      <Box
        alignSelf="start"
        background={numero === 1 ? "#0078C1" : "black"}
        color="white"
        fontSize="1rem"
        fontWeight="bold"
        boxShadow="base"
        borderRadius="full"
        width="25px"
        height="25px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {numero}
      </Box>
      <Text fontWeight="bold" fontSize="xl" mb={1}>
        {title}
      </Text>
      <Text textAlign="justify">
        Após a submissão da proposta, este site poderá ser usado como um
        repositório de apresentacões de trabalhos ou projectos, para futuras
        consultas.
      </Text>
    </Box>
  );
};
Card.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  numero: PropTypes.number.isRequired,
};
export default Card;
