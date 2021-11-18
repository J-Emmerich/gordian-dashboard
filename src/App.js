import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { styles } from "./styleApp.js";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";
import styled from "styled-components";

// Components
import Board from "./components/to-do/Board";
import Nav from "./components/Nav";
import InvoiceDashboard from "./components/invoice/InvoiceDashboard";
import CRMDashboard from "./components/crm/CRMDashboard";

const useStyles = makeStyles(styles);

//This component is to fix the App bar standing over the other components.
const FixHeader = styled.div`
  height: 55px;
`;

export default function App({ user, token }) {
  const classes = useStyles();

  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className={classes.root}>
      <FixHeader>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={() => setIsOpened(!isOpened)}
              className={classes.icon}
            >
              {isOpened ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
            <Typography variant="h6">Gordian Knot</Typography>
          </Toolbar>
        </AppBar>
      </FixHeader>

      <div className={classes.container}>
        {/* Drawer is like NavBar */}
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawer, {
              [classes.closed]: !isOpened,
              [classes.opened]: isOpened
            })
          }}
        >
          <Nav />
        </Drawer>
        <main className={classes.main}>
          <Switch>
            <Route path="/app/board" component={Board} />

            <Route path="/app/about">
              <p>This should be the About</p>
            </Route>
            <Route path="/app/customer">
              <CRMDashboard />
            </Route>
            <Route path="/app/pdf">
              <InvoiceDashboard />
            </Route>
            <Route path="/app" exact>
              <p>This should be the Home</p>
            </Route>
          </Switch>
        </main>
      </div>

      <footer className={classes.footer}>
        <Typography variant="h6">Footer</Typography>
      </footer>
    </div>
  );
}
