import axios from "axios";
import handleFileDownload from "../helpers/handle-file-download";

const baseUrl =
  process.env.REACT_APP_API_ENDPOINT || "https://3r0658.sse.codesandbox.io/api";
const path = "invoice";
const getInvoices = async (token) => {
  try {
    const invoices = await axios.get(`${baseUrl}/${path}`, {
      headers: { Authorization: `Bearer: ${token}` }
    });
    return invoices.data.data;
  } catch (err) {
    console.log(err);
  }
};

const getOneInvoice = async (token, id) => {
  try {
    const invoice = await axios.get(`${baseUrl}/${path}/${id}`, {
      headers: { Authorization: `Bearer: ${token}` }
    });
    return invoice.data.data;
  } catch (err) {
    console.log(err);
  }
};

const saveInvoice = async (token, invoice) => {
  try {
    await axios.post(`${baseUrl}/${path}`, invoice, {
      headers: { Authorization: `Bearer: ${token}` }
    });
  } catch (err) {
    console.log("has an error");
    console.log(err);
  }
};
const editInvoice = async (token, invoice) => {
  try {
    await axios.put(`${baseUrl}/${path}/${invoice._id}`, invoice, {
      headers: { Authorization: `Bearer: ${token}` }
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteInvoice = async (token, id) => {
  try {
    const invoice = await axios.delete(`${baseUrl}/${path}/${id}`, {
      headers: { Authorization: `Bearer: ${token}` }
    });
  } catch (err) {
    console.log(err);
  }
};

const saveToPdf = async (token, id) => {
  try {
    const pdf = await axios.get(`${baseUrl}/${path}/download/${id}`, {
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
