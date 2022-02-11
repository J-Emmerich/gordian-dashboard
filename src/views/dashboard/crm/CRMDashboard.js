import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import services from "../../../services/crm";
import { v4 as uuid } from "uuid";
import styled from "styled-components";

import CRMTable from "./components/CRMTable";
import AddClient from "./components/CRMForm";

const modalStyle = {
  backgroundColor: "white",
  position: "absolute",
  width: "50%",
  height: "70%",
  left: "20%",
  top: "15%",
  overflowY: "auto"
};

let newCustomer = {
  name: "",
  estadoContrato: "No Firmado",
  modeloContrato: "12 + IVA"
};

let pet = {
  petType: "",
  petName: "",
  petId: ""
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

const CRMDashboard = ({ token, user }) => {
  // Modal Inputs State
  const [customer, setCustomer] = useState(newCustomer);
  const [customerSaved, setCustomerSaved] = useState(false);
  // Invoice List State
  const [customerList, setCustomerList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);


  useEffect(() => {
    callGetCustomers();
  }, [customerSaved]);

  async function callGetCustomers() {
    
    try {
      const customers = await services.getCustomers(token);
      if(customers && customers?.length !== undefined){
        setCustomerList(customers);
      }
    }
  catch(error) {
    setCustomerList([])
    console.log(error)
  }
  }
  const resetDashboardState = () => {
    setOpenModal(false);
    setIsEditing(false);
    setCustomerSaved(!customerSaved);
    setCustomer(newCustomer);

  };


  // Save the articles list to the current customer
  const handleSubmit = async (customerToSave, event) => {
    event.preventDefault();
    await services.saveCustomer(token, customerToSave);
    setCustomerSaved(!customerSaved);
    resetDashboardState();
  };
  // End of customer Handlers

  // Editing customer
  const editCustomer = (customerReceived) => {
    setCustomer(customerReceived);
    setIsEditing(true);
    setOpenModal(true);
  };

  const handleEdit = async (customerToSave, e) => {
    e.preventDefault();
    await services.editCustomer(token, customerToSave);
    setCustomerSaved(!customerSaved);
    resetDashboardState();
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
            onClick={() => setOpenModal(true)}
          >
            Nuevo Cliente
          </Button>
        </DashboardHeader>
        <Content>{customerList ? callTable() : null}</Content>
        <Modal open={openModal} onClose={() => resetDashboardState()}>
          <div style={modalStyle}>
            <AddClient
              submitCRMForm={isEditing ? handleEdit : handleSubmit}
              customer={customer}
              isEditing={isEditing}
              closeModal={() => resetDashboardState()}
            />
          </div>
        </Modal>
      </div>
    </Dashboard>
  );
};

export default CRMDashboard;
