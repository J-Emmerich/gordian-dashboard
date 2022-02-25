import axios from "axios";

const baseUrl = process.env.REACT_APP_API_ENDPOINT || "/api";
const path = "auth";
const registerNewUser = async (username, password, email) => {
    const user = await axios.post(`${baseUrl}/${path}/register`, {
      username,
      password, 
      email
    });
    return user.data.data;
  
};

const loginNewUser = async (username, password) => {

    const user = await axios.post(`${baseUrl}/${path}/login`, {
      username,
      password
    });
    return user.data.data;
  
};

export default { loginNewUser, registerNewUser };
