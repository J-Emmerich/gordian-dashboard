import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import PostAddOutlinedIcon from "@material-ui/icons/PostAddOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";

// Why not styled components?
const listStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  overflow: "hidden"
};

const listItemStyle = {
  width: "50px"
};
const BoardButtons = ({ addCard, saveToDatabase, isSaved }) => {
  return (
    <List style={listStyle}>
      <ListItem style={listItemStyle} onClick={addCard} button={true}>
        <ListItemIcon>
          <PostAddOutlinedIcon fontSize="medium" />
        </ListItemIcon>
      </ListItem>
      <ListItem style={listItemStyle} onClick={saveToDatabase} button={true}>
        <ListItemIcon>
          <SaveOutlinedIcon
            fontSize="medium"
            color={isSaved ? "disabled" : "action"}
          />
        </ListItemIcon>
      </ListItem>
    </List>
  );
};

export default BoardButtons;
