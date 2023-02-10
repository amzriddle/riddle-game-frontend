import React, { useEffect, useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";
import { CssBaseline, Box, Button } from "@mui/material";
import { DrawerHeader } from "./Menu";

function RiddleList() {
  const [challenges, setChallenges] = useState([]);
  let isApiSubscribed = true;
  
  const navigate = useNavigate();

  useEffect(() => {
    const retrieveChallenges = () => {
      api
        .getAllChallenges()
        .then((res) => {
          if (isApiSubscribed) {
            setChallenges(res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    retrieveChallenges();
    return () => {
      isApiSubscribed = false;
    };
  }, []);

  const goToCurrentLevel = (event) => {
    let nextChallenge = 0;
    api.getAnswered().then(
      (res) => {
        var lastAnswered = 0
        
        if(res.data.length === 0){
          lastAnswered = 0
        }else{
          lastAnswered = res.data[res.data.length - 1].riddleId;
        }
        
        nextChallenge = challenges[challenges.findIndex(item => item.id === lastAnswered) + 1]

        if(nextChallenge){
          navigate(`/riddle/${nextChallenge.id}`)
        } else {
          console.log("Wait for more challenges!")
        }
        
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <h1>Riddle List</h1>
        {challenges.map((challenge, index) => (
          <li key={index}>
            <Link to={`/riddle/${challenge.id}`} state={{ id: challenge.id }}>
              {challenge.id}
            </Link>
          </li>
        ))}

        <Button onClick={goToCurrentLevel}>GO TO MY LEVEL</Button>
      </Box>
    </Box>
  );
}

export default RiddleList;
