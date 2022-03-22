import axios from "axios";

const baseUrl =
  process.env.REACT_APP_API_ENDPOINT || "/api";
const path = "setting";

const getProjects = async (token) => {
  try {
    const invoices = await axios.get(`${baseUrl}/${path}`, {
      headers: { Authorization: `Bearer: ${token}` }
    });
    return invoices.data.data;
  } catch (err) {
    console.log(err);
  }
};

const getUser = async (token) => {
  try {
    const invoices = await axios.get(`${baseUrl}/${path}/user`, {
      headers: { Authorization: `Bearer: ${token}` }
    });
    return invoices.data.data;
  } catch (err) {
    console.log(err);
  }
};

const saveProject = async (token, project) => {
  try {
    const user = await axios.post(`${baseUrl}/${path}`, project, {
      headers: { Authorization: `Bearer: ${token}` }
    });

    return user.data.data;
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

const saveCurrentProject = async (token, projectId) => {
  try {
    const currentProject = await axios.put(`${baseUrl}/${path}`, projectId, {
      headers: { Authorization: `Bearer: ${token}` }
    });
    return currentProject;
  } catch (err) {
    console.log(err);
  }
};

export default {
  getProjects,
  saveProject,
  editProject,
  deleteProject,
  getUser,
  saveCurrentProject
};
