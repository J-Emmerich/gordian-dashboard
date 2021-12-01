import axios from "axios";

const baseUrl = "https://qrci0.sse.codesandbox.io";
const path = "dashboard";

const saveBoardToDatabase = async (token, boardData) => {
  try {
    const response = await axios.post(`${baseUrl}/${path}`, boardData, {
      headers: { Authorization: `Bearer: ${token}` }
    });
    return response.data;
  } catch (err) {
    console.log("Error sending data");
  }
};

const getProject = async (token) => {
  try {
    const response = await axios.get(`${baseUrl}/${path}`, {
      headers: { Authorization: `Bearer: ${token}` }
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// Use only for debugging, deletes all database
const __cleanAndLog = async () => {
  await axios.delete(`${baseUrl}/${path}`);
};

export default { saveBoardToDatabase, getProject, __cleanAndLog };
