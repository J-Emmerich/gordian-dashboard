import React from "react";
import styled from "styled-components";

const AddTaskForm = ({ handleContent, saveTask, newTaskContent, cardId }) => {
  return (
    <form onSubmit={(event) => saveTask(event, cardId)}>
      <input type="text" value={newTaskContent} onChange={handleContent} />
    </form>
  );
};

export default AddTaskForm;
