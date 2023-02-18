import React, { useContext, useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { CssBaseline, Box, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AuthContext from "../contexts/auth";

function RiddleList() {
  const [challenges, setChallenges] = useState([]);
  const [answeredChallenges, setAnsweredChallenges] = useState([]);

  const navigate = useNavigate();
  const { signed } = useContext(AuthContext);

  useEffect(() => {
    const retrieveChallenges = () => {
      api
        .getAllChallenges()
        .then((res: any) => {
          setChallenges(res.data);
        })
        .catch((error: any) => {
          console.log(error);
        });
    };

    const retrieveAnswered = () => {
      api.getAnswered().then(
        (res: any) => {
          setAnsweredChallenges(res.data);
        },
        (error: any) => {
          console.log(error);
        }
      );
    };

    retrieveChallenges();

    if (signed) {
      retrieveAnswered();
    }
  }, []);

  const goToCurrentLevel = (event: any) => {
    api.getNextAndLastRiddle().then(
      (res: any) => {
        if (res.data.nextRiddle) {
          navigate(`/riddle/${res.data.nextRiddle}`);
        } else {
          console.log("Wait for more challenges!");
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
        <h1>Riddle List</h1>
        {signed && (
          <Button sx={{ alignContent: "center" }} onClick={goToCurrentLevel}>
            GO TO MY LEVEL
          </Button>
        )}
        {challenges.map((challenge: { id: number }, index) =>
          answeredChallenges.find(
            (item: { riddleId: number }) => item.riddleId === challenge.id
          ) ? (
            <li key={index}>
              Level {challenge.id} <CheckCircleIcon color="success" />
            </li>
          ) : (
            <li key={index}>Level {challenge.id}</li>
          )
        )}
      </Box>
    </Box>
  );
}

export default RiddleList;
