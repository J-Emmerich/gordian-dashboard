import axios from "axios";
const baseUrl = process.env.REACT_APP_API_ENDPOINT || "/api";

const getInvoiceData = async (token, id) => {
    try {
      const invoiceData = await axios.get(`${baseUrl}/pdf/${id}`, {
        headers: { Authorization: `Bearer: ${token}` }
      });
      return invoiceData.data;
    } catch (err) {
      console.log(err);
    }
  };

export default {getInvoiceData}
