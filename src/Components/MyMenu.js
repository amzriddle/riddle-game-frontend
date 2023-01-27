import {
    Link
} from "react-router-dom";

import {
  Drawer,
  Hidden,
  List,
  ListItem,
} from '@material-ui/core';
import { AppBar, MenuItem } from '@mui/material';

const styles = {
  navBar: {'top': AppBar.height}
}
  
function MyMenu({ menuOpen }) {
    return (
      <div>
      <Hidden smUp implementation="css">
      <Drawer
      >
        oi
      </Drawer>
    </Hidden>
    <Hidden xsDown implementation="css">
      <Drawer
        variant="permanent"
        open={menuOpen}
      >
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
          <ListItem>
            <Link to="/login">Login</Link>
          </ListItem>
        </List>
      </Drawer>
    </Hidden>
    </div>
    )
}

export default MyMenu;