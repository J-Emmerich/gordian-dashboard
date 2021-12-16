import React from "react";
import { MenuItem, Select } from "@material-ui/core";
import { Controller } from "react-hook-form";
import styled from "styled-components";

const StyledSelect = styled(Select)`
  background-color: #f3f3f3;
  margin: 10px;
  & input {
    background-color: #f3f3f3;
  }
`;

export const FormInputDropdown = ({
  name,
  control,
  handleChange,
  options,
  hiddenSelect
}) => {
  const generateSelectOptions = () => {
    return options.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { handleChange, value } }) => (
        <StyledSelect
          onChange={handleChange}
          value={value}
          variant="outlined"
          defaultValue={hiddenSelect}
        >
          {generateSelectOptions()}
        </StyledSelect>
      )}
    />
  );
};

export default FormInputDropdown;
