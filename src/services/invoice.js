import axios from "axios";
import handleFileDownload from "../helpers/handle-file-download";

// const baseUrl = "http://localhost:8080";
const baseUrl = "https://yc1gn.sse.codesandbox.io";

const getInvoices = async (token) => {
  try {
    const invoices = await axios.get(`${baseUrl}/pdf`, {
      headers: { Authorization: `Bearer: ${token}` }
    });
    return invoices.data;
  } catch (err) {
    console.log(err);
  }
};

const getOneInvoice = async (token, id) => {
  try {
    const invoice = await axios.get(`${baseUrl}/pdf/${id}`, {
      headers: { Authorization: `Bearer: ${token}` }
    });
    return invoice.data;
  } catch (err) {
    console.log(err);
  }
};

const saveInvoice = async (token, invoice) => {
  try {
    await axios.post(`${baseUrl}/pdf`, invoice, {
      headers: { Authorization: `Bearer: ${token}` }
    });
  } catch (err) {
    console.log("has an error");
    console.log(err);
  }
};
const editInvoice = async (token, invoice) => {
  try {
    await axios.put(`${baseUrl}/pdf/${invoice._id}`, invoice, {
      headers: { Authorization: `Bearer: ${token}` }
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteInvoice = async (token, id) => {
  try {
    const invoice = await axios.delete(`${baseUrl}/pdf/${id}`, {
      headers: { Authorization: `Bearer: ${token}` }
    });
  } catch (err) {
    console.log(err);
  }
};

const saveToPdf = async (token, id) => {
  try {
    const pdf = await axios.get(`${baseUrl}/pdf/download/${id}`, {
      headers: { Authorization: `Bearer: ${token}` },
      responseType: "blob"
    });
    handleFileDownload(pdf, id);
  } catch (err) {
    console.log(err);
  }
};

export default {
  getInvoices,
  getOneInvoice,
  saveInvoice,
  editInvoice,
  deleteInvoice,
  saveToPdf
};
