import SendIcon from "@mui/icons-material/Send";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import {
  Box,
  Divider,
  Grid,
  List,
  Paper,
  TextField,
  Tooltip,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Conversation from "../components/Conversation";
import PdfDetails from "../components/PdfDetails";
import SearchBar from "../components/SearchBar";
import SnackBar from "../components/SnackBar";
import UserDetails from "../components/UserDetails";
import api from "../services/api";

const ChatPage = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [pdfs, setPdfs] = useState([]);
  const [type, setType] = useState(null);
  const [text, setText] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);

  const getChatHistory = async () => {
    try {
      const response = await api.get("/app/chat-history/");
      const data = response.data["chat history"];
      setChatHistory(data);
    } catch {
      setType("error");
      setText("An Error Occured! Please Try Again Later");
      setSnackBarOpen(true);
    }
  };

  useEffect(() => {
    getChatHistory();
  }, []);

  const handleFileUpload = async (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await api.post("/app/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        setType("success");
        setText("File uploaded successfully");
        setSnackBarOpen(true);
        getFilesDetails();
      } else {
        console.error(
          "Error uploading file:",
          response.status,
          response.statusText
        );
      }
    } catch {
      setType("error");
      setText("Error Uploading File! Please Try again Later!!");
      setSnackBarOpen(true);
    } finally {
      setIsUploading(false);
      setFile(null);
    }
  };

  useEffect(() => {
    getFilesDetails();
  }, []);

  const getFilesDetails = async () => {
    try {
      const response = await api.get("/app/files/");
      setPdfs(response.data);
    } catch (error) {
      console.log("Error fetching file details:", error);
    }
  };

  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <Grid
      container
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#333",
      }}
    >
      <Grid
        container
        component={Paper}
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #e0e0e0",
            height: "100%",
          }}
        >
          <UserDetails />
          <Divider />
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
          <PdfDetails
            pdfs={pdfs}
            searchQuery={searchQuery}
          />
        </Grid>

        {/* Main Chat Window */}
        <Grid
          item
          xs={9}
          sx={{ height: "100vh" }}
        >
          <List
            sx={{
              height: "75vh",
              overflowY: "auto",
            }}
          >
            {chatHistory.map((chat, index) => (
              <div key={index}>
                <Conversation
                  text={chat.question}
                  time={chat.question_timestamp}
                  position={"right"}
                />
                <Conversation
                  text={chat.answer}
                  time={chat.answer_timestamp}
                  position={"left"}
                />
              </div>
            ))}
          </List>
          <Divider sx={{ marginTop: "30px" }} />
          <Grid
            container
            sx={{ padding: "20px" }}
          >
            <Grid
              item
              xs={11}
            >
              <TextField
                id="outlined-basic-message"
                label="Type Something"
                fullWidth
              />
            </Grid>
            <Grid
              item
              xs={1}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  marginLeft: "10px",
                }}
              >
                <Tooltip
                  title="Upload a file"
                  arrow
                >
                  <UploadFileOutlinedIcon
                    fontSize="large"
                    sx={{ cursor: "pointer" }}
                    onClick={triggerFileInput}
                  />
                </Tooltip>
                <Tooltip
                  title="Send a message"
                  arrow
                >
                  <SendIcon fontSize="large" />
                </Tooltip>
                <input
                  type="file"
                  hidden
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <SnackBar
        open={snackBarOpen}
        onClose={handleSnackBarClose}
        type={type}
        text={text}
      />
    </Grid>
  );
};

export default ChatPage;
