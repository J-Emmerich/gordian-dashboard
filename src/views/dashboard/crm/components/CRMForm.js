import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import {useForm, Controller, useFieldArray} from "react-hook-form";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FormControl, FormHelperText } from "@mui/material";
import { useNavigate } from "react-router-dom";
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

const CRMForm = ({
  submitCRMForm,
isEditing,
  customer,
  closeModal
}) => {
  const [hiddenSelect, setHiddenSelect] = useState("default");
  const {control, handleSubmit, reset, setValue} = useForm({defaultValues:{}});
  const {fields, append, remove, replace} = useFieldArray({control, name: 'pets'})
  let navigate = useNavigate();

const handleCancel = () => {
   navigate("../clientes", { replace: true });
}
 
  useEffect(()=>{
    if(isEditing){
      reset({
        name: customer.name,
        modeloContrato: customer.modeloContrato,
        estadoContrato: customer.estadoContrato,
        _id: customer._id,
        projectId: customer.projectId,
        __v: customer.__v
      }, {keepDefaultValues: true})
      replace(customer.pets)
    }

  },[])

  return (
    <div>
      <Form onSubmit={handleSubmit(submitCRMForm)}>
        <Title>
          <h2> Detalles del Cliente</h2>
        </Title>
        <hr />
        <Controller
        name="name"
        control={control}
        rules={{required: "Campo requerido"}}
        render={({field, fieldState: {error}})=><StyledTextField helperText={error? error.message : null} error={!!error} {...field} variant="outlined" label="Nombre del Cliente"></StyledTextField>}>
        </Controller>
        <Controller
        name="modeloContrato"
        defaultValue={hiddenSelect}
        control={control}
        rules={{required: "Campo requerido",
    validate: value => value !== "default" || "Tienes que elegir algo"}}
    render={({field, fieldState:{error}})=><FormControl
      error={!!error}>

    <StyledSelect
      
      {...field}
      variant="outlined"
      >
      <MenuItem value={hiddenSelect} disabled>
        Modelo Contrato
      </MenuItem>
      <MenuItem value="12 IVA Incluído">12</MenuItem>
      <MenuItem value="12 + IVA">12 + IVA</MenuItem>
      <MenuItem value="20 IVA incluído">20 IVA incluido</MenuItem>
    </StyledSelect>
<FormHelperText>{error? error.message : null}</FormHelperText>
    </FormControl>}
    >
        </Controller>
        <Controller
          name="estadoContrato"
        defaultValue={hiddenSelect}
        control={control}
        rules={{required: "Campo requerido",
    validate: value => value !== "default" || "Tienes que elegir algo"}}
    render={({field, fieldState:{error}})=><FormControl
      error={!!error}>

    <StyledSelect
      
      {...field}
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
        <FormHelperText>{error? error.message : null}</FormHelperText>
    </FormControl>}
    >
        </Controller>
        <Title>
          <h2>Mascotas</h2>
        </Title>
        <hr />

        <section>
         {fields.map((item, index)=> {
           return (

             <FlexContainer key={item.id}>
            <Controller name={`pets[${index}].petName`}
            control={control}
            defaultValue=""
            rules={{required: "Campo requerido"}}
            render={({field, fieldState: {error}})=> <StyledTextField
            {...field}
            error={!!error}
            helperText={error? error.message : null}
            variant="outlined"
            size="medium"
            margin="dense"
            label="Nombre de la Mascota"
            ></StyledTextField>
          }></Controller>
 
  <Controller 
  name={`pets[${index}].petType`}
  control={control}
  defaultValue=""
  rules={{required: "Campo requerido"}}
  render={({field, fieldState: {error}})=> 
  <StyledTextField
  {...field}
  error={!!error}
  helperText={error? error.message : null}
        
  variant="outlined"
           label="Que mascota es? (gato, perro)"
           ></StyledTextField>
          }></Controller>
  <Controller 
  name={`pets[${index}].comment`}
  control={control}
  defaultValue=""
  rules={{required: "Campo requerido"}}
  render={({field, fieldState: {error}})=> 
  <StyledTextField
  multiline
  rows={5}
  {...field}
  error={!!error}
  helperText={error? error.message : null}
  variant="outlined"
  label="Notas sobre la mascota"
  ></StyledTextField>
}></Controller>
  <StyledButton
          variant="contained"
          
          onClick={() => remove(index)}
          >
          Eliminar Mascota
        </StyledButton>
           </FlexContainer>
            )
         })}
         </section>
         <StyledButton variant="contained" color="primary" onClick={()=>{
           append({petName: " ", petType: " ", comment: " "})
          }}>
          Añadir Mascota
        </StyledButton>
        <hr />
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
          onClick={isEditing ? closeModal : handleCancel}
        >
          Cancelar
        </StyledButton>
      </Form>
    </div>
  );
};

export default CRMForm;
