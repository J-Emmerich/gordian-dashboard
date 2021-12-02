import React from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";

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

const StyledTextField = styled(TextField)`
  margin: 5px 20px;
  && input,
  textarea,
  select,
  option {
    padding: 20px;
    background-color: #fff;
  }
`;

const ArticleInput = ({ onChange, article, removeArticle }) => {
  return (
    <div className="article-input" id={article.articleId}>
      <FlexContainer>
        <StyledTextField
          onChange={(e) => onChange(e, article.articleId)}
          value={article.articleName}
          name="articleName"
          type="text"
          placeholder="Artículo"
          variant="outlined"
        />
        <StyledTextField
          onChange={(e) => onChange(e, article.articleId)}
          value={article.pricePerUnit}
          name="pricePerUnit"
          type="number"
          placeholder="Precio por unidad"
          variant="outlined"
        />
        <StyledTextField
          onChange={(e) => onChange(e, article.articleId)}
          value={article.quantity}
          name="quantity"
          type="number"
          placeholder="Cantidad"
          variant="outlined"
        />

        <StyledTextField
          onChange={(e) => onChange(e, article.articleId)}
          value={article.vat}
          name="vat"
          type="number"
          placeholder="Tasa de IVA"
          variant="outlined"
        />

        <StyledTextField
          onChange={(e) => onChange(e, article.articleId)}
          value={article.totalPrice}
          name="totalPrice"
          type="number"
          placeholder="Precio total"
          variant="outlined"
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={(e) => removeArticle(e, article.articleId)}
        >
          Eliminar artículo
        </Button>
      </FlexContainer>
    </div>
  );
};

export default ArticleInput;
