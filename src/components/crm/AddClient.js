import React from "react";
import Button from "@material-ui/core/Button";
import PetInput from "./PetInput";
import styled from "styled-components";

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
const ModalForm = ({
  handleChange,
  petList,
  handlePetChange,
  handleSubmit,
  removePet,
  addPet,
  customer
}) => {
  return (
    <div>
      <Form>
        <Title>
          <h2> Detalles del Cliente</h2>
        </Title>
        Client Name:
        <input
          onChange={handleChange}
          value={customer.name}
          name="name"
          type="text"
          placeholder="Nombre del cliente"
        />
        Modelo Contrato:
        <select
          defaultValue="12 IVA Incluído"
          onChange={handleChange}
          name="modeloContrato"
        >
          <option value="12 IVA Incluído">12</option>
          <option value="12 + IVA">12 + IVA</option>
          <option value="20 IVA incluído">20 IVA incluido</option>
        </select>
        Estado del Contrato:
        <select
          defaultValue="Estado del Contrato"
          onChange={handleChange}
          name="estadoContrato"
        >
          {/* // https://reactgo.com/react-select-tag-placeholder/ */}
          <option value="" disabled selected>
            Estado del contrato:{" "}
          </option>
          <option value="Firmado">Firmado por los dos</option>
          <option value="Firmado por Pet Sitter">Firmado por Pet Sitter</option>
          <option value="Firmado por Cliente">Firmado por Cliente</option>
          <option value="No firmado">No Firmado</option>
        </select>
        <fieldset>
          <div>
            <h2>Mascotas</h2>
            <Button variant="contained" color="primary" onClick={addPet}>
              Añadir Mascota
            </Button>
          </div>
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
        </fieldset>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Guardar
        </Button>
      </Form>
    </div>
  );
};

export default ModalForm;
