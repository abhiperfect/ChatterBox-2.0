import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState, useEffect, memo } from "react";

const Notifications = () => {
  const [isNotification, setIsNotification] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({ allRequests: [] });

  useEffect(() => {
    if (isNotification) {
      // Simulate fetching data
      setTimeout(() => {
        setData({
          allRequests: [
            {
              sender: { name: "User One", avatar: "" },
              _id: "1",
            },
            {
              sender: { name: "User Two", avatar: "" },
              _id: "2",
            },
          ],
        });
        setIsLoading(false);
      }, 1000); // Simulate a network request
    }
  }, [isNotification]);

  const friendRequestHandler = ({ _id, accept }) => {
    // Handle friend request logic here
    alert(`Friend request ${accept ? "accepted" : "rejected"} for ID: ${_id}`);
  };

  const closeHandler = () => {
    setIsNotification(false);
  };

  return (
    <Dialog open={isNotification} onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>

        {isLoading ? (
          <Skeleton variant="rectangular" width="100%" height="5rem" />
        ) : (
          <>
            {data?.allRequests.length > 0 ? (
              data?.allRequests?.map(({ sender, _id }) => (
                <NotificationItem
                  sender={sender}
                  _id={_id}
                  handler={friendRequestHandler}
                  key={_id}
                />
              ))
            ) : (
              <Typography textAlign={"center"}>0 notifications</Typography>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar />

        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {`${name} sent you a friend request.`}
        </Typography>

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
        >
          <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;
