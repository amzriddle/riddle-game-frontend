import React, { useEffect, useState } from "react";
import api from "../api";
import TextField from "@mui/material/TextField";
import { useLocation, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Container, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface Challenge {
  id: number;
  clue_1: string;
  clue_2: string;
}

function Riddle() {
  const [challenge, setChallenge] = useState<Challenge>({
    id: 0,
    clue_1: "",
    clue_2: "",
  });
  const [answered, setAnswered] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [id, setId] = useState<number>(1);

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const id: number = parseInt(location.pathname.split("/").slice(-1)[0]);
    setId(id);
    retrieveChallenge(id);
  }, []);

  const retrieveChallenge = (id: any) => {
    api
      .getChallenge(id)
      .then((res: any) => {
        setChallenge(res.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      answer: data.get("answer"),
    });

    api.postAnswer(id, data.get("answer")).then(
      (res: any) => {
        // wrong answer
        if (res.status === 200) {
          console.log(res.data);
          setWrong(true);

          setTimeout(() => {
            setWrong(false);
          }, 3000);
        }

        // correct answer
        if (res.status === 201) {
          setAnswered(true);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  };

  const handleNext = () => {
    api.getNextAndLastRiddle().then(
      (res: any) => {
        let next = res.data.nextRiddle;

        setId(next);
        setAnswered(false);
        retrieveChallenge(next);
        navigate(`/riddle/${next}`);
      },
      (error: any) => {
        console.log(error);
      }
    );
  };

  const clueType = (url: string) => {
    if (/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(url)) {
      return <img alt={challenge.clue_1} src={challenge.clue_1}></img>
    } else {
      return <Typography>{challenge.clue_1}</Typography>
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
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
            <Typography variant="h4">Level {challenge.id}</Typography>
            <ul>
              <li key={"clue_1"}>
                {clueType(challenge.clue_1)}
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
                color={wrong ? "error" : "primary"}
              >
                {wrong ? "WRONG!!!" : "ANSWER"}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
}

export default Riddle;
