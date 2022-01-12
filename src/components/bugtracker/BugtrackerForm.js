import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import {FormControl, FormHelperText} from "@material-ui/core";
import {useForm, Controller, useFieldArray} from "react-hook-form";
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
  isEditing,
  submitBugForm,
  bug,
  closeModal
}) => {
  const [hiddenSelect, setHiddenSelect] = useState("default");
  const {control, handleSubmit, reset} = useForm({defaultValues:{} })
  const {fields, append, remove, replace} = useFieldArray({control, name: "comments"});
 
  useEffect(()=>{
    if(isEditing){
      reset({
        descripcion: bug.descripcion,
        estadoBug: bug.estadoBug,
        severidad: bug.severidad,
        _id: bug._id,
        projectId: bug.projectId,
        __v: bug.__v
      }, {keepDefaultValues: true})
      replace(bug.comments)
    }

  },[])
  return (
    <div>
      <Form onSubmit={handleSubmit(submitBugForm)}>
        <Title>
          <h2> Reportar Bug </h2>
        </Title>
        <hr />
        <Controller
        name="descripcion"
        control={control}
        rules={{required: "Campo requerido"}}
        render={({field, fieldState:{error}})=><StyledTextField {...field} error={!!error} helperText={error? error.message : null} label="Descripción del Bug"
        variant="outlined"
        ></StyledTextField>}
        >
          
        </Controller>
       
       <Controller
       name="estadoBug"
       control={control}
       defaultValue={hiddenSelect}
       rules={{required: "Campo requerido",
    validate: value => value !== "default" || "Tienes que elegir algo"}}
       render={({field, fieldState:{error}})=><FormControl  error={!!error} ><StyledSelect variant="outlined" {...field} >
<MenuItem value={hiddenSelect} disabled>
            Estado del Bug
          </MenuItem>
          <MenuItem value="Abierto">Abierto</MenuItem>
          <MenuItem value="En progresso">En progresso</MenuItem>
          <MenuItem value="Realizando Pruebas">Realizando Pruebas</MenuItem>
          <MenuItem value="OK">OK</MenuItem>
       </StyledSelect>
       <FormHelperText>{error? error.message : null}</FormHelperText>
       </FormControl>}
       >
       </Controller>

      <Controller
      name="severidad"
      control={control}
      defaultValue={hiddenSelect}
      rules={{required: "Campo requerido",
    validate: value => value !== "default" || "Tienes que elegir algo"}}
      render={({field, fieldState:{error}})=><FormControl  error={!!error} ><StyledSelect {...field} variant="outlined" helperText={error? error.message : null}>
 <MenuItem value={hiddenSelect} disabled>
            Severidad del Bug
          </MenuItem>
          <MenuItem value="Poca">Poca</MenuItem>
          <MenuItem value="Cuando Puedas">Cuando Puedas</MenuItem>
          <MenuItem value="Importante">Importante</MenuItem>
          <MenuItem value="Urgente">Urgente</MenuItem>
      </StyledSelect>
      <FormHelperText>{error? error.message: null}</FormHelperText>
      </FormControl>  
    }
      
      >

      </Controller>
     
        <hr />
        <Title>
          <h2>Comentarios</h2>
        </Title>
        <hr />
        <section>

{fields.map((item, index)=>{
  return (
    <FlexContainer key={item.id}>
      <Controller
      name={`comments[${index}].contenido`}
      control={control}
      rules={{required: "Campo requerido"}}
      render={({field, fieldState:{error}})=><StyledTextField error={!!error} helperText={error? error.message : null} {...field} multiline variant="outlined" rows={5}></StyledTextField>}
      >
</Controller>
<StyledButton variant="contained" onClick={()=>remove(index)}>Eliminar</StyledButton>
    </FlexContainer>
  )
})}
          
        </section>
        <StyledButton variant="contained" color="primary" onClick={()=>append({contenido: ""})}>
          Añadir Comentario
        </StyledButton>
        <StyledButton
          variant="contained"
          color="primary"
         type="submit"
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
