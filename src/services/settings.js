import axios from "axios";

const baseUrl = process.env.REACT_APP_API_ENDPOINT || "/api";
const path = "project";


const getProjects = async (token) => {
  try {
    const invoices = await axios.get(`${baseUrl}/${path}`, {
      headers: { Authorization: `Bearer: ${token}` }
    });
    return invoices.data;
  } catch (err) {
    console.log(err);
  }
};

const getUser = async (token) => {
  try {
    const invoices = await axios.get(`${baseUrl}/${path}/user`, {
      headers: { Authorization: `Bearer: ${token}` }
    });
    return invoices.data;
  } catch (err) {
    console.log(err);
  }
};

const saveProject = async (token, project) => {

  try {
    const user = await axios.post(`${baseUrl}/${path}`, project, {
      headers: { Authorization: `Bearer: ${token}` }
    });
    console.log(user)
    return user.data
  } catch (err) {
    console.log("has an error");
    console.log(err);
  }
};

const editProject = async (token, project) => {
  try {
    await axios.put(`${baseUrl}/${path}/${project._id}`, project, {
      headers: { Authorization: `Bearer: ${token}` }
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteProject = async (token, id) => {
  try {
    const project = await axios.delete(`${baseUrl}/${path}/${id}`, {
      headers: { Authorization: `Bearer: ${token}` }
    });
  } catch (err) {
    console.log(err);
  }
};

const saveCurrentProject = async(token, projectId) => {
  try {
const currentProject = await axios.put(`${baseUrl}/user`, projectId, {
  headers: {Authorization: `Bearer: ${token}`}
});
return currentProject
  } catch (err) {
    console.log(err)
  }
}

export default { getProjects, saveProject, editProject, deleteProject, getUser, saveCurrentProject };

/*
To-do Dashboard
Validate addtask field, warn user of imputOpen/cancel button
Autofocus when adding card and tasks
Create event that points when is leaving the page without saving
autosave functionality
Feature: Create more projects
Feature: Calendar connected with this todo list
Cards have the same size as the one with more content
Facturas
Nueva factura automaticamente incrementa en 1 el número
Posibilidad de añadir imagen de logo
Feature: poder crear templates

CRM

Gestionar ficheros
Gestionar ficheros, subir contratos
Cuando seleciona el cliente veo todas sus facturas
Añadir "acciones" ej. reservas de pet sitter, compro en la tienda, contacto por facebook
*/
