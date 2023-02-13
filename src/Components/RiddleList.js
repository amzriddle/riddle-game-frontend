import React, { useContext, useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { CssBaseline, Box, Button } from "@mui/material";
import { DrawerHeader } from "./Menu";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AuthContext from "../contexts/auth";

function RiddleList() {
  const [challenges, setChallenges] = useState([]);
  const [answeredChallenges, setAnsweredChallenges] = useState([]);
  let isApiSubscribed = true;
  
  const navigate = useNavigate();
  const { signed } = useContext(AuthContext)
  
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

    if(signed){
      retrieveAnswered();
    }
    
    return () => {
      isApiSubscribed = false;
    };
  }, []);

  const goToCurrentLevel = (event) => {
    api.getNextAndLastRiddle().then(
      (res) => {
        if(res.data.nextRiddle){
          navigate(`/riddle/${res.data.nextRiddle}`)
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
          { signed && 
            <Button sx={{alignContent: 'center'}} onClick={goToCurrentLevel}>
              GO TO MY LEVEL
            </Button>
          }
        {challenges.map((challenge, index) => (
            answeredChallenges.find(item => item.riddleId === challenge.id) ? 
                <li key={index}>Level {challenge.id} <CheckCircleIcon color="success" size="small"  /></li>
      
              :
              
                <li key={index}>
                  Level {challenge.id}
                </li>
        ))}
      </Box>
    </Box>
  );
}

export default RiddleList;
