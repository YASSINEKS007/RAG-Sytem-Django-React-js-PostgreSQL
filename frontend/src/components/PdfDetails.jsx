import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const PdfDetails = ({ pdfs, searchQuery }) => {
  const filteredPDFs = pdfs.filter((pdf) =>
    pdf.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formattedSize = (size) => `${size} MB`;

  return (
    <div>
      {filteredPDFs.map((pdf) => (
        <List>
          <ListItem key={pdf.name}>
            <ListItemText primary={pdf.name} />
            <ListItemText
              secondary={formattedSize(pdf.size)}
              align="right"
            />
          </ListItem>
        </List>
      ))}
      ;
    </div>
  );
};
export default PdfDetails;
