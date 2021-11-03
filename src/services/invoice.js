import axios from "axios";

const saveInvoice = async (invoice) => {
  try {
    await axios.post("https://8vfdu.sse.codesandbox.io/pdf", invoice);
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

export default { saveInvoice, getInvoices };
