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
            <select
              defaultValue="12 IVA Incluído"
              onChange={handleChange}
              name="modeloContrato"
            >
              <option value="12 IVA Incluído">12</option>
              <option value="12 + IVA">12 + IVA</option>
              <option value="20 IVA incluído">20 IVA incluido</option>
            </select>
          </label>
          <label>
            Estado del Contrato:
            <select
              defaultValue="Firmado por Pet Sitter"
              onChange={handleChange}
              name="estadoContrato"
            >
              <option value="Firmado">Firmado por los dos</option>
              <option value="Firmado por Pet Sitter">
                Firmado por Pet Sitter
              </option>
              <option value="Firmado por Cliente">Firmado por Cliente</option>
              <option value="No firmado">No Firmado</option>
            </select>
          </label>
        </fieldset>

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
