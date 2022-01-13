import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import services from "../../services/bugtracker";
import styled from "styled-components";

// Components
import BugtrackerTable from "./BugtrackerTable";
import BugtrackerForm from "./BugtrackerForm";

const modalStyle = {
  backgroundColor: "white",
  position: "absolute",
  width: "50%",
  height: "70%",
  left: "20%",
  top: "15%",
  overflowY: "auto"
};

let newBug = {
  descripcion: "",
  estadoBug: "Abierto",
  severidad: "Poca"
};

let comment = {
  contenido: "",
  commentId: ""
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

const BugTrackerDashboard = ({ token }) => {
  // Modal Inputs State
  const [bug, setBug] = useState(newBug);
  const [customerSaved, setCustomerSaved] = useState(false);
  // Invoice List State
  const [bugList, setBugList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  

  useEffect(() => {
    callGetBugs();
  }, [customerSaved]);

  async function callGetBugs() {
    const bugs = await services.getBugs(token);

    setBugList(bugs);
  }
  const resetDashboardState = () => {
    setOpenModal(false);
    setIsEditing(false);
    setCustomerSaved(!customerSaved);
  };

  // Save the articles list to the current customer
  const handleSubmit = async (bugFormInput, event) => {
    event.preventDefault();
    await services.saveBug(token, bugFormInput);
    setCustomerSaved(!customerSaved);
    resetDashboardState();
  };

  // Editing customer
  const editCustomer = (bugReceivedFromTable) => {
    setBug(bugReceivedFromTable);
    setIsEditing(true);
    setOpenModal(true);
  };

  const handleEdit = async (bugFormInput, event) => {
    event.preventDefault();
    await services.editBug(token, bugFormInput);
    setCustomerSaved(!customerSaved);
    resetDashboardState();
  };

  const deleteCustomer = async (id) => {
    if (window.confirm("Do you really want to delete the file?")) {
      await services.deleteBug(token, id);
      await callGetBugs();
      setCustomerSaved(!customerSaved);
      resetDashboardState();
    } else {
      console.log("so bad!");
    }
  };

  const callTable = () => {
    return (
      <BugtrackerTable
        data={bugList}
        handleClick={editCustomer}
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
            Nuevo Bug
          </Button>
        </DashboardHeader>
        <Content>{bugList ? callTable() : null}</Content>
        <Modal open={openModal} onClose={() => resetDashboardState()}>
          <div style={modalStyle}>
            <BugtrackerForm
              isEditing={isEditing}
              submitBugForm={isEditing ? handleEdit : handleSubmit}
              bug={bug}
              closeModal={() => resetDashboardState()}
            />
          </div>
        </Modal>
      </div>
    </Dashboard>
  );
};

export default BugTrackerDashboard;
