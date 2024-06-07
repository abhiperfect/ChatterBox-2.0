import { Search as SearchIcon } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import UserItem from "../shared/UserItem";

const Search = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoadingSendFriendRequest, setIsLoadingSendFriendRequest] = useState(false);

  useEffect(() => {
    // Fetch or filter users based on searchQuery
    const fetchUsers = async () => {
      // Simulating an API call
      const fetchedUsers = [
        { id: 1, name: "User One" },
        { id: 2, name: "User Two" },
        // Add more mock users
      ];

      setUsers(fetchedUsers.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase())));
    };

    fetchUsers();
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const addFriendHandler = (userId) => {
    // Handle friend request logic here
    setIsLoadingSendFriendRequest(true);
    // Simulating a network request
    setTimeout(() => {
      setIsLoadingSendFriendRequest(false);
      alert(`Friend request sent to user with ID: ${userId}`);
    }, 2000);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List>
          {users.map((user) => (
            <UserItem
              user={user}
              key={user.id}
              handler={() => addFriendHandler(user.id)}
              handlerIsLoading={isLoadingSendFriendRequest}
            />
          ))}
        </List>
        <Button onClick={handleClose} variant="contained" color="primary" sx={{ mt: 2 }}>
          Close
        </Button>
      </Stack>
    </Dialog>
  );
};

export default Search;
