import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "../components.css";
import logo from "../assests/form-logo.jpg";
const Navbar = () => {
  return (
    <div className="nav-container">
      <div>
        <img src={logo} alt="logo" style={{ width: "10vw" }} />
      </div>
      <div className="nav-buttons">
        <Link to="/">
          <Button>home</Button>
        </Link>
        <Link to="/create-forms">
          <Button>Create Forms</Button>
        </Link>
        <Link to="/manage-forms">
          <Button>Manage forms</Button>
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
