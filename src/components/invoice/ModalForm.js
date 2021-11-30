import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import ArticleInput from "./ArticleInput";
import styled from "styled-components";
import "dayjs";
import DayJsUtils from "@date-io/dayjs";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

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
    margin: 10px;
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
    console.log(typeof date);
    setSelectedDate(date);
    if (date) {
      const dateToSave = date.format("DD/MM/YYYY");
      const event = {
        target: {
          name: "invoiceDate",
          value: dateToSave
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
            <input
              onChange={handleChange}
              value={invoice.clientName}
              id="clientName"
              name="clientName"
              type="text"
              placeholder="Nombre del cliente:"
            />

            <input
              onChange={handleChange}
              value={invoice.invoiceNumber}
              name="invoiceNumber"
              id="invoiceNumber"
              type="text"
              placeholder="Número de la factura"
            />
            <input
              onChange={handleChange}
              value={invoice.orderNumber}
              name="orderNumber"
              type="text"
              placeholder="Número del pedido"
            />
          </fieldset>
          <hr />
          <div>
            <MuiPickersUtilsProvider utils={DayJsUtils}>
              <KeyboardDatePicker
                autoOk
                inputVariant="standard"
                variant="inline"
                format="DD/MM/YYYY"
                margin="dense"
                id="date-picker-inline"
                placeholder="Fecha de la Factura"
                value={selectedDate}
                onChange={handleDateChange}
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

        <input
          onChange={handleChange}
          value={invoice.invoiceTotal}
          name="invoiceTotal"
          type="number"
          placeholder="Total factura"
        />
        <input
          onChange={handleChange}
          value={invoice.invoiceSubTotal}
          name="invoiceSubTotal"
          type="number"
          placeholder="Base Imponible"
        />

        <input
          onChange={handleChange}
          value={invoice.invoiceTax}
          name="invoiceTax"
          type="number"
          placeholder=" Importe del IVA"
        />

        <StyledButton
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Guardar Factura
        </StyledButton>
        <StyledButton variant="contained" color="disabled" onClick={closeModal}>
          Cancelar
        </StyledButton>
      </Form>
    </div>
  );
};

export default ModalForm;
