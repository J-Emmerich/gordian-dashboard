import axios from "axios";
import handleFileDownload from "../helpers/handle-file-download";

const baseUrl = "http://localhost:8080";


const getInvoices = async () => {
  try {
    const invoices = await axios.get(`${baseUrl}/pdf`);
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

const saveInvoice = async (invoice) => {
  try {
    await axios.post(`${baseUrl}/pdf`, invoice);
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

const deleteInvoice = async (id) => {
  try {
const invoice = await axios.delete(`${baseUrl}/pdf/${id}`);
console.log("Deleted");
  } catch (err) {
    console.log(err);
  }
}

const saveToPdf = async (id) => {
  try {
    const pdf = await axios.get(`${baseUrl}/pdf/download/${id}`, {responseType: 'blob', });
    handleFileDownload(pdf, id);
    console.log(pdf)
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
