import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

const SearchBar = ({ searchQuery, onSearchChange }) => {
  const handleInputChange = (event) => {
    onSearchChange(event.target.value);
  };
  return (
    <Grid
      item
      xs={12}
      sx={{ padding: "10px" }}
    >
      <TextField
        id="outlined-basic-search"
        label="Search PDFs"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleInputChange}
      />
    </Grid>
  );
};
export default SearchBar;
