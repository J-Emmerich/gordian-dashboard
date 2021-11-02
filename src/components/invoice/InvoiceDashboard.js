import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import ArticleInput from "./ArticleInput";
import saveInvoice from "../../services/invoice";
import { v4 as uuid } from "uuid";

import ModalForm from "./ModalForm";

const modalStyle = {
  backgroundColor: "white",
  position: "absolute",
  width: "50%",
  height: "70%",
  left: "20%",
  top: "15%",
  overflowY: "scroll"
};
let newInvoice = {
  invoiceNumber: "",
  invoiceDate: "",
  orderNumber: "",
  invoiceTotal: "",
  invoiceSubTotal: "",
  invoiceTax: "",
  clientName: "",
  articles: ""
};

let article = {
  articleId: "",
  articleName: "",
  pricePerUnit: "",
  isIvaIncluded: "",
  quantity: "",
  totalPrice: "",
  vat: ""
};

const InvoiceDashboard = () => {
  const [invoice, setInvoice] = useState(newInvoice);
  const [articles, setArticles] = useState([article]);
  const [articlesList, setArticlesList] = useState([]);
  const [invoiceList, setInvoiceList] = useState([]);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    newInvoice = { ...invoice, [name]: value };
    setInvoice(newInvoice);
  };

  const handleArticleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    // Get the random uuid
    const id = event.target.parentNode.parentNode.id;
    // Find the correct article to change
    const articleToChange = articles.find((article) => {
      return article.articleId === id;
    });

    const newArticle = { ...articleToChange, [name]: value };
    // if is the article you're changing save the new one
    // otherwise keep the old
    setArticlesList(
      articles.map((article) => {
        return article.articleId === id ? newArticle : article;
      })
    );
  };

  const addAnotherArticle = (event) => {
    event.preventDefault();
    const newId = uuid();
    const newArticle = { ...article, articleId: newId };
    setArticlesList(articlesList.concat([newArticle]));
  };
  const removeArticle = (event) => {
    event.preventDefault();
    const id = event.target.parentNode.parentNode.id;
    setArticlesList(articles.filter((article) => article.articleId !== id));
  };

  useEffect(() => {
    setArticles(articlesList);
  }, [articlesList]);

  // Save the articles list to the current invoice
  const handleSubmit = async (event) => {
    event.preventDefault();
    const invoiceToSave = { ...invoice, articles: articles };
    saveInvoice(invoiceToSave);
    setOpen(false);
  };

  return (
    <>
      <div>
        <div>This is the dashboard.</div>
        <button onClick={() => setOpen(true)}>New Invoice</button>
        <div>
          <p>This are the last invoices</p>
        </div>
        <Modal open={open} onClose={handleClose}>
          <div style={modalStyle}>
            <ModalForm
              handleChange={handleChange}
              articlesList={articlesList}
              handleArticleChange={handleArticleChange}
              handleSubmit={handleSubmit}
              removeArticle={removeArticle}
              addAnotherArticle={addAnotherArticle}
              invoice={invoice}
            />
          </div>
        </Modal>
      </div>
    </>
  );
};

export default InvoiceDashboard;
