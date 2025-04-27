import React, { useRef } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { LoginUser, RegisterUser } from '../api/Authapi';
import { LoginParams, Userinterface } from '../types/userinterface';
import { useauth } from '../context/auth/authcontext';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
const Navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const Auth= useauth();

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {

      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
    };
    const user: LoginParams = {
      email: data.email,
      password: data.password,

    
    };

    const response = await LoginUser(user);

    if (response.ok) {
      const responseData = await response.json();
 
      Auth?.login(data.email, responseData['data']);
      console.log('User registered successfully:', Auth?.token);
      console.log('User email successfully:', Auth?.email);
      Navigate('/');
      
    }

    // You can now send this data to your API or further process it
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
      Login Page
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          
          <TextField
            inputRef={emailRef}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            inputRef={passwordRef}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
 <p>Dont have an account? <a href="/register">Register</a></p>
        </Box>
      </Box>
    </Container>
  );
};
