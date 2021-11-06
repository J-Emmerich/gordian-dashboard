import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import CustDetails from "./CustDetails";
import Articles from "./Articles";
import Total from "./Total";
import "./DocumentPDF.css";
const baseUrl = "http://localhost:8080"
const DocumentPDF = (props) => {
  const [invoice, setInvoice] = useState(null);
console.log(props, "this are the props")
const match = props.match;
  useEffect(
    (id) => {
      axios
        .get(`${baseUrl}/pdf/${match.params.id}`)
        .then((response) => {
          console.log(response);
          console.log(response.data);
          setInvoice(response.data);
        });
    },
    [match.params]
  );

  useEffect(() => console.log("this are the invoices:", invoice), [invoice]);

  if (invoice) {
    console.log("this is articles", invoice.articles);
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
                <CustDetails
                  invoice={invoice}
                  client={invoice.client}
                />
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
