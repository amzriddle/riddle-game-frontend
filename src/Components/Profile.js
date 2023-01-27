import api from "../api";
import React, { useState, useEffect } from 'react';
import { DrawerHeader } from "./Menu";
import { Box, CssBaseline } from "@mui/material";
import Typography from '@mui/material/Typography';

function Profile () {
    const [data, setData] = useState(null);

    useEffect(() => {
        let mounted = true;
        api.getUser().then((res) => {
            setData(res.data);
            console.log(res.data);
        });
        return () => mounted = false;
    }, [])

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader/>
                <h1>Profile</h1>
                <Typography paragraph>
                </Typography>
            </Box>

            
            {data ? <h1>{data.username}</h1> : null}
        </Box>
    )
}

export default Profile