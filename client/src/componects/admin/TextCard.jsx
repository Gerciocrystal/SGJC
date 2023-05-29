import { Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useState } from "react";
const TextCard = ({ total, percentual, type }) => {
  const [colorPalect, setcolorPalect] = useState("");

  if (type === "Pendentes") setcolorPalect("#FFA700");
  else if (type === "Aprovados") setcolorPalect("#3E760E");
  else setcolorPalect("#9A2121");

  return (
    <>
      <Text fontSize="2xl" fontWeight="bold" color={colorPalect}>
        {total}
      </Text>
      <Text mx="5px" alignSelf="end" color="#896F2B">
        ({percentual}%)
      </Text>
    </>
  );
};
TextCard.propTypes = {
  type: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  percentual: PropTypes.number.isRequired,
};
export default TextCard;
