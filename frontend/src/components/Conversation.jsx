import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const Conversation = ({ text, time, position }) => {
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
            secondary={time}
          />
        </Grid>
      </Grid>
    </ListItem>
  );
};
export default Conversation;
