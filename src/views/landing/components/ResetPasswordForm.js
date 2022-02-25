import React, {useContext, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import {useForm, Controller} from "react-hook-form";
import services from "../../../services/auth";
import { useTheme } from '@mui/material/styles';
import axios from 'axios'

import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Collapse from "@mui/material/Collapse"
import Alert from '@mui/material/Alert';


export default function ResetPasswordForm({match }) {
    const theme = useTheme();
    const [open, setOpen] = useState(false)
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const resetPasswordHandler = async (data, e) => {
      const {password} = data;
      console.log(password)
      e.preventDefault();
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
      try {
        const { data } = await axios.put(
          `/api/auth/resetpassword/${match.params.resetToken}`,
            {password}, config
          
        );
        setError("");
        setSuccess(data.data)
        setOpen(true)
       } catch (error) {
         setOpen(true)
         
         setSuccess("")
   setError(error.response.data.error);
   setTimeout(() => {
    setError("");
    setOpen(false)
  }, 3000);
        
    };
  }
  const {control, handleSubmit, watch} = useForm({defaultValues:{}});
  return (

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
           Cambiar contraseña
          </Typography>
          <Box component="form" onSubmit={handleSubmit(resetPasswordHandler)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
           
              <Grid item xs={12}>
              <Controller
        name="password"
        control={control}
        rules={{required: "Campo requerido"}}
        render={({field, fieldState: {error}})=><TextField margin='normal' fullWidth helperText={error? error.message : null} error={!!error} {...field} variant="outlined" label="Password" type="password"></TextField>}>
        </Controller>
        
              </Grid>
              <Grid item xs={12}>
              <Controller
        name="passwordRepeat"
        control={control}
        rules={{required: "Campo requerido",
        validate: value => value === watch('password') || "Contraseñas diferentes"
      }}
        render={({field, fieldState: {error}})=><TextField margin='normal' fullWidth helperText={error? error.message : null} error={!!error} {...field} variant="outlined" label="Repetir Password" type="password"></TextField>}>
        </Controller>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cambiar contraseña
            </Button>
          
          </Box>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Container>
      <Collapse in={open}>
       {error && 
        <Alert
        severity="error"
          action={
            <IconButton
              aria-label="close"
              color="error"
              size="small"
              onClick={() => {
                setError("")
                setOpen(false);
              }}

           
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {error}
        </Alert> }
       {success && 
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setSuccess("")
                setOpen(false);
              }}

            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {success}
        </Alert> }

      </Collapse>
        </Container>
        </Box>
        </Container>

  )
}