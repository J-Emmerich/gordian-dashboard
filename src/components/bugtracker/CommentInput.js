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
  & input,
  textarea {
    padding: 20px;
    background-color: #f3f3f3;
  }
`;
const StyledButton = styled(Button)`
  && {
    margin: 5px 0px;
  }
`;
const CommentInput = ({ onChange, comment, removeComment }) => {
  return (
    <div className="article-input" id={comment.commentId}>
      <FlexContainer>
        <StyledTextField
          onChange={(e) => onChange(e, comment.commentId)}
          value={comment.contenido}
          multiline
          name="contenido"
          type="text"
          placeholder="Comentario"
          variant="outlined"
          rows={5}
        />
        <StyledButton
          variant="contained"
          color="secondary"
          onClick={(e) => removeComment(e, comment.commentId)}
        >
          Eliminar comentario
        </StyledButton>
      </FlexContainer>
    </div>
  );
};

export default CommentInput;
