import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function Row({ apiInfo }) {
  const [open, setOpen] = React.useState(false);

  const percentConverter = (number) => {
    const converting = 100 * number;
    const converted = converting.toFixed(2);
    return converted;
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {apiInfo.name}
        </TableCell>
        <TableCell> {apiInfo.gender}</TableCell>
        <TableCell> {apiInfo.age}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Top 3 countries
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Country Code</TableCell>
                    <TableCell>Country Name</TableCell>
                    <TableCell>Probability</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {apiInfo.countries?.map((country, key) => (
                    <TableRow key={key}>
                      {country.info && (
                        <>
                          <TableCell component="th" scope="row">
                            {key + 1}
                          </TableCell>
                          <TableCell>{country.info?.country_id}</TableCell>
                          <TableCell>{country.name}</TableCell>
                          <TableCell>
                            {percentConverter(country.info?.probability)}%
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default Row;
