import React from "react";
import styled from "styled-components";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

const Title = styled.div``;
const Content = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
`;

const Home = () => {
  return (
    <Content>
      <Title>
        <h2>Bienvenido a Gordian Knot</h2>
      </Title>
      <p>
        Este es un proyecto en desarrollo. Es una webapp para gestionar pequeñas
        empresas y equipos.
      </p>
      <p>
        Esta hecho con MERN stack, en el front end utilizo Material UI como
        libreria y Styled-Components para el estilo. El testing es con Jest,
        utiliza Puppetter para el renderizado de pdf y react-beautiful-dnd para
        la lista de tareas.
      </p>
      <p>
        Lo creé para ayudar en la organización y gestión de la empresa que soy
        co-fundador,{" "}
        <a href="https://www.furmidablefamily.com">Furmidable Family</a>.
      </p>
      <p>
        Si quieres saber más contactame por{" "}
        <a href="https://linkedin.com/in/joaoemmerich">LinkedIn</a>
      </p>
      <p>João Emmerich</p>

      <hr />
      <Title>
        <h2>Roadmap</h2>
      </Title>
      <List>
        <ListItem>
          <ListItemIcon>
            <Checkbox disabled checked={true} />
          </ListItemIcon>
          <ListItemText>MVP</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Checkbox disabled  />
          </ListItemIcon>
          <ListItemText>User Roles</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Checkbox disabled />
          </ListItemIcon>
          <ListItemText>
            Gestión de Usuarios / Añadir Colaboradores
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Checkbox disabled />
          </ListItemIcon>
          <ListItemText>Dashboard con estadísticas</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Checkbox disabled />
          </ListItemIcon>
          <ListItemText>
            Subir ficheros / Gestionar contratos de los clientes
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Checkbox disabled checked={true}/>
          </ListItemIcon>
          <ListItemText>Validación de los formularios</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Checkbox disabled />
          </ListItemIcon>
          <ListItemText>Notificaciones con Socket.IO</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Checkbox disabled />
          </ListItemIcon>
          <ListItemText>
            Establecer tema front-end / Añadir tema oscuro
          </ListItemText>
        </ListItem>
      </List>
    </Content>
  );
};

export default Home;
