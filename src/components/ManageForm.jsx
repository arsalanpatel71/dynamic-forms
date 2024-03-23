import React from "react";
import { useSelector } from "react-redux";
import { selectFormConfigs } from "../redux/formSlice";
import {
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const ManageForm = () => {
  const formConfigs = useSelector(selectFormConfigs);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Form Configuration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {formConfigs.map((config, index) => (
            <TableRow key={index}>
              <TableCell>
                <Typography variant="body2">
                  {JSON.stringify(config, null, 2)}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ManageForm;
