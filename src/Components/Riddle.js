import api from "../api";
import { useEffect, useState } from "react";
import TextField from '@material-ui/core/TextField';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import { DrawerHeader } from "./Menu";

function Riddle(props) {
  const [challenge, setChallenge] = useState([]);

  useEffect(() => {
    retrieveChallenge(props.match.params.id);
  }, [props.match.params.id]);

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
  return (
    <div className="App">
      <DrawerHeader />
      {<div>
          <ul>
            <li key={"clue_1"}>
              <img alt={challenge.clue_2}  src={challenge.clue_1}></img>
            </li>
            <li key={"clue_2"}>{challenge.clue_2}</li>
            <li key={challenge.answer}>{challenge.answer}</li>
          </ul>
          
          <TextField
            id="outlined-answer-input"
            label="answer"
            type="answer"
            autoComplete="current-answer"
            variant="outlined"
          />
          <SendRoundedIcon/>
        </div>
      }
    </div>
  );
}

export default Riddle;
