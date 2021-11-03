import React from "react";

const CustDetails = ({ invoice, client, address }) => {
  const {
    invoiceNumber,
    invoiceDate,
    invoiceDue,
    invoiceTotal,
    orderNumber
  } = invoice;
  const {
    clientCity,

    clientPostalCode,
    countryCode,
    clientAddress
  } = address;
  const { clientName, clientEmail, clientPhone } = client;

  //   console.log("called", prop.clientName);
  return (
    <section className="cust-details-container">
      <div className="cust-details">
        <h2>Factura en nombre de: </h2>
        <ul className="cust-details-items">
          <li>{clientName}</li>
        </ul>
      </div>
      <div className="invoice-details">
        <h2>Detalles</h2>
        <div className="detail-lists">
          <ul>
            <li>Numero de factura </li>
            <li>Fecha de factura</li>
            {/* <li>Numero pedido</li> */}
          </ul>
          <ul className="detail-lists-results">
            <li>{invoiceNumber} </li>
            <li>{invoiceDate}</li>
            <li>{invoiceDue}</li>
            {/* <li>{orderNumber}</li> */}
          </ul>
        </div>
        <div className="total-container">
          <p>Total:</p>
          <p>€ {invoiceTotal}</p>
        </div>
      </div>
    </section>
  );
};

export default CustDetails;
