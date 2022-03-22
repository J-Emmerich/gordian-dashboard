import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import services from "../../../services/invoice";
import styled from "styled-components";

import InvoiceTable from "./components/InvoiceTable";
import { useNavigate, Link } from "react-router-dom";

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

  const [invoiceSaved, setInvoiceSaved] = useState(false);
  // Invoice List State
  const [invoiceList, setInvoiceList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    callGetInvoices();
  }, [invoiceSaved]);

  const callGetInvoices = async () => {
    try {
      const invoices = await services.getInvoices(token);
      if (invoices && invoices?.length !== undefined) {
        setInvoiceList(invoices);
      }
    } catch (error) {
      setInvoiceList([]);
      console.log(error);
    }
  };

  // Editing invoice
  const editInvoice = (invoiceReceived) => {
    navigate("editarcliente", { state: invoiceReceived });
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
    } else {
      console.log("so bad!");
    }
  };
  const callTable = () => {
    return (
      <InvoiceTable
        data={invoiceList}
        handleClick={editInvoice}
        saveToPdf={handlePdf}
        deleteInvoice={deleteInvoice}
      />
    );
  };
  return (
    <Dashboard>
      <div>
        <DashboardHeader>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="anadirnuevo"
          >
            Nueva Factura
          </Button>
        </DashboardHeader>
        <Content>{invoiceList ? callTable() : null}</Content>
      </div>
    </Dashboard>
  );
};

export default InvoiceDashboard;
