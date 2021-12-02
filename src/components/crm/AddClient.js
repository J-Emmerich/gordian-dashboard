import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import PetInput from "./PetInput";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const Form = styled.form`
  display: flex;
  flex-flow: column wrap;
  margin: 0px 10px;
  & fieldset {
    border: solid 0 black;
  }
  & input[type="text"],
  input[type="number"],
  select,
  option {
    background-color: #f3f3f3;
    border: none;
    margin: 10px;
  }
  & select,
  option {
    padding: 10px;
  }
`;
const Title = styled.div`
  align-self: center;
`;

const StyledButton = styled(Button)`
  && {
    margin: 5px 0px;
  }
`;
const StyledTextField = styled(TextField)`
  & input,
  textarea,
  select,
  option,
  root {
    padding: 20px;
    background-color: #f3f3f3;
  }
`;
const StyledSelect = styled(Select)`
  background-color: #f3f3f3;
  margin: 10px;
  & input {
    background-color: #f3f3f3;
  }
`;

const ModalForm = ({
  handleChange,
  petList,
  handlePetChange,
  handleSubmit,
  removePet,
  addPet,
  customer,
  closeModal
}) => {
  const [hiddenSelect, setHiddenSelect] = useState("default");

  return (
    <div>
      <Form>
        <Title>
          <h2> Detalles del Cliente</h2>
        </Title>
        <hr />
        <StyledTextField
          onChange={handleChange}
          value={customer.name}
          name="name"
          type="text"
          variant="outlined"
          placeholder="Nombre del cliente"
        />

        <StyledSelect
          defaultValue={hiddenSelect}
          onChange={handleChange}
          name="modeloContrato"
          variant="outlined"
        >
          <MenuItem value={hiddenSelect} disabled>
            Modelo Contrato
          </MenuItem>
          <MenuItem value="12 IVA Incluído">12</MenuItem>
          <MenuItem value="12 + IVA">12 + IVA</MenuItem>
          <MenuItem value="20 IVA incluído">20 IVA incluido</MenuItem>
        </StyledSelect>

        <StyledSelect
          defaultValue={hiddenSelect}
          onChange={handleChange}
          name="estadoContrato"
          variant="outlined"
        >
          <MenuItem value={hiddenSelect} disabled>
            Estado del contrato{" "}
          </MenuItem>
          <MenuItem value="Firmado">Firmado por los dos</MenuItem>
          <MenuItem value="Firmado por Pet Sitter">
            Firmado por Pet Sitter
          </MenuItem>
          <MenuItem value="Firmado por Cliente">Firmado por Cliente</MenuItem>
          <MenuItem value="No firmado">No Firmado</MenuItem>
        </StyledSelect>

        <Title>
          <h2>Mascotas</h2>
        </Title>
        <hr />

        <section>
          {petList
            ? petList.map((pet) => {
                return (
                  <PetInput
                    key={pet.petId}
                    id={pet.petId}
                    pet={pet}
                    removePet={removePet}
                    onChange={handlePetChange}
                  />
                );
              })
            : null}
        </section>
        <StyledButton variant="contained" color="primary" onClick={addPet}>
          Añadir Mascota
        </StyledButton>
        <hr />
        <StyledButton
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Guardar
        </StyledButton>
        <StyledButton
          variant="contained"
          color="secondary"
          onClick={closeModal}
        >
          Cancelar
        </StyledButton>
      </Form>
    </div>
  );
};

export default ModalForm;
