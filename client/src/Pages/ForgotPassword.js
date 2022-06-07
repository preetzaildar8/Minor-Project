import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import axios from "../api/axios";

const ForgotPassword = () => {

    const navigate = useNavigate()
  const [email, setEmail] = useState();
  const [otp,setOtp] = useState()
  const [password, setPassword] = useState()
  const [flag,setFlag] = useState(false)

  const handleSubmit = async (event) => {
      event.preventDefault()
      try {
        if(!otp) {
            if (email) {
              const response = await axios.post(`user/forgotpassword`, { email });
              if(response.status === 200) {
                setFlag(true)
              }
            }
        } else {
            const response = await axios.post(`user/changePassword`,{
                OTP:otp,
                password:password
            })
            if(response.status === 200) {
                setOtp('')
                setFlag(false)

                navigate('/login')
            }
        } 
      } catch (error) {
          console.log('error', error)
      }
     
  };

  

  return (
    <>
      <form onSubmit={(event) => handleSubmit(event)}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent={"center"}
          maxWidth={700}
          alignContent={"center"}
          alignSelf="center"
          marginLeft={"auto"}
          marginRight="auto"
          marginTop={10}
        >
         { !flag ? <TextField
            label="Email"
            defaultValue={email}
            onChange={(event) => setEmail(event.target.value)}
            margin="normal"
            fullWidth
            variant="outlined"
            name="email"
          /> : 
          <>
          <TextField
          label="OTP"
          value={otp}
          onChange={(event) => setOtp(event.target.value)}
          margin="normal"
          fullWidth
          type="number"
          variant="outlined"
          name="otp"
        />
        <TextField
          label="Password"
          value={password}
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          margin="normal"
          fullWidth
          variant="outlined"
          name="password"
        />
        </>
          }
         <Button type="submit" >Submit</Button>
        </Box>
      </form>
    </>
  );
};

export default ForgotPassword;
