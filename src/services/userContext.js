import React, { useState, createContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import constants from "../constants/index";
import history from "../helpers/history";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [selectedProject, setSelectedProject] = useState()
  useEffect(() => {
    if (localStorage.getItem(constants.LOGGED_USER)) {
      setUser(JSON.parse(localStorage.getItem(constants.LOGGED_USER)));
      if(localStorage.getItem(constants.SELECTED_PROJECT)){
        setSelectedProject(JSON.parse(localStorage.getItem(constants.SELECTED_PROJECT)))
      }  
    }

  }, []);
  const login = (response) => {
    localStorage.setItem(constants.ACCESS_TOKEN, response.token);
    localStorage.setItem(constants.LOGGED_USER, JSON.stringify(response.user));
    if(response.user.workingProject){
      localStorage.setItem(constants.SELECTED_PROJECT, JSON.stringify(response.user.workingProject));
    } else {
if(localStorage.getItem(constants.SELECTED_PROJECT)){
  console.log("it's here")
  localStorage.removeItem(constants.SELECTED_PROJECT);
  
}
    }
    setUser(response.user);
   
    history.push({ pathname: "/app" });
  };

  const logout = () => {
    localStorage.removeItem(constants.ACCESS_TOKEN);
    localStorage.removeItem(constants.LOGGED_USER);
    localStorage.removeItem(constants.SELECTED_PROJECT);

    setUser({});
    setSelectedProject({projectId: "", projectName: ""})
    history.push({ pathname: "/" });
  };

  const updateUser = (receivedUser) => {
    try{
setUser(receivedUser);
    } catch (err){
      console.log(err)
    }
  }
const updateWorkingProjectContext = (workingProject) => {
  const foundProject = user.projects.find(project => project.projectName === workingProject);
  const projectToSave = {projectName: foundProject.projectName, projectId: foundProject._id}
  localStorage.setItem(constants.SELECTED_PROJECT, JSON.stringify(projectToSave));
  setSelectedProject(projectToSave)
}

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser, selectedProject, updateWorkingProjectContext }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
