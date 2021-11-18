import axios from "axios";

const baseUrl = "https://ufl1g.sse.codesandbox.io";

const getCustomers = async () => {
  try {
    const customers = await axios.get(`${baseUrl}/customer`);

    return customers.data;
  } catch (err) {
    console.log(err);
  }
};

const saveCustomer = async (customer) => {
  try {
    const response = await axios.post(`${baseUrl}/customer`, customer);
    console.log("this is the response::::", response);
    return response.data;
  } catch (err) {
    console.log("Error sending data");
    console.log(err);
  }
};

const editCustomer = async (customer) => {
  try {
    const edited = await axios.put(
      `${baseUrl}/customer/${customer._id}`,
      customer
    );
    console.log(edited.data, "this is edited:::: ");
  } catch (err) {
    console.log(err);
  }
};

const deleteCustomer = async (id) => {
  try {
    const customer = await axios.delete(`${baseUrl}/customer/${id}`);
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
