import React from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
const CardTitleForm = ({ handleContent, saveTitle, newCardTitle, cardId }) => {
  return (
    <form onSubmit={(event) => saveTitle(event, cardId)}>
      <TextField
        variant="outlined"
        type="text"
        value={newCardTitle}
        onChange={handleContent}
      />
    </form>
  );
};

export default CardTitleForm;
