import axios from "axios";

const baseUrl = "https://yc1gn.sse.codesandbox.io";
const path = "auth";

const registerNewUser = async (username, password) => {
  try {
    const user = await axios.post(`${baseUrl}/${path}/register`, {
      username,
      password
    });

    return user.data;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
};

const loginNewUser = async (username, password) => {
  try {
    const user = await axios.post(`${baseUrl}/${path}/login`, {
      username,
      password
    });
    return user.data;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
};

export default { loginNewUser, registerNewUser };
