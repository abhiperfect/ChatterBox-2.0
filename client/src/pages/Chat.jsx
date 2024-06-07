import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Skeleton, Stack } from "@mui/material";
import { grayColor, blue, blueLight } from "../constants/color";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponents";
import { useNavigate } from "react-router-dom";
import MessageComponent from "../components/shared/MessageComponent"; // Ensure correct path
import { sampleMessage } from "../constants/sampleData";

// import TypingLoader from "../components/TypingLoader"; // Ensure correct path
// import FileMenu from "../components/FileMenu"; // Ensure correct path

const Chat = ({ chatId, user }) => {
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);

  const messageOnChange = (e) => {
    setMessage(e.target.value);

    if (!IamTyping) {
      setIamTyping(true);
      // Notify the server that the user is typing
    }

    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      setIamTyping(false);
      // Notify the server that the user has stopped typing
    }, 3000);
  };

  const handleFileOpen = (e) => {
    setFileMenuAnchor(e.currentTarget);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    // Add the new message to the messages array
    const newMessage = {
      _id: new Date().getTime().toString(), // Temporary ID for local display
      content: message,
      sender: user,
      createdAt: new Date(),
    };
    setMessages([...messages, newMessage]);

    setMessage("");

    // Send the message to the server
    try {
      await sendMessage(chatId, newMessage);
      // Replace the temporary ID with the server's response
    } catch (error) {
      console.error("Failed to send message:", error);
      // Handle error (e.g., show a toast message)
    }
  };

  useEffect(() => {
    // Fetch initial messages
    const fetchMessages = async () => {
      try {
        const fetchedMessages = await getMessages(chatId, page);
        setMessages(fetchedMessages);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
        // Handle error (e.g., show a toast message)
      }
    };

    fetchMessages();
  }, [chatId, page]);

  useEffect(() => {
    // Scroll to bottom on new message
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Fragment>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {sampleMessage.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}

        {/* {userTyping && <TypingLoader />} */}

        <div ref={bottomRef} />
      </Stack>

      <form
        style={{
          height: "10%",
        }}
        onSubmit={submitHandler}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg",
            }}
            onClick={handleFileOpen}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox
            placeholder="Type Message Here..."
            value={message}
            onChange={messageOnChange}
          />

          <IconButton
            type="submit"
            sx={{
              bgcolor: blueLight, // Corrected color
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: blue,
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>

      {/* <FileMenu
        anchorEl={fileMenuAnchor}
        chatId={chatId}
        onClose={() => setFileMenuAnchor(null)}
      /> */}
    </Fragment>
  );
};

export default AppLayout()(Chat);

// Placeholder functions, implement with actual logic
const sendMessage = async (chatId, message) => {
  // API call to send a message
};

const getMessages = async (chatId, page) => {
  // API call to get messages
  return []; // Return mock data for now
};
