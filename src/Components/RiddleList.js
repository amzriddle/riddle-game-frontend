import React, { useEffect, useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";
import { CssBaseline, Box, Button } from "@mui/material";
import { DrawerHeader } from "./Menu";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function RiddleList() {
  const [challenges, setChallenges] = useState([]);
  const [answeredChallenges, setAnsweredChallenges] = useState([]);
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

    const retrieveAnswered = () => {
        api.getAnswered().then(
        (res) => {
          setAnsweredChallenges(res.data)
        },
        (error) => {
          console.log(error);
        }
      );
    }

    retrieveChallenges();
    retrieveAnswered();
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
          <Button sx={{alignContent: 'center'}} onClick={goToCurrentLevel}>GO TO MY LEVEL</Button>
        {challenges.map((challenge, index) => (
            answeredChallenges.find(item => item.riddleId === challenge.id) ? 
                <li key={index}>Level {challenge.id} <CheckCircleIcon color="success" size="small"  /></li>
      
              :
              
                <li key={index}><Link to={`/riddle/${challenge.id}`} state={{ id: challenge.id }}>
                Level {challenge.id}
                </Link></li>
        ))}
      </Box>
    </Box>
  );
}

export default RiddleList;
