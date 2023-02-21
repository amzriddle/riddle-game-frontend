import React, { useEffect, useState } from "react";
import {
  CssBaseline,
  Box,
  Pagination,
  Typography,
  Grid,
  Container,
} from "@mui/material";

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
  const [page, setPage] = useState(1);

  useEffect(() => {
    api
      .getRanking(page)
      .then((res: any) => {
        setRanking(res.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    api
      .getRanking(value)
      .then((res: any) => {
        setRanking(res.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

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
        <Grid>
          <CssBaseline />
          <Grid item xs={12}>
            <Typography variant="h3">Ranking</Typography>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
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
          </Grid>
          <Grid item xs={12}>
            <Pagination count={10} page={page} onChange={handleChange} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Ranking;
