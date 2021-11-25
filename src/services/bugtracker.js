import axios from "axios";

const baseUrl = "https://ufl1g.sse.codesandbox.io";
const path = "bugtracker";

const getBugs = async () => {
  try {
    const customers = await axios.get(`${baseUrl}/${path}`);

    return customers.data;
  } catch (err) {
    console.log(err);
  }
};

const saveBug = async (customer) => {
  try {
    const response = await axios.post(`${baseUrl}/${path}`, customer);
    console.log("this is the response::::", response);
    return response.data;
  } catch (err) {
    console.log("Error sending data");
    console.log(err);
  }
};

const editBug = async (customer) => {
  try {
    const edited = await axios.put(
      `${baseUrl}/${path}/${customer._id}`,
      customer
    );
    console.log(edited.data, "this is edited:::: ");
  } catch (err) {
    console.log(err);
  }
};

const deleteBug = async (id) => {
  try {
    const customer = await axios.delete(`${baseUrl}/${path}/${id}`);
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
