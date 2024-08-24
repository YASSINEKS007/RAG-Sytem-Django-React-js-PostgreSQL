import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const Conversation = ({ text, time, position }) => {
  // Initialize variables
  let formattedTime = "";
  let typing = "typing...";

  if (time !== "null") {
    const date = new Date(time);

    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    formattedTime = `${formattedHours}:${formattedMinutes}`;
  } else {
    formattedTime = typing;
  }

  return (
    <ListItem>
      <Grid container>
        <Grid item xs={12}>
          <ListItemText
            align={position}
            primary={text}
          />
        </Grid>
        <Grid item xs={12}>
          <ListItemText
            align={position}
            secondary={formattedTime}
          />
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default Conversation;
