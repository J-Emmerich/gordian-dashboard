import React from "react";
import Button from "@material-ui/core/Button";
import CommentInput from "./CommentInput";
import styled from "styled-components";

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
  commentList,
  handleCommentChange,
  handleSubmit,
  addComment,
  removeComment,
  bug
}) => {
  return (
    <div>
      <Form>
        <fieldset>
          <label>
            Descripcion:
            <input
              onChange={handleChange}
              value={bug.descripcion}
              name="descripcion"
              type="text"
            />
          </label>

          <label>
            Estado:
            <select
              defaultValue="Abierto"
              onChange={handleChange}
              name="estadoBug"
            >
              <option value="Abierto">Abierto</option>
              <option value="En progresso">En progresso</option>
              <option value="Realizando Pruebas">Realizando Pruebas</option>
              <option value="OK">OK</option>
            </select>
          </label>
          <label>
            Severidad:
            <select
              defaultValue="Poca"
              onChange={handleChange}
              name="severidad"
            >
              <option value="Poca">Poca</option>
              <option value="Cuando Puedas">Cuando Puedas</option>
              <option value="Importante">Importante</option>
              <option value="Urgente">Urgente</option>
            </select>
          </label>
        </fieldset>

        <fieldset>
          <div>
            <h2>Comentarios</h2>
            <Button variant="contained" color="primary" onClick={addComment}>
              Añadir Comentario
            </Button>
          </div>
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
        </fieldset>

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Guardar
        </Button>
      </Form>
    </div>
  );
};

export default ModalForm;
