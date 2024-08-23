import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const UserDetails = () => {
  return (
    <List>
      <ListItem key="User 1">
        <ListItemIcon>
          <Avatar src="/broken-image.jpg" />
        </ListItemIcon>
        <ListItemText primary="User 1" />
      </ListItem>
    </List>
  );
};
export default UserDetails;
