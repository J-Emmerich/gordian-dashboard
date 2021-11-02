import React from "react";
import Button from "@material-ui/core/Button";

const ArticleInput = ({ onChange, article, removeArticle }) => {
  return (
    <div className="article-input" id={article.articleId}>
      <Button variant="contained" color="secondary" onClick={removeArticle}>
        Remove Article
      </Button>
      <label>
        Article Name:
        <input
          onChange={onChange}
          value={article.articleName}
          name="articleName"
          type="text"
        />
      </label>
      <label>
        Price per Unit:
        <input
          onChange={onChange}
          value={article.pricePerUnit}
          name="pricePerUnit"
          type="text"
        />
      </label>
      <label>
        Is IVA included:
        <input
          onChange={onChange}
          value={article.isIvaIncluded}
          name="isIvaIncluded"
          type="checkbox"
        />
      </label>
      <label>
        Quantity:
        <input
          onChange={onChange}
          value={article.quantity}
          name="quantity"
          type="number"
        />
      </label>
      <label>
        Tasa de IVA
        <input
          onChange={onChange}
          value={article.vat}
          name="vat"
          type="number"
        />
      </label>
      <label>
        Total Price:
        <input
          onChange={onChange}
          value={article.totalPrice}
          name="totalPrice"
          type="number"
        />
      </label>
    </div>
  );
};

export default ArticleInput;
