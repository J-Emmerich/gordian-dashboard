import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
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
const DashboardHeader = styled.div`
  display: flex;
  justify-content: center;
`;

const Content = styled.section`
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 20px;
`;

const InvoiceDashboard = ({ token, selectedProject }) => {
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
      const invoices = await services.getInvoices(token, selectedProject);
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

  const handleArticleChange = (event, id) => {
    let name = event.target.name;
    let value = event.target.value;

    // Get the random uuid
    // const id = event.target.parentNode.parentNode.id;
    console.log(id);
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
  const removeArticle = (event, id) => {
    event.preventDefault();
    setArticlesList(articles.filter((article) => article.articleId !== id));
  };

  // Save the articles list to the current invoice
  const handleSubmit = async (event) => {
    event.preventDefault();
    const invoiceToSave = { ...invoice, articles: articles };
    await services.saveInvoice(token, selectedProject, invoiceToSave);
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
    await services.editInvoice(token, selectedProject, invoiceToSave);
    setInvoiceSaved(!invoiceSaved);
    resetDashboardState();
  };

  const handlePdf = async (id) => {
    if (window.confirm("do you want to save it?")) {
      await services.saveToPdf(token, selectedProject, id);
    } else {
      console.log("so bad!");
    }
  };

  const deleteInvoice = async (id) => {
    if (window.confirm("Do you really want to delete the file?")) {
      await services.deleteInvoice(token, selectedProject, id);
      setInvoiceSaved(!invoiceSaved);
      resetDashboardState();
    } else {
      console.log("so bad!");
    }
  };

  return (
    <Dashboard>
      <div>
        <DashboardHeader>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenModal(true)}
          >
            Nueva Factura
          </Button>
        </DashboardHeader>
        <Content>
          {invoiceList ? (
            <InvoiceTable
              data={invoiceList}
              handleClick={editInvoice}
              saveToPdf={handlePdf}
              deleteInvoice={deleteInvoice}
            />
          ) : null}
        </Content>
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
              closeModal={() => resetDashboardState()}
            />
          </div>
        </Modal>
      </div>
    </Dashboard>
  );
};

export default InvoiceDashboard;
