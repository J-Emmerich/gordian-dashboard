import React from "react";
import Button from "@material-ui/core/Button";
import PetInput from "./PetInput";
import styled from "styled-components";

const datePicker = {
  padding: 5,
  margin: 5,
  fontSize: 12
};

const Form = styled.form`
  & fieldset {
    border: solid 0 black;
  }
  & input[type="text"] {
    width: 50%;
  }
  & label {
    display: flex;
    align-content: center;
    align-items: center;
    margin: 5px;
  }
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
        <fieldset>
          <h2> Customer details</h2>
          <label>
            Client Name:
            <input
              onChange={handleChange}
              value={customer.name}
              name="name"
              type="text"
            />
          </label>
          <label>
            Modelo Contrato:
            <select onChange={handleChange} name="modeloContrato">
              <option value="ivaIncluido">12</option>
              <option value="ivaNoIncluido" selected>
                12 + IVA
              </option>
            </select>
          </label>
          <label>
            Estado del Contrato:
            <select onChange={handleChange} name="estadoContrato">
              <option value="firmado">Firmado los dos</option>
              <option value="firmadoPet">Firmado Pet</option>
              <option value="firmadoCliente">Firmado Cliente </option>
              <option value="noFirmado" selected>
                No Firmado
              </option>
            </select>
          </label>
        </fieldset>

        <fieldset>
          <div>
            <h2>Pets </h2>
            <Button variant="contained" color="primary" onClick={addPet}>
              Add Pet
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
          Save Invoice
        </Button>
      </Form>
    </div>
  );
};

export default ModalForm;
