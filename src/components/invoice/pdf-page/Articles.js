import React from "react";

const Articles = ({ articles }) => {
  return (
    <div className="table-container">
      <table className="articles-table pdf-table">
        <thead className="pdf-thead">
          <tr>
            <td className="pdf-td" colSpan="2">
              Articulo
            </td>
            <td className="td-centered pdf-td">
              Precio Unidad <br></br>
              <span className="iva-detail">IVA INCL</span>
            </td>
            <td className="pdf-td">Unidades</td>
            <td className="td-centered pdf-td">
              Precio total <br></br>
              <span className="iva-detail">IVA INCL</span>
            </td>
            <td className="pdf-td">Tasa IVA</td>
          </tr>
        </thead>
        <tbody className="pdf-tbody">
          {articles.map((article) => {
            return (
              <tr key={article.articleId}>
                <td className="pdf-td" colSpan="2">
                  {article.articleName}
                </td>
                <td className="td-centered pdf-td">€ {article.pricePerUnit}</td>
                <td className="td-centered pdf-td">{article.quantity}</td>
                <td className="td-centered pdf-td">€ {article.totalPrice}</td>
                <td className="td-centered pdf-td">% {article.vat}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Articles;
