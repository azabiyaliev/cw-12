import { useState } from 'react';
import {IRegister} from "../../../types";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Avatar, Button } from '@mui/material';
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import { selectRegisterError } from '../usersSlice.ts';
import {NavLink, useNavigate} from 'react-router-dom';
import {register} from "../usersThunk.ts";
import * as React from "react";
import FileInput from "../../../components/FileInput/FileInput.tsx";
import HowToRegIcon from '@mui/icons-material/HowToReg';

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const registerError = useAppSelector(selectRegisterError);
  const navigate = useNavigate();
  const [form, setForm] = useState<IRegister>({
    email: "",
    password: "",
    displayName: "",
    avatar: null,
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm(prevState => ({...prevState, [name]: value}));
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(register(form)).unwrap();
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return registerError?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const fileEventChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      setForm((prevState) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };


  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '1px solid gray',
          borderRadius: 4,
          p: 2,
          boxShadow: '0 4px 12px rgba(255, 255, 255, 0.2)'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <HowToRegIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 3 }}>
          <Grid container direction={'column'} size={12} spacing={2}>
            <Grid size={12}>
              <TextField
                fullWidth
                required
                id="email"
                label="Email"
                name="email"
                value={form.email}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('email'))}
                helperText={getFieldError('email')}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={form.password}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('password'))}
                helperText={getFieldError('password')}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                  required
                  fullWidth
                  name="displayName"
                  label="Display name"
                  type="displayName"
                  id="displayName"
                  value={form.displayName}
                  onChange={inputChangeHandler}
                  error={Boolean(getFieldError('displayName'))}
                  helperText={getFieldError('displayName')}
              />
            </Grid>
            <Grid size={{ xs: 12 }} >
              <FileInput
                  name="avatar"
                  label="Avatar"
                  onGetFile={fileEventChangeHandler}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="center" >
            <Grid >
              <NavLink to={"/login"} style={{ textDecoration: 'none', color: 'inherit' }}>
                Already have an account? Sign in
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;