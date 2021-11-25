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

const CommentInput = ({ onChange, comment, removeComment }) => {
  return (
    <div className="article-input" id={comment.commentId}>
      <FlexContainer>
        <label>Comentario:</label>
        <input
          onChange={(e) => onChange(e, comment.commentId)}
          value={comment.contenido}
          name="contenido"
          type="text"
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={(e) => removeComment(e, comment.commentId)}
        >
          Eliminar comentario
        </Button>
      </FlexContainer>
    </div>
  );
};

export default CommentInput;
