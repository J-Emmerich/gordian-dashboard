import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import services from "../../../services/crm";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import CRMTable from "./components/CRMTable";

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

const CRMDashboard = ({ token, user }) => {
  // Modal Inputs State
  const [customerSaved, setCustomerSaved] = useState(false);
  // Invoice List State
  const [customerList, setCustomerList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    callGetCustomers();
  }, [customerSaved]);

  async function callGetCustomers() {
    try {
      const customers = await services.getCustomers(token);
      if (customers && customers?.length !== undefined) {
        setCustomerList(customers);
      }
    } catch (error) {
      setCustomerList([]);
      console.log(error);
    }
  }
  const resetDashboardState = () => {
    setCustomerSaved(!customerSaved);
  };

  // Editing customer
  const editCustomer = (customerReceived) => {
    navigate("editarcliente", { state: customerReceived });
  };

  const handlePdf = async (id) => {
    if (window.confirm("do you want to save it?")) {
      await services.saveToPdf(token, id);
    } else {
      console.log("so bad!");
    }
  };

  const deleteCustomer = async (id) => {
    if (window.confirm("Do you really want to delete the file?")) {
      await services.deleteCustomer(token, id);
      await callGetCustomers();
      setCustomerSaved(!customerSaved);
      resetDashboardState();
    } else {
      console.log("so bad!");
    }
  };

  const callTable = () => {
    return (
      <CRMTable
        data={customerList}
        handleClick={editCustomer}
        saveToPdf={handlePdf}
        deleteCustomer={deleteCustomer}
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
            Nuevo Cliente
          </Button>
        </DashboardHeader>
        <Content>{customerList ? callTable() : null}</Content>
      </div>
    </Dashboard>
  );
};

export default CRMDashboard;
