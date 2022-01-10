import React, { useState, useEffect } from "react";
import {useForm, Controller} from "react-hook-form";
import Button from "@material-ui/core/Button";
import ArticleInput from "./ArticleInput";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import DayJsUtils from "@date-io/dayjs";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

dayjs.extend(utc);



const Form = styled.form`
  display: flex;
  flex-flow: column wrap;
  margin: 0px 10px;
  & fieldset {
    border: solid 0 black;
  }
  & input[type="text"],
  input[type="number"] {
    background-color: #f3f3f3;
    border: none;
  }
`;
const Title = styled.div`
  align-self: center;
`;
const Header = styled.div`
  display: flex;
  flex-flow: column wrap;
  & fieldset {
    display: flex;
    flex-flow: column wrap;
    justify-content: space-around;
  }
  & div {
    display: flex;
    margin: 5px 10px 5px 10px;
    flex-grow: 1;
  }
`;

const StyledButton = styled(Button)`
  && {
    margin: 5px 0px;
  }
`;

const StyledTextField = styled(TextField)`
  margin: 0px 20px;
  & input,
  textarea,
  select,
  option {
    padding: 20px;
    background-color: #f3f3f3;
  }
`;

const StyledDate = styled(KeyboardDatePicker)`
  & input {
    padding: 20px;
  }
`;
const ModalForm = ({
  handleChange,
  articlesList,
  handleArticleChange,
  onSubmit,
  isEditing,
  removeArticle,
  addAnotherArticle,
  invoice,
  closeModal
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
const {control, handleSubmit, reset, setValue} = useForm({defaultValues:{}});

useEffect(()=>{
  if(isEditing){
    reset({
      clientName: invoice.clientName,
      invoiceNumber: invoice.invoiceNumber,
      invoiceDate: invoice.invoiceDate,
      orderNumber: invoice.orderNumber || "",
      invoiceTotal: invoice.invoiceTotal,
      invoiceSubTotal: invoice.invoiceSubTotal,
      invoiceTax: invoice.invoiceTax,
      _id: invoice._id,
      projectId: invoice.projectId,
      __v: invoice.__v
    }, {keepDefaultValues: true})
  }
  setSelectedDate(invoice.invoiceDate);
},[])

  const handleDateChange = (date) => {
    if (dayjs(date).isValid()) {
      const UTCdate = dayjs(date).utc(true).format();
      const event = {
        target: {
          name: "invoiceDate",
          value: UTCdate
        }
      };
      setSelectedDate(date);
      handleChange(event);
    }
  };
  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>
          <h2>
            Factura n# <span>{invoice.invoiceNumber}</span>
          </h2>
        </Title>
        <hr />
        <Header>
          <fieldset>
            <Controller 
            name="clientName"
            control={control}
            rules={{required: "Campo requerido"}}
            render={({field, fieldState: {error}})=><StyledTextField label="Nombre del cliente" variant="outlined"
              margin="none" {...field} error={!!error} helperText={error? error.message : null} ></StyledTextField>}
            >
            </Controller>
            <Controller
            name="invoiceNumber"
            control={control}
            rules={{required: "Campo requerido"}}
            render={({field, fieldState:{error}})=><StyledTextField label="Numero de la factura" variant="outlined" {...field} error={!!error} helperText={error? error.message : null}></StyledTextField>}
            >
            </Controller>
          <Controller
          name="orderNumber"
          control={control}
          render={({field, fieldState:{error}})=><StyledTextField {...field} label="Número del pedido" variant="outlined" error={!!error} helperText={error ? error.message : null} ></StyledTextField>}
          >

          </Controller>
           
          </fieldset>
          <hr />
          <div>
            <MuiPickersUtilsProvider utils={DayJsUtils}>
              <StyledDate
                autoOk
                inputVariant="standard"
                variant="inline"
                format="DD/MM/YYYY"
                margin="normal"
                id="date-picker-inline"
                placeholder="Fecha de la Factura"
                value={selectedDate}
                onChange={(date) => handleDateChange(date)}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
                name="invoiceDate"
              />
            </MuiPickersUtilsProvider>
          </div>
        </Header>

        <Title>
          <h2>Itens </h2>
        </Title>
        <hr />
        <section>
          {articlesList.map((article) => {
            return (
              <ArticleInput
                key={article.articleId}
                id={article.articleId}
                article={article}
                removeArticle={removeArticle}
                onChange={handleArticleChange}
              />
            );
          })}
        </section>
        <Button variant="contained" color="primary" onClick={addAnotherArticle}>
          Añadir Artículo
        </Button>

        <Title>
          <h2>Total</h2>
        </Title>
        <hr />
        <Controller
        name="invoiceTotal"
        control={control}
        rules={{required: "campo requerido"}}
        render={({field, fieldState:{error}})=><StyledTextField type="number" label="Total Factura" variant="outlined" {...field} error={!!error} helperText={error? error.message : null}></StyledTextField>}
        >
        </Controller>
        
<Controller
name="invoiceSubTotal"
control={control}
rules={{required: "campo requerido"}}
        render={({field, fieldState:{error}})=><StyledTextField type="number" label="Base Imponible" variant="outlined" {...field} error={!!error} helperText={error? error.message : null}></StyledTextField>}
        
></Controller>
<Controller
name="invoiceTax"
control={control}
rules={{required: "campo requerido"}}
        render={({field, fieldState:{error}})=><StyledTextField type="number" label="Importe del IVA" variant="outlined" {...field} error={!!error} helperText={error? error.message : null}></StyledTextField>}
        
></Controller>

      
        <hr />
        <StyledButton
          variant="contained"
          color="primary"
          type="submit"
        >
          Guardar Factura
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
