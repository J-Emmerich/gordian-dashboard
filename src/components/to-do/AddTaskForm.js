import React from "react";
import TextField from "@material-ui/core/TextField";
const AddTaskForm = ({ handleContent, saveTask, newTaskContent, cardId }) => {
  return (
    <form onSubmit={(event) => saveTask(event, cardId)}>
      <TextField
        variant="outlined"
        type="text"
        value={newTaskContent}
        onChange={handleContent}
      />
    </form>
  );
};

export default AddTaskForm;
