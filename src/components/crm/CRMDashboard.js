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
  estadoContrato: "noFirmado",
  modeloContrato: "ivaNoIncluido"
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

const CRMDashboard = () => {
  // Modal Inputs State
  const [customer, setCustomer] = useState(newCustomer);
  const [pets, setPets] = useState([pet]);
  const [petList, setPetList] = useState([]);
  const [customerSaved, setCustomerSaved] = useState(false);
  // Invoice List State
  const [customerList, setCustomerList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setPets(petList);
  }, [petList]);

  useEffect(() => {
    async function callGetCustomers() {
      const customers = await services.getCustomers();
      console.log("this clients returned", customers);
      setCustomerList(customers);
    }

    callGetCustomers();
  }, [customerSaved]);

  const resetDashboardState = () => {
    setOpenModal(false);
    setIsEditing(false);
    setCustomer(newCustomer);
    setPets([pet]);
    setPetList([]);
  };

  // Invoice Handlers
  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    const changedInvoice = { ...customer, [name]: value };
    console.log(changedInvoice);
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
    await services.saveCustomer(invoiceToSave);
    setCustomerSaved(!customerSaved);
    resetDashboardState();
  };
  // End of customer Handlers

  // Editing customer
  const editCustomer = (customerReceived) => {
    console.log("I received this", customerReceived);
    setCustomer(customerReceived);
    setPetList(customerReceived.pets);
    setIsEditing(true);
    setOpenModal(true);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    console.log("is calling to edit");
    const customerToSave = { ...customer, pets: pets };
    console.log(customerToSave, "this is what is saving");
    await services.editCustomer(customerToSave);
    setCustomerSaved(!customerSaved);
    resetDashboardState();
  };

  const handlePdf = async (id) => {
    if (window.confirm("do you want to save it?")) {
      await services.saveToPdf(id);
    } else {
      console.log("so bad!");
    }
  };

  const deleteCustomer = async (id) => {
    if (window.confirm("Do you really want to delete the file?")) {
      await services.deleteCustomer(id);
      setCustomerSaved(!customerSaved);
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
            Nuevo Cliente
          </Button>
        </DashboardHeader>
        <Content>
          {customerList ? (
            <CRMTable
              data={customerList}
              handleClick={editCustomer}
              saveToPdf={handlePdf}
              deleteCustomer={deleteCustomer}
            />
          ) : null}
        </Content>
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
            />
          </div>
        </Modal>
      </div>
    </Dashboard>
  );
};

export default CRMDashboard;
