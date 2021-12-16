import React, { useState, useEffect } from "react";
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
  handleSubmit,
  removeArticle,
  addAnotherArticle,
  invoice,
  closeModal
}) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    if (dayjs(date).isValid()) {
      const UTCdate = dayjs(date).utc(true).format();
      const event = {
        target: {
          name: "invoiceDate",
          value: UTCdate
        }
      };
      handleChange(event);
    }
  };
  return (
    <div>
      <Form>
        <Title>
          <h2>
            Factura n# <span>{invoice.invoiceNumber}</span>
          </h2>
        </Title>
        <hr />
        <Header>
          <fieldset>
            <StyledTextField
              onChange={handleChange}
              value={invoice.clientName}
              id="clientName"
              name="clientName"
              type="text"
              placeholder="Nombre del cliente:"
              variant="outlined"
              margin="none"
            />

            <StyledTextField
              onChange={handleChange}
              value={invoice.invoiceNumber}
              name="invoiceNumber"
              id="invoiceNumber"
              type="text"
              placeholder="Número de la factura"
              variant="outlined"
            />
            <StyledTextField
              onChange={handleChange}
              value={invoice.orderNumber}
              name="orderNumber"
              type="text"
              placeholder="Número del pedido"
              variant="outlined"
            />
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
        <StyledTextField
          onChange={handleChange}
          value={invoice.invoiceTotal}
          name="invoiceTotal"
          type="number"
          placeholder="Total factura"
          variant="outlined"
        />
        <StyledTextField
          onChange={handleChange}
          value={invoice.invoiceSubTotal}
          name="invoiceSubTotal"
          type="number"
          placeholder="Base Imponible"
          variant="outlined"
        />

        <StyledTextField
          onChange={handleChange}
          value={invoice.invoiceTax}
          name="invoiceTax"
          type="number"
          placeholder=" Importe del IVA"
          variant="outlined"
        />
        <hr />
        <StyledButton
          variant="contained"
          color="primary"
          onClick={handleSubmit}
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
