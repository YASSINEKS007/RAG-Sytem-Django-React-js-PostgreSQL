import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const SnackBar = ({ open, onClose }) => {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity="success"
        variant="filled"
        sx={{ width: "100%" }}
      >
        File uploaded successfully
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
