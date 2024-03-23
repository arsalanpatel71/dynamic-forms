import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";

function Home() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Link
        to="/create-forms"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Card
          style={{
            margin: "10px",
            width: "400px",
            height: "300px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardContent>
            <Typography variant="h5" component="h2" align="center">
              Create Dynamic Form
            </Typography>
          </CardContent>
        </Card>
      </Link>
      <Link
        to="/manage-forms"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Card
          style={{
            margin: "10px",
            width: "400px",
            height: "300px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardContent>
            <Typography variant="h5" component="h2" align="center">
              Manage Created Form
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}

export default Home;
