import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import services from "../../services/invoice";
import styled from "styled-components";
import InvoiceForm from "./InvoiceForm";
import InvoiceTable from "./InvoiceTable";

const modalStyle = {
  backgroundColor: "white",
  position: "absolute",
  width: "50%",
  height: "70%",
  left: "20%",
  top: "15%",
  overflowY: "auto"
};

let newInvoice = {
  invoiceNumber: "",
  invoiceDate: "",
  orderNumber: "",
  invoiceTotal: "",
  invoiceSubTotal: "",
  invoiceTax: "",
  clientName: "",
  articles: ""
};


const Dashboard = styled.section`
  padding-top: 20px;
`;
const DashboardHeader = styled.div`
  display: flex;
  justify-content: center;
`;

const Content = styled.section`
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 20px;
`;

const InvoiceDashboard = ({ token }) => {
  // Modal Inputs State
  const [invoice, setInvoice] = useState(newInvoice);
  const [invoiceSaved, setInvoiceSaved] = useState(false);
  // Invoice List State
  const [invoiceList, setInvoiceList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);


  useEffect(() => {
    async function callGetInvoices() {
      const invoices = await services.getInvoices(token);
      setInvoiceList(invoices);
    }

    callGetInvoices();
  }, [invoiceSaved]);

  const resetDashboardState = () => {
    setOpenModal(false);
    setIsEditing(false);
    setInvoice(newInvoice);
  };

  // Save the articles list to the current invoice
  const handleSubmit = async (filledInvoice, event) => {
    event.preventDefault();
    await services.saveInvoice(token, filledInvoice);
    setInvoiceSaved(!invoiceSaved);
    resetDashboardState();
  };
  // End of invoice Handlers

  // Editing invoice
  const editInvoice = (invoiceReceived) => {
    setInvoice(invoiceReceived);
    setIsEditing(true);
    setOpenModal(true);
  };

  const handleEdit = async (filledInvoice, event) => {
    event.preventDefault();
    await services.editInvoice(token, filledInvoice);
    setInvoiceSaved(!invoiceSaved);
    resetDashboardState();
  };

  const handlePdf = async (id) => {
    if (window.confirm("do you want to save it?")) {
      await services.saveToPdf(token, id);
    } else {
      console.log("so bad!");
    }
  };

  const deleteInvoice = async (id) => {
    if (window.confirm("Do you really want to delete the file?")) {
      await services.deleteInvoice(token, id);
      setInvoiceSaved(!invoiceSaved);
      resetDashboardState();
    } else {
      console.log("so bad!");
    }
  };

  return (
    <Dashboard>
      <div>
        <DashboardHeader>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenModal(true)}
          >
            Nueva Factura
          </Button>
        </DashboardHeader>
        <Content>
          {invoiceList ? (
            <InvoiceTable
              data={invoiceList}
              handleClick={editInvoice}
              saveToPdf={handlePdf}
              deleteInvoice={deleteInvoice}
            />
          ) : null}
        </Content>
        <Modal open={openModal} onClose={() => resetDashboardState()}>
          <div style={modalStyle}>
            <InvoiceForm
              onSubmit={isEditing ? handleEdit : handleSubmit}
              isEditing={isEditing}
              invoice={invoice}
              closeModal={() => resetDashboardState()}
            />
          </div>
        </Modal>
      </div>
    </Dashboard>
  );
};

export default InvoiceDashboard;
