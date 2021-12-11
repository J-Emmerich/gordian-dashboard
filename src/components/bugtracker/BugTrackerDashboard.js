import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import services from "../../services/bugtracker";
import { v4 as uuid } from "uuid";
import styled from "styled-components";

import BugTable from "./BugTable";
import AddBug from "./AddBug";

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

const BugTrackerDashboard = ({ token, selectedProject }) => {
  // Modal Inputs State
  const [bug, setBug] = useState(newBug);
  const [comments, setPets] = useState([comment]);
  const [commentList, setCommentList] = useState([]);
  const [customerSaved, setCustomerSaved] = useState(false);
  // Invoice List State
  const [bugList, setBugList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setPets(commentList);
  }, [commentList]);

  useEffect(() => {
    callGetCustomers();
  }, [customerSaved]);

  async function callGetCustomers() {
    const bugs = await services.getBugs(token, selectedProject);

    setBugList(bugs);
  }
  const resetDashboardState = () => {
    setOpenModal(false);
    setIsEditing(false);
    setCustomerSaved(!customerSaved);
    setBug(newBug);
    setPets([comment]);
    setCommentList([]);
  };

  // Bug Handlers
  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    const changedBug = { ...bug, [name]: value };
    setBug(changedBug);
  };

  const handleCommentChange = (event, id) => {
    let name = event.target.name;
    let value = event.target.value;

    // Find the correct comment to change
    const petToChange = comments.find((comment) => {
      return comment.commentId === id;
    });

    const newComment = { ...petToChange, [name]: value };
    // if is the comment you're changing save the new one
    // otherwise keep the old
    setCommentList(
      comments.map((comment) => {
        return comment.commentId === id ? newComment : comment;
      })
    );
  };

  const addComment = (event) => {
    event.preventDefault();
    const newId = uuid();
    const newComment = { ...comment, commentId: newId };
    setCommentList(commentList.concat([newComment]));
  };
  const removeComment = (event, id) => {
    event.preventDefault();
    setCommentList(comments.filter((comment) => comment.commentId !== id));
  };

  // Save the articles list to the current customer
  const handleSubmit = async (event) => {
    event.preventDefault();
    const bugToSave = { ...bug, comments: comments };
    await services.saveBug(token, selectedProject, bugToSave);
    setCustomerSaved(!customerSaved);
    resetDashboardState();
  };
  // End of customer Handlers

  // Editing customer
  const editCustomer = (customerReceived) => {
    setBug(customerReceived);
    setCommentList(customerReceived.comments);
    setIsEditing(true);
    setOpenModal(true);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const customerToSave = { ...bug, comments: comments };
    await services.editBug(token, selectedProject, customerToSave);
    setCustomerSaved(!customerSaved);
    resetDashboardState();
  };

  const deleteCustomer = async (id) => {
    if (window.confirm("Do you really want to delete the file?")) {
      await services.deleteBug(token, selectedProject, id);
      await callGetCustomers();
      setCustomerSaved(!customerSaved);
      resetDashboardState();
    } else {
      console.log("so bad!");
    }
  };

  const callTable = () => {
    return (
      <BugTable
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
            <AddBug
              handleChange={handleChange}
              commentList={commentList}
              handleCommentChange={handleCommentChange}
              handleSubmit={isEditing ? handleEdit : handleSubmit}
              removeComment={removeComment}
              addComment={addComment}
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
