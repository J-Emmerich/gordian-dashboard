import React from "react";
import Button from "@material-ui/core/Button";
import ArticleInput from "./ArticleInput";
import styled from "styled-components";

const datePicker = {
  padding: 0,
  margin: 0,
  fontSize: 12
};

const ModalForm = ({
  handleChange,
  articlesList,
  handleArticleChange,
  handleSubmit,
  removeArticle,
  addAnotherArticle,
  invoice
}) => {
  return (
    <div>
      <form>
        <fieldset>
          <h2> Customer details</h2>
          <label>
            Client Name :
            <input
              onChange={handleChange}
              value={invoice.clientName}
              name="clientName"
              type="text"
            />
          </label>
        </fieldset>

        <fieldset>
          <h2>Invoice details</h2>
          <label>
            Invoice Number:
            <input
              onChange={handleChange}
              value={invoice.invoiceNumber}
              name="invoiceNumber"
              type="text"
            />
          </label>
          <label>
            Invoice Date:
            <input
              onChange={handleChange}
              value={invoice.invoiceDate}
              name="invoiceDate"
              type="date"
              style={datePicker}
            />
          </label>

          <label>
            Order Number:
            <input
              onChange={handleChange}
              value={invoice.orderNumber}
              name="orderNumber"
              type="text"
            />
          </label>
        </fieldset>

        <fieldset>
          <div>
            <h2>Articles </h2>
            <Button
              variant="contained"
              color="primary"
              onClick={addAnotherArticle}
            >
              Add Another Article
            </Button>
          </div>
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
        </fieldset>

        <fieldset>
          <h2>Invoice total</h2>
          <label>
            Invoice total :
            <input
              onChange={handleChange}
              value={invoice.invoiceTotal}
              name="invoiceTotal"
              type="number"
            />
          </label>
          <label>
            Invoice Subtotal :
            <input
              onChange={handleChange}
              value={invoice.invoiceSubTotal}
              name="invoiceSubTotal"
              type="number"
            />
          </label>
          <label>
            Invoice Tax :
            <input
              onChange={handleChange}
              value={invoice.invoiceTax}
              name="invoiceTax"
              type="number"
            />
          </label>
        </fieldset>

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save Invoice
        </Button>
      </form>
    </div>
  );
};

export default ModalForm;
