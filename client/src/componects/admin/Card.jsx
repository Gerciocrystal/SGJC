import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import PropTypes from "prop-types";

const Card = ({ type, total, percentual }) => {
  return (
    <Box
      w="300px"
      height="110px"
      background={type == "Pendentes" ? "#FBD679" : "#FE9F9F"}
      backgroundColor={type == "Aprovados" && "#ACE87D"}
      borderRadius="base"
      boxShadow="base"
      color="white"
      p="13px"
    >
      <VStack spacing="20px">
        <Text alignSelf="start" fontWeight="semibold" fontSize="xl">
          Total {type}
        </Text>
        <HStack spacing="140px">
          <Box display="flex">
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color={
                type == "Pendentes"
                  ? "#FFA700"
                  : type == "Reprovados"
                  ? "#9A2121"
                  : "#3E760E"
              }
            >
              {total}
            </Text>
            <Text mx="5px" alignSelf="end" color="#896F2B">
              ({percentual}%)
            </Text>
          </Box>
          {type === "Pendentes" && (
            <Image boxSize="40px" src="/icons8-hourglass-50.png" />
          )}
          {type === "Aprovados" && (
            <Image boxSize="40px" src="/icons8-add-administrator-50.png" />
          )}
          {type === "Reprovados" && (
            <Image boxSize="40px" src="/icons8-remove-administrator-50.png" />
          )}
        </HStack>
      </VStack>
    </Box>
  );
};
Card.propTypes = {
  type: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  percentual: PropTypes.string.isRequired,
};
export default Card;
