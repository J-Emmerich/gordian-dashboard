import axios from "axios";
const baseUrl = process.env.REACT_APP_API_ENDPOINT || "/api";
const path = "invoice"
const getInvoiceData = async (token, id) => {
  
      const invoiceData = await axios.get(`${baseUrl}/${path}/${id}`, {
        headers: { Authorization: `Bearer: ${token}` }
      });
      return invoiceData.data.data;
   
  };

export default {getInvoiceData}
