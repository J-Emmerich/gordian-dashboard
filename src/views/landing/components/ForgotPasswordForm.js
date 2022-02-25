import React, {useState, useContext} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {NavLink} from 'react-router-dom'; 
import {useForm, Controller} from "react-hook-form";
import services from "../../../services/auth";
import { UserContext } from "../../../services/userContext";
import { useTheme } from '@mui/material/styles';
import Collapse from "@mui/material/Collapse"
import Alert from '@mui/material/Alert';

import axios from 'axios'

export default function ForgotPasswordForm() {
    const theme = useTheme();
    const { login } = useContext(UserContext);
    const [open, setOpen] = useState(false)
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const forgotPasswordHandler = async (email, e) => {
      e.preventDefault();
  
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
  
      try {
        const { data } = await axios.post(
          "/api/auth/forgotpassword",
        email,
          config
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
      }
    };
  const {control, handleSubmit} = useForm({defaultValues:{}});
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
            Recuperar contraseña
          </Typography>
          <Box component="form" onSubmit={handleSubmit(forgotPasswordHandler)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              
            
              <Grid item xs={12}>
              <Controller
        name="email"
        control={control}
        rules={{required: "Campo requerido",
        pattern: {value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "Formato del correo no es valido."}}}
        render={({field, fieldState: {error}})=><TextField margin='normal' fullWidth helperText={error? error.message : null} error={!!error} {...field} variant="outlined" label="Correo Electronico"></TextField>}>
        </Controller>
              </Grid>
              
             
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             Enviar Correo
            </Button>

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

          </Box>
        </Box>
      </Container>

  )
}