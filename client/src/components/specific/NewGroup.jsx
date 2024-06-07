import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import UserItem from "../shared/UserItem";
import { sampleUsers } from "../../constants/sampleData"; // Sample data for demonstration
import toast from "react-hot-toast";

const NewGroup = () => {
  const [isNewGroup, setIsNewGroup] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingNewGroup, setIsLoadingNewGroup] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [data, setData] = useState({ friends: [] });

  useEffect(() => {
    // Simulate fetching friends data
    setTimeout(() => {
      setData({ friends: sampleUsers });
      setIsLoading(false);
    }, 1000);
  }, []);

  const closeHandler = () => {
    setIsNewGroup(false);
  };

  const submitHandler = () => {
    setIsLoadingNewGroup(true);
    // Simulate group creation process
    setTimeout(() => {
      toast.success("Group created successfully!");
      setIsLoadingNewGroup(false);
      closeHandler();
    }, 1000);
  };

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const selectMemberHandler = (userId) => {
    setSelectedMembers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <Dialog onClose={closeHandler} open={isNewGroup}>
      <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"} variant="h4">
          New Group
        </DialogTitle>

        <TextField
          label="Group Name"
          value={groupName}
          onChange={handleGroupNameChange}
        />

        <Typography variant="body1">Members</Typography>

        <Stack>
          {isLoading ? (
            <Skeleton variant="rectangular" width="100%" height="4rem" />
          ) : (
            data?.friends?.map((user) => (
              <UserItem
                user={user}
                key={user._id}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(user._id)}
              />
            ))
          )}
        </Stack>

        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button
            variant="text"
            color="error"
            size="large"
            onClick={closeHandler}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={submitHandler}
            disabled={isLoadingNewGroup || !groupName || selectedMembers.length === 0}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
