import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const SnackBar = ({ open, onClose, type, text }) => {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity={type}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {text}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
