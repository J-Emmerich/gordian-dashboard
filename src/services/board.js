import axios from "axios";

const url = "https://llowm.sse.codesandbox.io/";

const saveBoardToDatabase = async (boardData) => {
  try {
    const response = await axios.post(url, boardData);
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

export default { saveBoardToDatabase, getProject };
