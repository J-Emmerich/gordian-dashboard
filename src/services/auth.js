import axios from "axios";

const baseUrl =
  process.env.REACT_APP_API_ENDPOINT || "/api";
const path = "auth";
const registerNewUser = async (username, password, email) => {
  const user = await axios.post(`${baseUrl}/${path}/register`, {
    username,
    password,
    email
  });
  console.log(user);
  return user.data.data;
};

const loginNewUser = async (username, password) => {
  try {
    const user = await axios.post(`${baseUrl}/${path}/login`, {
      username,
      password
    });
    console.log(user);
    return user.data.data;
  } catch (err) {
    console.log(err);
  }
};

export default { loginNewUser, registerNewUser };
