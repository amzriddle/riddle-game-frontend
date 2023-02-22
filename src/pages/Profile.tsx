import React, { useState, useEffect, useContext } from "react";
import api from "../api";
import { Box, CssBaseline } from "@mui/material";
import Typography from "@mui/material/Typography";
import AuthContext from "../contexts/auth";
import { useNavigate } from "react-router-dom";

interface User {
  username: string;
  email: string;
}

const Profile = () => {
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
  });
  const navigate = useNavigate();

  const { signed } = useContext(AuthContext);

  useEffect(() => {
    if (!signed) {
      navigate("/login");
    }

    api.getMe().then((res: any) => {
      setUser(res.data);
    });
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
        <h1>Profile</h1>
        {user && (
          <>
            <Typography>Username: {user.username}</Typography>
            <Typography>Email: {user.email}</Typography>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Profile;
