import axios from "axios";
const baseUrl = "https://8vfdu.sse.codesandbox.io";
const saveInvoice = async (invoice) => {
  try {
    await axios.post("https://8vfdu.sse.codesandbox.io/pdf", invoice);
  } catch (err) {
    console.log(err);
  }
};
const editInvoice = async (invoice) => {
  try {
    await axios.put(`${baseUrl}/pdf/${invoice._id}`, invoice);
  } catch (err) {
    console.log(err);
  }
};

const getInvoices = async () => {
  try {
    const invoices = await axios.get("https://8vfdu.sse.codesandbox.io/pdf");
    return invoices.data;
  } catch (err) {
    console.log(err);
  }
};

const getOneInvoice = async (id) => {
  try {
    const invoice = await axios.get(`${baseUrl}/pdf/${id}`);
    return invoice.data;
  } catch (err) {
    console.log(err);
  }
};

const saveToPdf = async (id) => {
  try {
    const pdf = await axios.get(`${baseUrl}/pdf/download/${id}`);
    console.log(pdf);
  } catch (err) {
    console.log(err);
  }
};

export default {
  saveInvoice,
  getInvoices,
  getOneInvoice,
  editInvoice,
  saveToPdf
};
