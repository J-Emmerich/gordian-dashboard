import React, { useState, useContext } from "react";
import styled from "styled-components";
import services from "../../services/auth";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { UserContext } from "../../services/userContext";
import constants from "../../constants/index";
import {Redirect, Link} from "react-router-dom"
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';


const Dashboard = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const ____Container____ = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  flex-grow: 1;
`;

const Form = styled.div`
  margin: 40px auto;
  font-family: "Segoe UI", sans-serif;
  padding: 25px 28px;
  border-radius: 4px;
  border: 1px solid #302d2d;
  display: flex;
  flex-flow: column wrap;
`;
const FormTitle = styled.p`
  text-align: center;
  font-size: 28px;
  margin-bottom: 20px;
  font-weight: 400;
`;

const BottomMessage = styled.p`
  text-align: center;
  > a {
    color: #fc86aa;
  }
`;
const StyledTextField = styled(TextField)`
  & input,
  textarea,
  select,
  option {
    padding: 20px;
  }
`;
const ErrorMessage = styled.div`
  flex-grow: 0;
  text-align: center;
  color: white;
  font-size: 14px;
  padding: 5px;
  width: 90%;
`;
const InputBlock = styled.div`
  display: block;
  margin-bottom: 20px;
`;
const LoginForm = ({ submitUser }) => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(UserContext);
  const token = localStorage.getItem(constants.ACCESS_TOKEN);

  const submitLogin = async (e, username, password) => {
    e.preventDefault();

    try {
      const user = await services.loginNewUser(username, password);
      login(user);
    } catch (err) {
      setErrorMessage(err.message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
    }
  };
  const submitRegister = async (e, username, password) => {
    try {
      e.preventDefault();
      const user = await services.registerNewUser(username, password);
      login(user);
    } catch (err) {
      setErrorMessage(err.message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
    }
  };

  return !token? 
  (

<Dashboard>

      <header style={{ backgroundColor: "#00022E", color: "#FC86AA" }}>
        <FormTitle>Gordian Knot</FormTitle>
      </header>

      <Container component="main" maxWidth="xs">
        <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
        <CssBaseline />
        <Form>
          <FormTitle>{isLoginForm ? "Login" : "Registro"}</FormTitle>
          <form>
            <InputBlock>
              <StyledTextField
                placeholder="Nombre de usuario"
                variant="outlined"
                type="text"
                id="username"
                margin="dense"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </InputBlock>
            <InputBlock>
              <StyledTextField
                placeholder="Contraseña"
                type="password"
                variant="outlined"
                id="password"
                margin="dense"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </InputBlock>
           
          </form>
          <Button
            variant="contained"
            color="primary"
            onClick={
              isLoginForm
                ? (e) => submitLogin(e, username, password)
                : (e) => submitRegister(e, username, password)
            }
          >
            Enviar
          </Button>

          <Grid container>
              <Grid item xs>
                
                 <Link to="/forgotpassword"> Forgot password?</Link>
             
              </Grid>
              <Grid item>
                <Button href="#" >
                  {"Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
        </Form>
       </Box>
      </Container>
      <footer style={{ backgroundColor: "#00022E", color: "#FC86AA" }}>
        <BottomMessage>
          Desarollado por{" "}
          <a href="https://linkedin.com/in/joao-emmerich">João Emmerich</a>
        </BottomMessage>
      </footer>
    </Dashboard>) : <Redirect to="/app" />
  
};

export default LoginForm;
