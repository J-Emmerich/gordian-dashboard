import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import CustDetails from "./CustDetails";
import Articles from "./Articles";
import Total from "./Total";
import "./DocumentPDF.css";

const DocumentPDF = ({ match }) => {
  const [invoice, setInvoice] = useState(null);

  useEffect((id) => {
    axios
      .get(`https://8vfdu.sse.codesandbox.io/pdf/61808f1b5a017fe8cbba7033`)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        setInvoice(response.data);
      });
  }, []);
  // useEffect(
  //   (id) => {
  //     axios
  //       .get(`https://8vfdu.sse.codesandbox.io/pdf/${match.params.id}`)
  //       .then((response) => {
  //         console.log(response);
  //         console.log(response.data);
  //         setInvoice(response.data);
  //       });
  //   },
  //   [match.params]
  // );

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
                  address={invoice.client.address}
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
