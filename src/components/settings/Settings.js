import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import services from "../../services/settings";

const StyledTextField = styled(TextField)`
  & input,
  textarea,
  select,
  option,
  root {
    padding: 20px;
    background-color: #f3f3f3;
  }
`;
const Settings = ({ token, user }) => {
  const [projectName, setProjectName] = useState("");
  useEffect(() => {
    async function getProjects() {
      const projects = await services.getProjects(token);
      console.log(projects);
    }
    getProjects();
  });
  const saveProject = () => {
    const project = {
      name: projectName,
      users: [{ userId: user._id, role: "admin" }]
    };
    services.saveProject(token, project);
  };
  return (
    <div>
      <p>Estos son los ajustes.</p>

      <p>
        Puede crear nuevo projecto y añadir compañeros con su nombre de usuario.
      </p>
      <p>Muestra los projectos que tiene y su rol en cada uno</p>
      <p>Muestra su nombre de usuario, y su id </p>

      <div>
        <form>
          <div>
            <StyledTextField
              placeholder="Nombre del projecto"
              variant="outlined"
              type="text"
              id="username"
              margin="dense"
              onChange={(e) => setProjectName(e.target.value)}
              value={projectName}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => saveProject()}
          >
            Enviar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Settings;