import React from "react";
import { NavLink } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import ReceiptIcon from "@material-ui/icons/Receipt";
import SettingsIcon from "@material-ui/icons/Settings";
import styled from "styled-components";

const Container = styled.div`
  overflow: hidden;
`;

function Nav() {
  return (
    <>
      <List component={Container}>
        <ListItemLink
          to="/app"
          primary="Home"
          icon={<HomeIcon color="primary" />}
        />
    
        <ListItemLink
          to="/app/pdf"
          primary="Facturas"
          icon={<ReceiptIcon color="primary" />}
        />
        <ListItemLink
          to="/app/customer"
          primary="Clientes"
          icon={<PersonIcon color="primary" />}
        />
       
        <ListItemLink
          to="/app/ajustes"
          primary="Ajustes"
          icon={<SettingsIcon color="primary" />}
        />
      </List>
    </>
  );
}

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <NavLink activeClassName="active-nav-link" to={to} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

export default Nav;
