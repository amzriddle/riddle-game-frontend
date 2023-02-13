import React from "react";
import { Link } from "react-router-dom";

import api from "../api";
import AuthContext from "../contexts/auth";

import { Drawer, Hidden, List, ListItem } from "@material-ui/core";
import { AppBar, MenuItem } from "@mui/material";

const styles = {
  navBar: { top: AppBar.height },
};

function MyMenu({ menuOpen }) {
  const { signed, logoutUpdate } = useContext(AuthContext)

  const handleLogout = () => {
    api.getLogout().then(
      (res) => {
        console.log(res.data);
        logoutUpdate();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  };
  
  return (
    <div>
      <Hidden smUp implementation="css">
        <Drawer>oi</Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer variant="permanent" open={menuOpen}>
          <List>
            <MenuItem>
              <Link to="/">Home</Link>
            </MenuItem>
            <ListItem>
              <Link to="/riddle-list">Riddle</Link>
            </ListItem>
            <ListItem>
              <Link to="/profile">Profile</Link>
            </ListItem>
            <ListItem>
              <Link to="/ranking">Ranking</Link>
            </ListItem>
            {signed? 
              <ListItem onClick={handleLogout}>
                Logout
              </ListItem>
              :
              <ListItem>
                <Link to="/login">Login</Link>
              </ListItem>
            }
          </List>
        </Drawer>
      </Hidden>
    </div>
  );
}

export default MyMenu;
