import axios from "axios";

const baseUrl =
  process.env.REACT_APP_API_ENDPOINT || "/api";

const getCustomers = async (token) => {
  try {
    const customers = await axios.get(`${baseUrl}/customer`, {
      headers: { Authorization: `Bearer: ${token}` }
    });

    return customers.data.data;
  } catch (err) {
    console.log(err);
  }
};

const saveCustomer = async (token, customer) => {
  try {
    const response = await axios.post(`${baseUrl}/customer`, customer, {
      headers: { Authorization: `Bearer: ${token}` }
    });
    return response.data.data;
  } catch (err) {
    console.log("Error sending data");
    console.log(err);
  }
};

const editCustomer = async (token, customer) => {
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

const deleteCustomer = async (token, id) => {
  try {
    const customer = await axios.delete(`${baseUrl}/customer/${id}`, {
      headers: { Authorization: `Bearer: ${token}` }
    });
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
