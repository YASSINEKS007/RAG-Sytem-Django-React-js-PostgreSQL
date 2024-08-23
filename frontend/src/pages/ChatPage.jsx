import SendIcon from "@mui/icons-material/Send";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Conversation from "../components/Conversation";
import PdfDetails from "../components/PdfDetails";
import SearchBar from "../components/SearchBar";
import UserDetails from "../components/UserDetails";

const ChatPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pdfs, setPdfs] = useState([
    { id: 1, name: "Document1.pdf", size: "1" },
    { id: 2, name: "Document2.pdf", size: "2" },
    { id: 3, name: "Report3.pdf", size: "3" },
  ]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const getCurrentTime = () => {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();

    // Add leading zero to minutes and hours if needed
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return `${hours}:${minutes}`;
  };

  console.log(getCurrentTime());

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
            <Conversation
              text={"Hello bro?"}
              time={getCurrentTime()}
              position={"right"}
            />

            
            <Conversation
              text={"Hello bro?"}
              time={getCurrentTime()}
              position={"left"}
            />
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
              xs={1}
              align="right"
            >
              <Fab aria-label="send">
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ChatPage;
