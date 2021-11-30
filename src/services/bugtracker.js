import axios from "axios";

const baseUrl = "https://qrci0.sse.codesandbox.io";
const path = "bugtracker";

const getBugs = async (token) => {
  try {
    const customers = await axios.get(`${baseUrl}/${path}`, {
      headers: { Authorization: `Bearer: ${token}` }
    });

    return customers.data;
  } catch (err) {
    console.log(err);
  }
};

const saveBug = async (token, customer) => {
  try {
    const response = await axios.post(`${baseUrl}/${path}`, customer, {
      headers: { Authorization: `Bearer: ${token}` }
    });
    console.log("this is the response::::", response);
    return response.data;
  } catch (err) {
    console.log("Error sending data");
    console.log(err);
  }
};

const editBug = async (token, customer) => {
  try {
    const edited = await axios.put(
      `${baseUrl}/${path}/${customer._id}`,
      customer,
      {
        headers: { Authorization: `Bearer: ${token}` }
      }
    );
    console.log(edited.data, "this is edited:::: ");
  } catch (err) {
    console.log(err);
  }
};

const deleteBug = async (token, id) => {
  try {
    const customer = await axios.delete(`${baseUrl}/${path}/${id}`, {
      headers: { Authorization: `Bearer: ${token}` }
    });
    console.log("Deleted", customer);
  } catch (err) {
    console.log(err);
  }
};

export default {
  getBugs,
  saveBug,
  editBug,
  deleteBug
};
