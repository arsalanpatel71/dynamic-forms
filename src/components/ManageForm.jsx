import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectFormConfigs } from "../redux/formSlice";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const ManageForm = () => {
  const formConfigs = useSelector(selectFormConfigs);
  const [open, setOpen] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState({});

  const handleClickOpen = (config) => {
    setSelectedConfig(config);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formConfigs.map((config) => (
              <TableRow key={config.id}>
                <TableCell>{config.id}</TableCell>
                <TableCell>{config.firstName}</TableCell>
                <TableCell>{config.lastName}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => handleClickOpen(config)}
                  >
                    View JSON
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>Form Configuration</DialogTitle>
        <DialogContent>
          <Typography
            component="pre"
            style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}
          >
            <code>{JSON.stringify(selectedConfig, null, 2)}</code>
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ManageForm;
