import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";

const ManageForm = () => {
  const formConfigs = useSelector((state) => state.form.formConfigs);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFormConfig, setSelectedFormConfig] = useState(null);
  const [copyButtonText, setCopyButtonText] = useState("Copy");

  const handleOpenDialog = (config) => {
    setSelectedFormConfig(config);
    setOpenDialog(true);
    setCopyButtonText("Copy"); // Reset button text when opening dialog
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedFormConfig(null);
  };

  const handleCopyToClipboard = (config) => {
    const jsonStr = JSON.stringify(config, null, 2);
    navigator.clipboard
      .writeText(jsonStr)
      .then(() => {
        setCopyButtonText("Copied");
        setTimeout(() => setCopyButtonText("Copy"), 2000); // Change back to "Copy" after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        // Optionally handle copy failure here
      });
  };

  return (
    <div>
      {formConfigs.map((config, index) => (
        <Card key={index} style={{ margin: 16 }}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Form {index + 1}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => handleOpenDialog(config)}>
              View JSON
            </Button>
          </CardActions>
        </Card>
      ))}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        style={{ width: "80%" }} // Adjust the width using vw (viewport width)
        // maxWidth="md" // Adjust the maxWidth as needed
        fullWidth={true}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Form Configuration</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Here is the JSON configuration for the selected form.
          </DialogContentText>
          {selectedFormConfig && (
            <AceEditor
              mode="json"
              theme="github"
              value={JSON.stringify(selectedFormConfig, null, 2)}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{ $blockScrolling: true }}
              setOptions={{
                useWorker: false,
              }}
              style={{ width: "100%", height: "400px", border: "none" }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleCopyToClipboard(selectedFormConfig)}
            color="primary"
          >
            {copyButtonText}
          </Button>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageForm;
