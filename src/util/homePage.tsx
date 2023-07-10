"use client"
import React from 'react';
import {useUser} from "@auth0/nextjs-auth0/client";
import {Box} from '@mui/material';
import Button from "@mui/material/Button";



export default function HomePage() {
    const {user} = useUser();

    const login = () => {
        if (!user) {
            return(
                <Box>
                    <Button href="/api/auth/login" style={button}>
                        Log in
                    </Button>
                </Box>
            )
        }
        else{
            return (
                <Box>
                    <Button href="/api/auth/logout" style={button}>
                        Log out
                    </Button>
                </Box>
            )
        }
    }

    const button = {
        borderRadius: 35,
        padding: "18px 18px",
        fontSize: "200%",
        marginTop:"10%"
    }


    return (
        <Box sx={{}}>
            <h1 style={{color:"black", fontSize:"300%", paddingTop:"5%"}}>WELCOME   {user?.nickname}</h1>

            {login()}
        </Box>

    );
}
