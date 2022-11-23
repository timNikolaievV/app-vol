import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import { getAllStorages, getStorageById } from "../../api";

const Storages = () => {
  const [storages, setStorages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const data = await getAllStorages();
      setStorages(data);
    };
    fetch();
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "whitesmoke",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>storageName</TableCell>
              <TableCell align="right">location</TableCell>
              <TableCell align="right">contactPersonId</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {storages.map((row) => (
              <TableRow
                key={row.storageId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.storageName}
                </TableCell>
                <TableCell align="right">{row.location}</TableCell>
                <TableCell align="right">{row.contactPersonId}</TableCell>
                <TableCell align="right">
                  {row.storageId}
                  <Button
                    onClick={() => navigate(`/storages/edit/${row.storageId}`)}
                  >
                    Edit
                  </Button>{" "}
                  <Button>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button onClick={() => navigate(`/storages/add/`)}>ADD NEW</Button>
      </TableContainer>
    </Box>
  );
};

export default Storages;
