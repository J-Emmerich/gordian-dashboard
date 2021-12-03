import React, { useState, useContext } from "react";
import styled from "styled-components";
import services from "../services/auth";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { UserContext } from "../services/userContext";
import constants from "../constants/index";
import {Redirect} from "react-router-dom"

const Dashboard = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const Container = styled.div`
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
  console.log(token)
  const submitLogin = async (e, username, password) => {
    e.preventDefault();
    console.log("here", login);
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

      <Container>
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

          <BottomMessage>
            Quieres&nbsp;
            <Button
              style={{ color: "#FC86AA" }}
              onClick={() => setIsLoginForm(!isLoginForm)}
            >
              {isLoginForm ? "te registrar" : "hacer login"}
            </Button>
            &nbsp;?
          </BottomMessage>
        </Form>
        {errorMessage ? (
          <ErrorMessage>
            <p>{errorMessage}</p>
          </ErrorMessage>
        ) : (
          <ErrorMessage>&nbsp;</ErrorMessage>
        )}
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
