import React, { useEffect, useState } from "react";
import api from "../api";
import TextField from "@mui/material/TextField";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { DrawerHeader } from "./Menu";
import { useLocation, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Container, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function Riddle(props) {
  const [challenge, setChallenge] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [id, setId] = useState(1)

  const location = useLocation();
  
  const navigate = useNavigate();

  useEffect(() => {
    const id = location.pathname.split("/").slice(-1)
    setId(id);
    retrieveChallenge(id);
  }, []);

  const retrieveChallenge = (id) => {
    api
      .getChallenge(id)
      .then((res) => {
        setChallenge(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      answer: data.get("answer"),
    });

    api.postAnswer(id, data.get("answer")).then(
      (res) => {
        // wrong answer
        if (res.status === 200) {
          console.log(res.data);
        }

        // correct answer
        if (res.status === 201) {
          setAnswered(true);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleNext = () => {
    const next = Number(id)+1
    setId(next)
    setAnswered(false)
    retrieveChallenge(next);
    navigate(`/riddle/${next}`)
  }

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
        <DrawerHeader />
        {answered ? (
          <>
            <CheckCircleIcon color="success" sx={{ fontSize: "160px" }} />
            <Typography component="h1" variant="h5">
              CORRECT!
            </Typography>
            <Button onClick={handleNext}>Next</Button>
          </>
        ) : (
          <>
            <Typography  variant="h4">Level {challenge.id}</Typography>
            <ul>
              <li key={"clue_1"}>
                <img alt={challenge.clue_1} src={challenge.clue_1}></img>
              </li>
              <li key={"clue_2"}>{challenge.clue_2}</li>
            </ul>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                name="answer"
                id="answer"
                label="answer"
                type="answer"
                autoComplete="current-answer"
                variant="outlined"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                endIcon={<SendRoundedIcon />}
              >
                ANSWER
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
}

export default Riddle;
