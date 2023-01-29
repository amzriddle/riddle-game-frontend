import api from "../api";
import React, { useEffect, useState } from "react";
import {
  Link
} from "react-router-dom";
import { Typography } from "@mui/material";
import { DrawerHeader } from "./Menu";

function RiddleList() {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const retrieveChallenges = () => {
      api
        .getAllChallenges()
        .then((res) => {
          setChallenges(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    retrieveChallenges();
  }, []);
  return (
    <div className="RiddleList">
      <DrawerHeader />
      <h1>Riddle List</h1>
      {challenges.map((challenge, index) => (
        <li key={index}><Link to={`/riddle/${challenge.id}`} >{challenge.id}</Link></li>
      ))}
    </div>
  );
}

export default RiddleList;
