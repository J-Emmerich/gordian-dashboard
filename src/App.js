import React, { useState, useContext } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { styles } from "./styleApp.js";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";
import styled from "styled-components";
import { UserContext } from "./services/userContext";
// Components
import Board from "./components/to-do/Board";
import Nav from "./components/Nav";
import InvoiceDashboard from "./components/invoice/InvoiceDashboard";
import CRMDashboard from "./components/crm/CRMDashboard";
import BugTrackerDashboard from "./components/bugtracker/BugtrackerDashboard";
import Home from "./components/Home";
import Settings from "./components/settings/Settings";

const useStyles = makeStyles(styles);

//This component is to fix the App bar standing over the other components.
const FixHeader = styled.div`
  height: 55px;
`;

export default function App({ token }) {
  const classes = useStyles();

  const [isOpened, setIsOpened] = useState(false);
  const { user, logout, selectedProject } = useContext(UserContext);
  console.log("this is the user passed down from")
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
            <Typography variant="h6" style={{ marginLeft: "auto" }}> {selectedProject && selectedProject.projectName !== "" ? 
            <p>Estas trabajando en: <span style={{color: "white"}}> {selectedProject.projectName} </span></p> : (<Button href="http://localhost:3000/app/ajustes" variant="contained"
            color="secondary">Elegir Proyecto</Button>)} </Typography>
            
            <Button
              variant="contained"
              color="secondary"
              onClick={() => logout()}
              style={{ marginLeft: "auto" }}
            >
              Logout{" "}
            </Button>
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
            <Route path="/app/board">
              <Board token={token} user={user} selectedProject={selectedProject} />
            </Route>
            <Route path="/app/bugtracker">
              <BugTrackerDashboard token={token} user={user} selectedProject={selectedProject}/>
            </Route>
            <Route path="/app/customer">
              <CRMDashboard token={token} user={user} selectedProject={selectedProject} />
            </Route>
            <Route path="/app/pdf">
              <InvoiceDashboard token={token} user={user} selectedProject={selectedProject}/>
            </Route>
            <Route path="/app/ajustes">
              <Settings token={token} user={user} selectedProject={selectedProject} />
            </Route>
            <Route path="/app" token={token} user={user} selectedProject={selectedProject} exact>
              <Home />
            </Route>
          </Switch>
        </main>
      </div>

      <footer className={classes.footer}>
        <Typography variant="h6"></Typography>
      </footer>
    </div>
  );
}
