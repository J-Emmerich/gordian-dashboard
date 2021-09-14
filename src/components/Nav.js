import React from "react";
import { NavLink } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import DashboardIcon from "@material-ui/icons/Dashboard";
import InfoIcon from "@material-ui/icons/Info";
import ReceiptIcon from "@material-ui/icons/Receipt";
import styled from "styled-components";

const Container = styled.div`
  overflow: hidden;
`;

function Nav() {
  return (
    <>
      <List component={Container}>
        <ListItemLink to="/" primary="Home" icon={<HomeIcon />} />
        <ListItemLink to="/board" primary="Board" icon={<DashboardIcon />} />
        <ListItemLink to="/pdf" primary="Invoices" icon={<ReceiptIcon />} />
        <ListItemLink to="/about" primary="About" icon={<InfoIcon />} />
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
