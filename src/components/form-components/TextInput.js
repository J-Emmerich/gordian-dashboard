import TextField from "@material-ui/core/TextField";
import { Controller } from "react-hook-form";
import React from "react";
import styled from "styled-components";

const StyledTextField = styled(TextField)`
  & input,
  textarea,
  select,
  option,
  root {
    padding: 20px;
    background-color: #f3f3f3;
  }
`;

export const FormInputText = ({
  name,
  control,
  label,
  handleChange,
  placeholder
}) => {
  return (
    <Controller
      name={name}
      control={control}
      label={label}
      render={({ field: { handleChange, value } }) => (
        <StyledTextField
          onChange={handleChange}
          value={value}
          label={"Text Value"}
          variant="outlined"
          placeholder={placeholder}
        />
      )}
    />
  );
};

export default FormInputText;
