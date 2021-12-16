import React, { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import Button from "@material-ui/core/Button";
import CommentInput from "./CommentInput";
import styled from "styled-components";

import TextInput from "../form-components/TextInput";
import SelectInput from "../form-components/SelectInput";

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

const StyledButton = styled(Button)`
  && {
    margin: 5px 0px;
  }
`;
const Title = styled.div`
  align-self: center;
`;

const bugStateOptions = [
  { label: "Abierto", value: "Abierto" },
  { label: "En progresso", value: "En progresso" },
  { label: "Realizando Pruebas", value: "Realizando Pruebas" },
  { label: "OK", value: "OK" }
];
const severityOptions = [
  { label: "Poca", value: "Poca" },
  { label: "Cuando Puedas", value: "Cuando Puedas" },
  { label: "Importante", value: "Importante" },
  { label: "Urgente", value: "Urgente" }
];

const submitBugForm = async (event) => {
  event.preventDefault();

  await services.saveBug(token, bugToSave);
};

const BugTrackerForm = ({
  closeModal,
  commentList,
  removeComment,
  addComment,
  handleChange,
  handleCommentChange
}) => {
  const [hiddenSelect, setHiddenSelect] = useState("default");
  const bugSchema = Yup.object().shape({
    descripcion: Yup.string(),
    estadobug: Yup.string().required("Describa el estado del bug"),
    severidad: Yup.string().required("Cual es el grado de severidad?"),
    comments: Yup.array().of(
      Yup.object().shape({
        contenido: Yup.string()
      })
    )
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(bugSchema)
  });

  return (
    <div>
      <FormProvider register={register} control={control}>
        <Form onReset={reset}>
          <Title>
            <h2> Reportar Bug </h2>
          </Title>
          <hr />

          <TextInput
            name="descripcion"
            type="text"
            placeholder="Descripción del Bug"
            handleChange={handleChange}
            control={control}
          />
          <div>{errors.descripcion?.message}</div>
          <SelectInput
            name="estadoBug"
            label="Estado del Bug"
            options={bugStateOptions}
            control={control}
            handleChange={handleChange}
          />
          <SelectInput
            name="severidad"
            label="Severidad"
            options={severityOptions}
            control={control}
            handleChange={handleChange}
          />
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
                      name={comment.commentId}
                      key={comment.commentId}
                      id={comment.commentId}
                      comment={comment}
                      removeComment={removeComment}
                      handleChange={handleChange}
                      {...register(`${comment.commentId}`)}
                    />
                  );
                })
              : null}
          </section>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={addComment}
          >
            Añadir Comentario
          </StyledButton>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={handleSubmit(submitBugForm)}
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
      </FormProvider>
    </div>
  );
};

export default BugTrackerForm;
