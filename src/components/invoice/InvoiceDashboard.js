import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import services from "../../services/invoice";
import { v4 as uuid } from "uuid";
import styled from "styled-components";
import ModalForm from "./ModalForm";
import InvoiceTable from "./InvoiceTable";

const modalStyle = {
  backgroundColor: "white",
  position: "absolute",
  width: "50%",
  height: "70%",
  left: "20%",
  top: "15%",
  overflowY: "auto"
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

const Dashboard = styled.section`
  padding-top: 20px;
`;

const InvoiceDashboard = () => {
  // Modal Inputs State
  const [invoice, setInvoice] = useState(newInvoice);
  const [articles, setArticles] = useState([article]);
  const [articlesList, setArticlesList] = useState([]);
  const [invoiceSaved, setInvoiceSaved] = useState(false);
  // Invoice List State
  const [invoiceList, setInvoiceList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setArticles(articlesList);
  }, [articlesList]);

  useEffect(() => {
    async function callGetInvoices() {
      const invoices = await services.getInvoices();
      console.log("called get invoices");

      setInvoiceList(invoices);
    }

    callGetInvoices();
  }, [invoiceSaved]);

  const resetDashboardState = () => {
    setOpenModal(false);
    setIsEditing(false);
    setInvoice(newInvoice);
    setArticles([article]);
    setArticlesList([]);
  };

  // Invoice Handlers
  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    const changedInvoice = { ...invoice, [name]: value };
    setInvoice(changedInvoice);
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

  // Save the articles list to the current invoice
  const handleSubmit = async (event) => {
    event.preventDefault();
    const invoiceToSave = { ...invoice, articles: articles };
    await services.saveInvoice(invoiceToSave);
    setInvoiceSaved(!invoiceSaved);
    resetDashboardState();
  };
  // End of invoice Handlers

  // Editing invoice
  const editInvoice = (invoiceReceived) => {
    setInvoice(invoiceReceived);
    setArticlesList(invoiceReceived.articles);
    setIsEditing(true);
    setOpenModal(true);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const invoiceToSave = { ...invoice, articles: articles };
    await services.editInvoice(invoiceToSave);
    setInvoiceSaved(!invoiceSaved);
    resetDashboardState();
  };

  return (
    <Dashboard>
      <div>
        <div>This is the dashboard.</div>
        <button onClick={() => setOpenModal(true)}>New Invoice</button>
        {invoiceList.length > 0 ? (
          <InvoiceTable data={invoiceList} handleClick={editInvoice} />
        ) : null}
        <Modal open={openModal} onClose={() => resetDashboardState()}>
          <div style={modalStyle}>
            <ModalForm
              handleChange={handleChange}
              articlesList={articlesList}
              handleArticleChange={handleArticleChange}
              handleSubmit={isEditing ? handleEdit : handleSubmit}
              removeArticle={removeArticle}
              addAnotherArticle={addAnotherArticle}
              invoice={invoice}
            />
          </div>
        </Modal>
      </div>
    </Dashboard>
  );
};

export default InvoiceDashboard;
