import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../api";
import AuthContext from "../contexts/auth";
import Alert from "../components/Alert";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";

export default function SignUp() {
  const navigate = useNavigate();
  const { signed, loginUpdate } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState<any>([]);

  useEffect(() => {
    if (signed) {
      navigate("/profile");
    }
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    api.postRegister(data.get("email"), data.get("password")).then(
      (res: any) => {
        localStorage.setItem("token", JSON.stringify(res.data.access_token));
        loginUpdate();
        navigate("/profile");
      },
      (error: any) => {
        if(error.response){
          if (typeof error.response.data.message === "string") {
            setMessage([error.response.data.message]);
          } else {
            setMessage(error.response.data.message);
          }
        }else{
          setMessage([error.message]);
        }

        setOpen(true);
      }
    );
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="warning"
              sx={{ width: "100%" }}
            >
              <ul>
                {message.map((msg: any, index: any) => (
                  <li key={`login-error-message-${index}`}>{msg}</li>
                ))}
              </ul>
            </Alert>
          </Snackbar>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
