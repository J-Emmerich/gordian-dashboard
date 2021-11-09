import axios from "axios";

const baseUrl = "https://ufl1g.sse.codesandbox.io";

const saveBoardToDatabase = async (boardData) => {
  try {
    const response = await axios.post(`${baseUrl}/dashboard`, boardData);
    console.log("this is the response::::", response);
    return response.data;
  } catch (err) {
    console.log("Error sending data");
    console.log(err);
  }
};

const getProject = async () => {
  try {
    const response = await axios.get(`${baseUrl}/dashboard`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// Use only for debugging, deletes all database
const __cleanAndLog = async () => {
  await axios.delete(`${baseUrl}/dashboard`);
};

export default { saveBoardToDatabase, getProject, __cleanAndLog };
