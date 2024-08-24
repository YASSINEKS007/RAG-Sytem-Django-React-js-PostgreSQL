import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const Conversation = ({ text, time, position }) => {
  const date = new Date(time);

  const hours = date.getUTCHours(); 
  const minutes = date.getUTCMinutes(); 
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return (
    <ListItem key={text}>
      <Grid container>
        <Grid
          item
          xs={12}
        >
          <ListItemText
            align={position}
            primary={text}
          />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <ListItemText
            align={position}
            secondary={`${formattedHours}:${formattedMinutes}`}
          />
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default Conversation;
