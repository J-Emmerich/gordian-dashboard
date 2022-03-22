import React, { useState, useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Button from "@mui/material/Button";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import DateAdapter from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";

dayjs.extend(utc);

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

const StyledDate = styled(MobileDatePicker)`
  & input {
    padding: 20px;
  }
`;
const InvoiceForm = ({ onSubmit, isEditing, invoice }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();
console.log(invoice, "on form")
  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {}
  });
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "articles"
  });
  useEffect(() => {
    if (isEditing) {
      reset(
        {
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
        },
        { keepDefaultValues: true }
      );
      replace(invoice.articles);
    }
    setSelectedDate(invoice?.invoiceDate);
  }, []);

  const handleCancel = () => {
    navigate("../facturas", { replace: true });
  };

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
    }
  };
  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>
          <h2>
            Factura n# <span>{invoice?.invoiceNumber}</span>
          </h2>
        </Title>
        <hr />
        <Header>
          <fieldset>
            <Controller
              name="clientName"
              control={control}
              rules={{ required: "Campo requerido" }}
              render={({ field, fieldState: { error } }) => (
                <StyledTextField
                  label="Nombre del cliente"
                  variant="outlined"
                  margin="none"
                  {...field}
                  error={!!error}
                  helperText={error ? error.message : null}
                ></StyledTextField>
              )}
            ></Controller>
            <Controller
              name="invoiceNumber"
              control={control}
              rules={{ required: "Campo requerido" }}
              render={({ field, fieldState: { error } }) => (
                <StyledTextField
                  label="Numero de la factura"
                  variant="outlined"
                  {...field}
                  error={!!error}
                  helperText={error ? error.message : null}
                ></StyledTextField>
              )}
            ></Controller>
            <Controller
              name="orderNumber"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <StyledTextField
                  {...field}
                  label="Número del pedido"
                  variant="outlined"
                  error={!!error}
                  helperText={error ? error.message : null}
                ></StyledTextField>
              )}
            ></Controller>
          </fieldset>
          <hr />
          <div>
            <LocalizationProvider dateAdapter={DateAdapter}>
              <StyledDate
                autoOk
                inputVariant="standard"
                variant="inline"
                format="DD/MM/YYYY"
                margin="normal"
                id="date-picker-inline"
                placeholder="Fecha de la Factura"
                value={selectedDate ? selectedDate : dayjs.utc()}
                renderInput={(params) => <TextField {...params} />}
                onChange={(date) => handleDateChange(date)}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
                name="invoiceDate"
              />
            </LocalizationProvider>
          </div>
        </Header>

        <Title>
          <h2>Itens </h2>
        </Title>
        <hr />
        <section>
          {fields.map((item, index) => (
            <FlexContainer key={item.id}>
              <Controller
                name={`articles[${index}].articleName`}
                control={control}
                rules={{ required: "este campo es requerido" }}
                render={({ field, fieldState: { error } }) => (
                  <StyledTextField
                    helperText={error ? error.message : null}
                    error={!!error}
                    label="Artículo"
                    variant="outlined"
                    {...field}
                  ></StyledTextField>
                )}
              ></Controller>
              <Controller
                name={`articles[${index}].pricePerUnit`}
                control={control}
                rules={{ required: "este campo es requerido" }}
                render={({ field, fieldState: { error } }) => (
                  <StyledTextField
                    type="number"
                    helperText={error ? error.message : null}
                    error={!!error}
                    label="Precio por unidad"
                    variant="outlined"
                    {...field}
                  ></StyledTextField>
                )}
              ></Controller>
              <Controller
                name={`articles[${index}].quantity`}
                control={control}
                rules={{ required: "este campo es requerido" }}
                render={({ field, fieldState: { error } }) => (
                  <StyledTextField
                    type="number"
                    helperText={error ? error.message : null}
                    error={!!error}
                    label="Cuantidad"
                    variant="outlined"
                    {...field}
                  ></StyledTextField>
                )}
              ></Controller>
              <Controller
                name={`articles[${index}].vat`}
                control={control}
                rules={{ required: "este campo es requerido" }}
                render={({ field, fieldState: { error } }) => (
                  <StyledTextField
                    type="number"
                    helperText={error ? error.message : null}
                    error={!!error}
                    label="IVA"
                    variant="outlined"
                    {...field}
                  ></StyledTextField>
                )}
              ></Controller>
              <Controller
                name={`articles[${index}].totalPrice`}
                control={control}
                rules={{ required: "este campo es requerido" }}
                render={({ field, fieldState: { error } }) => (
                  <StyledTextField
                    type="number"
                    helperText={error ? error.message : null}
                    error={!!error}
                    label="Precio Total"
                    variant="outlined"
                    {...field}
                  ></StyledTextField>
                )}
              ></Controller>

              <Button
                variant="contained"
                color="secondary"
                onClick={() => remove(index)}
              >
                Eliminar artículo
              </Button>
            </FlexContainer>
          ))}
        </section>

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            console.log("click");
            append({
              articleName: "",
              pricePerUnit: 0,
              quantity: 0,
              vat: 21,
              totalPrice: 0
            });
          }}
        >
          Añadir Artículo
        </Button>

        <Title>
          <h2>Total</h2>
        </Title>
        <hr />
        <Controller
          name="invoiceTotal"
          control={control}
          rules={{ required: "campo requerido" }}
          render={({ field, fieldState: { error } }) => (
            <StyledTextField
              type="number"
              label="Total Factura"
              variant="outlined"
              {...field}
              error={!!error}
              helperText={error ? error.message : null}
            ></StyledTextField>
          )}
        ></Controller>

        <Controller
          name="invoiceSubTotal"
          control={control}
          rules={{ required: "campo requerido" }}
          render={({ field, fieldState: { error } }) => (
            <StyledTextField
              type="number"
              label="Base Imponible"
              variant="outlined"
              {...field}
              error={!!error}
              helperText={error ? error.message : null}
            ></StyledTextField>
          )}
        ></Controller>
        <Controller
          name="invoiceTax"
          control={control}
          rules={{ required: "campo requerido" }}
          render={({ field, fieldState: { error } }) => (
            <StyledTextField
              type="number"
              label="Importe del IVA"
              variant="outlined"
              {...field}
              error={!!error}
              helperText={error ? error.message : null}
            ></StyledTextField>
          )}
        ></Controller>

        <hr />
        <StyledButton variant="contained" color="primary" type="submit">
          Guardar Factura
        </StyledButton>
        <StyledButton
          variant="contained"
          color="secondary"
          onClick={handleCancel}
        >
          Cancelar
        </StyledButton>
      </Form>
    </div>
  );
};

export default InvoiceForm;
