import axios from "axios";

const url = "https://u454o.sse.codesandbox.io/dashboard";

const saveBoardToDatabase = async (boardData) => {
  try {
    const response = await axios.post(url, boardData);
    console.log("this is the response::::", response);
    return response.data;
  } catch (err) {
    console.log("Error sending data");
    console.log(err);
  }
};

const getProject = async () => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// Use only for debugging, deletes all database
const __cleanAndLog = async () => {
  await axios.delete(url);
};

export default { saveBoardToDatabase, getProject, __cleanAndLog };
