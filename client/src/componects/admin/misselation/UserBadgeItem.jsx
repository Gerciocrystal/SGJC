// import React from 'react';
import PropTypes from "prop-types";
import { Box } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Box
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      background="#F0F6FF"
      color="black"
      cursor="pointer"
      onClick={handleFunction}
    >
      {user.name}
      <CloseIcon pl={1} />
    </Box>
  );
};

UserBadgeItem.propTypes = {
  handleFunction: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default UserBadgeItem;
