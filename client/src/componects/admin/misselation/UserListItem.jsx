// import React from 'react';
import { Avatar, Box, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      display="flex"
      alignItem="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.pic}
      />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>username :</b> {user.username}
        </Text>
      </Box>
    </Box>
  );
};

UserListItem.propTypes = {
  user: PropTypes.object.isRequired,
  handleFunction: PropTypes.func.isRequired,
};

export default UserListItem;
