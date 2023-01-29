import api from "../api";
import React, { useEffect, useState } from "react";
import {
  Link
} from "react-router-dom";
import { CssBaseline, Box } from "@mui/material"
import { DrawerHeader } from "./Menu";

function RiddleList() {
  const [challenges, setChallenges] = useState([]);
  let isApiSubscribed = true;

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
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <h1>Riddle List</h1>
        {challenges.map((challenge, index) => (
          <li key={index}><Link to={`/riddle/${challenge.id}`} >{challenge.id}</Link></li>
        ))}
      </Box>
    </Box>
  );
}

export default RiddleList;
