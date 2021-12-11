import axios from "axios";

const baseUrl = "http://localhost:8080";

const getCustomers = async (token, selectedProject) => {
  try {
    const customers = await axios.get(`${baseUrl}/customer`, {
      headers: { Authorization: `Bearer: ${token}` }
    });

    return customers.data;
  } catch (err) {
    console.log(err);
  }
};

const saveCustomer = async (token, selectedProject, customer) => {
  try {
    const response = await axios.post(`${baseUrl}/customer`, customer, {
      headers: { Authorization: `Bearer: ${token}` }
    });
    console.log("this is the response::::", response);
    return response.data;
  } catch (err) {
    console.log("Error sending data");
    console.log(err);
  }
};

const editCustomer = async (token, selectedProject, customer) => {
  try {
    const edited = await axios.put(
      `${baseUrl}/customer/${customer._id}`,
      customer,
      {
        headers: { Authorization: `Bearer: ${token}` }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const deleteCustomer = async (token, selectedProject, id) => {
  try {
    const customer = await axios.delete(`${baseUrl}/customer/${id}`, {
      headers: { Authorization: `Bearer: ${token}` }
    });
    console.log("Deleted", customer);
  } catch (err) {
    console.log(err);
  }
};

export default {
  getCustomers,
  saveCustomer,
  editCustomer,
  deleteCustomer
};
