import React, { useEffect, useState, useContext } from "react";
import {UserContext} from "../../services/userContext"
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
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
  const [hasSaved, setHasSaved] = useState(false)
  const [workingProject, setWorkingProject] = useState();
 const {updateUser, updateWorkingProjectContext} = useContext(UserContext);
 const [hiddenSelect, setHiddenSelect] = useState("default");
 console.log(user, "here on settings")
  useEffect(() => {
    async function fetchUpdatedUser() {
      const projects = await services.getUser(token);
      console.log(projects, "this was fetched from user projects");
      updateUser(projects);
    }
    fetchUpdatedUser();
  }, [hasSaved]);

  const saveProject =async () => {
    const project = {
      projectName: projectName,
      projectUsers: [{ userId: user._id, role: "admin" }]
    };
   const returned = await services.saveProject(token, project);
   console.log("this was returned", returned)
   setProjectName("");
   setHasSaved(!hasSaved);

  };

  const saveWorkingProject = async (currentProjectToSave) => {
    
      const project = user.projects.find(project => project.projectName === currentProjectToSave)
      const newUser = await services.saveCurrentProject(token, project);
     console.log(newUser)
  
  }

const selectWorkingProject = (selectedProject) => {

  if(selectedProject !== "Cual proyecto quieres trabajar?") {
    setWorkingProject(selectedProject);
   
  }

}
const updateWorkingProject = () => {
  if(workingProject !== "Cual proyecto quieres trabajar?") {
updateWorkingProjectContext(workingProject);
saveWorkingProject(workingProject);
  }
}
  return (
    <div>
      <p>Estos son los ajustes.</p>

      <p>
        Puede crear nuevo projecto y añadir compañeros con su nombre de usuario.
      </p>
      <p>Muestra los projectos que tiene y su rol en cada uno</p>
      <p>Muestra su nombre de usuario, y su id </p>



      <div>
        <h2>Crear nuevo projecto</h2>
        
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
        
      </div>

      <div><h2>Elegir proyecto</h2>
      <Select
     defaultValue={hiddenSelect}

       onChange={(e)=>selectWorkingProject(e.target.value)}
       name="workingProject"
       variant="outlined">
<MenuItem value={hiddenSelect} disabled>
         Cual proyecto quieres trabajar?
          </MenuItem>
{user && user.projects?
      
user.projects.map(project => <MenuItem key={project._id} value={project.projectName}>{project.projectName}</MenuItem>) : null}
      </Select>
      <Button  variant="contained"
            color="primary"
            onClick={() => updateWorkingProject()}>Elegir</Button>
      </div>
    </div>
  );
};

export default Settings;