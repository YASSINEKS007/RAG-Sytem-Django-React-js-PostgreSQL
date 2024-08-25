import { Box, Paper, Typography } from "@mui/material";
import CircularIndeterminate from "./CircularIndeterminate";

const LoadingPopUp = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", 
        zIndex: 1000,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "20px",
          borderRadius: "8px",
          textAlign: "center",
          backgroundColor: "#ffffff", 
          color: "#333333", 
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{ marginBottom: "10px" }}
        >
          Please wait while your PDF is being processed
        </Typography>
        <CircularIndeterminate />
      </Paper>
    </Box>
  );
};
export default LoadingPopUp;
