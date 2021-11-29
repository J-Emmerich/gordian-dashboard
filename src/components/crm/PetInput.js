import React from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  & button {
    margin-left: 20px;
  }
`;

const PetInput = ({ onChange, pet, removePet }) => {
  return (
    <div className="article-input" id={pet.petId}>
      <FlexContainer>
        <label>Pet Name:</label>
        <input
          onChange={(e) => onChange(e, pet.petId)}
          value={pet.petName}
          name="petName"
          type="text"
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={(e) => removePet(e, pet.petId)}
        >
          Delete Pet
        </Button>
      </FlexContainer>
      <FlexContainer>
        <label>Pet:</label>
        <input
          onChange={(e) => onChange(e, pet.petId)}
          value={pet.petType}
          name="petType"
          type="text"
        />
        <label>Comentario:</label>
        <input
          onChange={(e) => onChange(e, pet.petId)}
          value={pet.comment}
          name="comment"
          type="text"
        />
      </FlexContainer>
    </div>
  );
};

export default PetInput;
