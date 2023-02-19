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

export default function SignIn() {
  const navigate = useNavigate();
  const { signed, loginUpdate } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState<string[]>([]);

  useEffect(() => {
    if (signed) {
      navigate("/profile");
    }
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    api.postLogin(data.get("email"), data.get("password")).then(
      (res: any) => {
        localStorage.setItem("token", JSON.stringify(res.data.access_token));
        loginUpdate();
        navigate("/profile");
      },
      (error: any) => {
        if (error.response) {
          if (typeof error.response.data.message === "string") {
            setMessage([error.response.data.message]);
          } else {
            setMessage(error.response.data.message);
          }
        } else {
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="warning"
              sx={{ width: "100%" }}
            >
              <ul>
                {message.map((msg: string, index: any) => (
                  <li key={`login-error-message-${index}`}>{msg}</li>
                ))}
              </ul>
            </Alert>
          </Snackbar>
          <Grid container>
            <Grid item xs>
              <Link to="/">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link to="/register">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
