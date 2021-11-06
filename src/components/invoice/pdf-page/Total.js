import React from "react";

const Total = ({ invoice }) => {
  const { invoiceTotal, invoiceSubTotal, invoiceTax } = invoice;

  return (
    <div className="desglose-container">
      <div className="total-container">
        <p>Total: </p>
        <p>€{invoiceTotal}</p>
      </div>
      <div className="desglose-p">
        {" "}
        <p>Desglose del IVA: </p>
      </div>
      <div className="desglose">
        <p>€{invoiceSubTotal}</p>
        <p>más iva de 21%</p>
        <p>€{invoiceTax}</p>
      </div>
    </div>
  );
};

export default Total;
