import api from "../api";
import React, { useEffect, useState } from "react";
import TextField from '@material-ui/core/TextField';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import { DrawerHeader } from "./Menu";
import { useLocation } from 'react-router-dom'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function Riddle(props) {
  const [challenge, setChallenge] = useState([]);
  const [answered, setAnswered] = useState(false);
  
  const location = useLocation()
  const { id } = location.state

  useEffect(() => {
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
    const data = new FormData(event.currentTarget)
    console.log({
      answer: data.get('answer'),
    });

    api.postAnswer(id, data.get('answer')).then(
      (res) => {
        // wrong answer
        if (res.status === 200){
          console.log(res.data)
        }
        
        // correct answer
        if (res.status === 201){
          setAnswered(true)
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  return (
    <div className="App">
      <DrawerHeader />
      {answered ? <>CORRECT!</>:<div>
          <ul>
            <li key={"clue_1"}>
              <img alt={challenge.clue_2}  src={challenge.clue_1}></img>
            </li>
            <li key={"clue_2"}>{challenge.clue_2}</li>
            <li key={challenge.answer}>{challenge.answer}</li>
          </ul>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
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
              color="primary"
              endIcon={<SendRoundedIcon/>}
            >
              Send
            </Button>
            
          </Box>
      </div>}
    </div>
  );
}

export default Riddle;
