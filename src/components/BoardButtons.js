import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import styled from "styled-components";

const listStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  overflow: "hidden"
};

const listItemStyle = {
  width: "50px"
};
const BoardButtons = ({ addCard }) => {
  return (
    <List style={listStyle}>
      <ListItem style={listItemStyle} onClick={addCard} button={true}>
        <ListItemIcon>
          <AddCircleRoundedIcon fontSize="medium" />
        </ListItemIcon>
      </ListItem>
    </List>
  );
};

export default BoardButtons;
