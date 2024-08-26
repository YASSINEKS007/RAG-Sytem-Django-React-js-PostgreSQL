import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const Conversation = ({ text, time, position }) => {
  let formattedTime = "";
  let typing = "typing...";

  if (time !== "null") {
    const date = new Date(time);

    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
    const hours = date.getHours(); 
    const minutes = date.getMinutes(); 

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    formattedTime = `${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes}`;
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
