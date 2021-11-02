import axios from "axios";

const saveInvoice = async (invoice) => {
  try {
    await axios.post("https://8vfdu.sse.codesandbox.io/pdf", invoice);
  } catch (err) {
    console.log(err);
  }
};

export default saveInvoice;
