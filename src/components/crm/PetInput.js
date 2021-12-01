import React from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";

const FlexContainer = styled.div`
  display: flex;
  background-color: #eee;
  margin: 10px;
  flex-flow: column wrap;
  & button {
    align-self: center;
    margin-bottom: 10px;
  }
`;
const StyledTextField = styled(TextField)`
  & input,
  textarea {
    padding: 20px;
    background-color: #f3f3f3;
  }
`;

const StyledButton = styled(Button)`
  && {
    margin: 5px 0px;
  }
`;

const PetInput = ({ onChange, pet, removePet }) => {
  return (
    <div className="article-input" id={pet.petId}>
      <FlexContainer>
        <StyledTextField
          onChange={(e) => onChange(e, pet.petId)}
          value={pet.petName}
          name="petName"
          type="text"
          variant="outlined"
          size="medium"
          margin="dense"
          placeholder="Nombre de la Mascota"
        />

        <StyledTextField
          onChange={(e) => onChange(e, pet.petId)}
          value={pet.petType}
          name="petType"
          type="text"
          variant="outlined"
          placeholder="Que mascota es? (gato, perro)"
        />

        <StyledTextField
          multiline
          rows={5}
          onChange={(e) => onChange(e, pet.petId)}
          value={pet.comment}
          name="comment"
          type="text"
          variant="outlined"
          placeholder="Notas sobre la mascota"
        />
        <StyledButton
          variant="contained"
          color="secondary"
          onClick={(e) => removePet(e, pet.petId)}
        >
          Eliminar Mascota
        </StyledButton>
      </FlexContainer>
    </div>
  );
};

export default PetInput;
