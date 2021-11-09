import React from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  & button {
    margin-left: 20px;
  }
`;

const ArticleInput = ({ onChange, article, removeArticle }) => {
  return (
    <div className="article-input" id={article.articleId}>
      <FlexContainer>
        <label>Article Name:</label>
        <input
          onChange={(e) => onChange(e, article.articleId)}
          value={article.articleName}
          name="articleName"
          type="text"
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={(e) => removeArticle(e, article.articleId)}
        >
          Remove Article
        </Button>
      </FlexContainer>
      <FlexContainer>
        <label>Price per Unit:</label>
        <input
          onChange={(e) => onChange(e, article.articleId)}
          value={article.pricePerUnit}
          name="pricePerUnit"
          type="number"
        />
        <label>Quantity:</label>
        <input
          onChange={(e) => onChange(e, article.articleId)}
          value={article.quantity}
          name="quantity"
          type="number"
        />

        <label>Tasa de IVA: </label>
        <input
          onChange={(e) => onChange(e, article.articleId)}
          value={article.vat}
          name="vat"
          type="number"
        />
        <label>Total Price:</label>
        <input
          onChange={(e) => onChange(e, article.articleId)}
          value={article.totalPrice}
          name="totalPrice"
          type="number"
        />
      </FlexContainer>
    </div>
  );
};

export default ArticleInput;
