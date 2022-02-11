import React, { useState, useEffect } from "react";

import Header from "./components/Header";
import CustDetails from "./components/CustDetails";
import Articles from "./components/Articles";
import Total from "./components/Total";
import constants from "../../constants/index";
import "./DocumentPDF.css";
import services from "../../services/pdf"


const DocumentPDF = ({ match }) => {
  const [invoice, setInvoice] = useState(null);

  useEffect(
    
    () => {
      const token = localStorage.getItem(constants.ACCESS_TOKEN);
      if(token){
 getInvoiceData(token, match.params.id);
        }
    },
    [match.params]
  );

  const getInvoiceData = async (token, id) => {
    try {
      const invoiceData = await services.getInvoiceData(token, id)  
setInvoice(invoiceData);   
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <main className="main">
      <section className="document">
        <section className="page">
          <div className="pdf-content">
            <Header />
            <hr></hr>
            {invoice !== null ? (
              <>
                <CustDetails invoice={invoice} client={invoice.client} />
                <Articles articles={invoice.articles} />
                <hr></hr>
                <Total invoice={invoice} />
              </>
            ) : null}
          </div>
        </section>
      </section>
    </main>
  );
};
export default DocumentPDF;
