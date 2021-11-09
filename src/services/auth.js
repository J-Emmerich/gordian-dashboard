import axios from "axios";

const baseUrl = "https://ufl1g.sse.codesandbox.io";
const path = "auth";

export const registerNewUser = async (username, password) => {
  try {
    const user = await axios.post(`${baseUrl}/${path}/register`, {
      username,
      password
    });
    console.log(user);
    return user.data;
  } catch (error) {
    console.log("at the axios error", error.response);
    throw new Error(error.response.data.msg);
  }
};

export const loginNewUser = async (username, password) => {
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
