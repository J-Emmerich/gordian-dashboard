import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CommentInput from "./CommentInput";
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
const StyledButton = styled(Button)`
  && {
    margin: 5px 0px;
  }
`;
const Title = styled.div`
  align-self: center;
`;
const ModalForm = ({
  handleChange,
  commentList,
  handleCommentChange,
  handleSubmit,
  addComment,
  removeComment,
  bug,
  closeModal
}) => {
  const [hiddenSelect, setHiddenSelect] = useState("default");
  return (
    <div>
      <Form>
        <Title>
          <h2> Reportar Bug </h2>
        </Title>
        <hr />
        <StyledTextField
          onChange={handleChange}
          value={bug.descripcion}
          name="descripcion"
          type="text"
          placeholder="Descripción del Bug"
          variant="outlined"
        />

        <StyledSelect
          defaultValue={hiddenSelect}
          onChange={handleChange}
          name="estadoBug"
          variant="outlined"
        >
          <MenuItem value={hiddenSelect} disabled>
            Estado del Bug
          </MenuItem>
          <MenuItem value="Abierto">Abierto</MenuItem>
          <MenuItem value="En progresso">En progresso</MenuItem>
          <MenuItem value="Realizando Pruebas">Realizando Pruebas</MenuItem>
          <MenuItem value="OK">OK</MenuItem>
        </StyledSelect>
        <StyledSelect
          defaultValue={hiddenSelect}
          onChange={handleChange}
          name="severidad"
          variant="outlined"
        >
          <MenuItem value={hiddenSelect} disabled>
            Severidad del Bug
          </MenuItem>
          <MenuItem value="Poca">Poca</MenuItem>
          <MenuItem value="Cuando Puedas">Cuando Puedas</MenuItem>
          <MenuItem value="Importante">Importante</MenuItem>
          <MenuItem value="Urgente">Urgente</MenuItem>
        </StyledSelect>
        <hr />
        <Title>
          <h2>Comentarios</h2>
        </Title>
        <hr />
        <section>
          {commentList
            ? commentList.map((comment) => {
                return (
                  <CommentInput
                    key={comment.commentId}
                    id={comment.commentId}
                    comment={comment}
                    onChange={handleCommentChange}
                    removeComment={removeComment}
                  />
                );
              })
            : null}
        </section>
        <StyledButton variant="contained" color="primary" onClick={addComment}>
          Añadir Comentario
        </StyledButton>
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
