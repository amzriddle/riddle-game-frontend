import React, { useState, useEffect, useContext } from "react";
import api from "../api";
import { DrawerHeader } from "./Menu";
import { Box, CssBaseline } from "@mui/material";
import Typography from "@mui/material/Typography";
import AuthContext from '../contexts/auth';

const Profile = () => {
  const [data, setData] = useState(null);
  let isApiSubscribed = true;

  const context = useContext(AuthContext);
  console.log(context);
  useEffect(() => {
    api.getMe().then((res) => {
      if (isApiSubscribed) {
        setData(res.data);
      }
    });
    return () => {
      isApiSubscribed = false;
    };
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <h1>Profile</h1>
        {data && (
          <>
            <Typography>First Name: {data.firstName}</Typography>
            <Typography>Last Name: {data.lastName}</Typography>
            <Typography>Email: {data.email}</Typography>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Profile;
