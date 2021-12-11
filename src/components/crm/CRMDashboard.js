import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import services from "../../services/crm";
import { v4 as uuid } from "uuid";
import styled from "styled-components";

import CRMTable from "./CRMTable";
import AddClient from "./AddClient";

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

const CRMDashboard = ({ token, user, selectedProject }) => {
  // Modal Inputs State
  const [customer, setCustomer] = useState(newCustomer);
  const [pets, setPets] = useState([pet]);
  const [petList, setPetList] = useState([]);
  const [customerSaved, setCustomerSaved] = useState(false);
  // Invoice List State
  const [customerList, setCustomerList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);
console.log(user)
  useEffect(() => {
    setPets(petList);
  }, [petList]);

  useEffect(() => {
    callGetCustomers();
  }, [customerSaved]);

  async function callGetCustomers() {
    const customers = await services.getCustomers(token, selectedProject);
    setCustomerList(customers);
  }
  const resetDashboardState = () => {
    setOpenModal(false);
    setIsEditing(false);
    setCustomerSaved(!customerSaved);
    setCustomer(newCustomer);
    setPets([pet]);
    setPetList([]);
  };

  // Invoice Handlers
  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    const changedInvoice = { ...customer, [name]: value };
    setCustomer(changedInvoice);
  };

  const handlePetChange = (event, id) => {
    let name = event.target.name;
    let value = event.target.value;

    // Find the correct pet to change
    const petToChange = pets.find((pet) => {
      return pet.petId === id;
    });

    const newPet = { ...petToChange, [name]: value };
    // if is the pet you're changing save the new one
    // otherwise keep the old
    setPetList(
      pets.map((pet) => {
        return pet.petId === id ? newPet : pet;
      })
    );
  };

  const addAnotherPet = (event) => {
    event.preventDefault();
    const newId = uuid();
    const newPet = { ...pet, petId: newId };
    setPetList(petList.concat([newPet]));
  };
  const removePet = (event, id) => {
    event.preventDefault();
    setPetList(pets.filter((pet) => pet.petId !== id));
  };

  // Save the articles list to the current customer
  const handleSubmit = async (event) => {
    event.preventDefault();
    const invoiceToSave = { ...customer, pets: pets };
    await services.saveCustomer(token, selectedProject, invoiceToSave);
    setCustomerSaved(!customerSaved);
    resetDashboardState();
  };
  // End of customer Handlers

  // Editing customer
  const editCustomer = (customerReceived) => {
    setCustomer(customerReceived);
    setPetList(customerReceived.pets);
    setIsEditing(true);
    setOpenModal(true);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const customerToSave = { ...customer, pets: pets };
    await services.editCustomer(token, selectedProject, customerToSave);
    setCustomerSaved(!customerSaved);
    resetDashboardState();
  };

  const handlePdf = async (id) => {
    if (window.confirm("do you want to save it?")) {
      await services.saveToPdf(token, selectedProject, id);
    } else {
      console.log("so bad!");
    }
  };

  const deleteCustomer = async (id) => {
    if (window.confirm("Do you really want to delete the file?")) {
      await services.deleteCustomer(token, selectedProject, id);
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
              handleChange={handleChange}
              petList={petList}
              handlePetChange={handlePetChange}
              handleSubmit={isEditing ? handleEdit : handleSubmit}
              removePet={removePet}
              addPet={addAnotherPet}
              customer={customer}
              closeModal={() => resetDashboardState()}
            />
          </div>
        </Modal>
      </div>
    </Dashboard>
  );
};

export default CRMDashboard;
