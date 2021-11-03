import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import services from "../../services/invoice";
import { v4 as uuid } from "uuid";
import styled from "styled-components";
import ModalForm from "./ModalForm";

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

const InvoiceList = styled.section`
  display: flex;
  flex-flow: column wrap;
`;

const InvoiceRow = styled.div`
  display: flex;
`;
const InvoiceColumn = styled.div`
  padding: 5px;
`;

const Dashboard = styled.section`
  padding-top: 20px;
`;

const InvoiceDashboard = () => {
  // Modal Inputs State
  const [invoice, setInvoice] = useState(newInvoice);
  const [articles, setArticles] = useState([article]);
  const [articlesList, setArticlesList] = useState([]);
  // Invoice List State
  const [invoiceList, setInvoiceList] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setArticles(articlesList);
  }, [articlesList]);

  useEffect(() => {
    async function callGetInvoices() {
      const invoices = await services.getInvoices();
      setInvoiceList(invoices);
    }

    console.log("Is calling the invoices");
    callGetInvoices();
    setInvoice(newInvoice);
  }, [invoice]);

  const handleClose = () => {
    setOpenModal(false);
  };

  // Invoice Handlers
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

  // Save the articles list to the current invoice
  const handleSubmit = async (event) => {
    event.preventDefault();
    const invoiceToSave = { ...invoice, articles: articles };
    services.saveInvoice(invoiceToSave);
    setOpenModal(false);
    setInvoice(invoiceToSave);
  };
  // End of invoice Handlers

  // Invoice List functions

  const mapInvoiceList = () => {
    console.log("called map");
    const mapped = invoiceList.map((invoice) => {
      return (
        <InvoiceRow key={invoice._id}>
          <InvoiceColumn>| ID--: {invoice._id} </InvoiceColumn>
          <InvoiceColumn>| Factura: {invoice.invoiceNumber}</InvoiceColumn>
          <InvoiceColumn>| Cliente: {invoice.clientName}</InvoiceColumn>
          <InvoiceColumn>| Total: {invoice.invoiceTotal}</InvoiceColumn>
        </InvoiceRow>
      );
    });

    return mapped;
  };

  return (
    <Dashboard>
      <div>
        <div>This is the dashboard.</div>
        <button onClick={() => setOpenModal(true)}>New Invoice</button>
        <InvoiceList>
          {invoiceList.length > 0 ? mapInvoiceList() : <p>No invoices</p>}
        </InvoiceList>
        <Modal open={openModal} onClose={handleClose}>
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
    </Dashboard>
  );
};

export default InvoiceDashboard;
