import React, { useEffect, useState } from "react";
import { CssBaseline, Box, Pagination } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import api from "../api";

interface Ranking {
  rank: number;
  email: string;
  completeChallengesCount: number;
}

function Ranking() {
  const [ranking, setRanking] = useState<Ranking[]>([]);

  useEffect(() => {
    api
      .getRanking(1)
      .then((res: any) => {
        setRanking(res.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
        <h1>Ranking</h1>
        <div style={{ height: 400, width: "100%" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Rank</TableCell>
                  <TableCell align="right">email</TableCell>
                  <TableCell align="right">Complete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ranking.map((row) => (
                  <TableRow
                    key={row.email}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.rank}
                    </TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">
                      {row.completeChallengesCount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination count={10} />
        </div>
      </Box>
    </Box>
  );
}

export default Ranking;
