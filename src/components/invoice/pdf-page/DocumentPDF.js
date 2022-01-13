import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import CustDetails from "./CustDetails";
import Articles from "./Articles";
import Total from "./Total";
import constants from "../../../constants/index";
import "./DocumentPDF.css";
const baseUrl = "https://gordianknot.xyz";

const DocumentPDF = ({ match }) => {
  const [invoice, setInvoice] = useState(null);

  useEffect(
    
    () => {
      const token = localStorage.getItem("ACCESS_TOKEN");
console.log("Do I have a token=?")
      if(token){
console.log("I have a token", token)
        axios.get(`${baseUrl}/pdf/${match.params.id}`, {
          headers: { Authorization: `Bearer: ${token}` }}).then((response) => {
            console.log(response.data)
            setInvoice(response.data);
          });
        }
    },
    [match.params]
  );

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
