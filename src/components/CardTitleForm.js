import React from "react";
import styled from "styled-components";

const CardTitleForm = ({ handleContent, saveTitle, newCardTitle, cardId }) => {
  return (
    <form onSubmit={(event) => saveTitle(event, cardId)}>
      <input type="text" value={newCardTitle} onChange={handleContent} />
    </form>
  );
};

export default CardTitleForm;
