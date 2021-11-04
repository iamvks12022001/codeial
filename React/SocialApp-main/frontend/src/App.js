import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router";
import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Web from "./pages/Web";
import Messenger from "./pages/Messenger";
import { useState, useEffect } from "react";

import annyang from "annyang";

function App() {
  const [count, setCount] = useState("");
  useEffect(() => {
    console.log("annyang", annyang);
    console.log("current command is ", count);
    if (annyang) {
      // Let's define a command.
      console.log("annyang is working !!", annyang);
      var commands = {
        "make post": () => {
          document.getElementById("add").click();
          setCount("make post");
        },
        "add title *tag": (variable) => {
          document.getElementById("standard-basic-label").click();
          document.getElementById("standard-basic").value = variable;
          setCount("add title");
          //e.target.value=variable
        },
        "add description *tag": (variable) => {
          document.getElementById("standard-basic-1-label").click();
          document.getElementById("standard-basic-1").value = variable;
          setCount("add title");
          //e.target.value=variable
        },
        "share the post": () => {
          document.getElementById("share").click();
          setCount("share the post");
        },
        "cancel the post": () => {
          document.getElementById("cancel").click();
          setCount("cancel the post");
        },
        "logout from account": (variable) => {
          localStorage.clear();
          window.location.reload();
          setCount("logout");
        },
        // "unmark *tag": (variable) => {
        //   console.log("sta");
        //   const { list } = this.props.movies;
        //   console.log("list", list);
        //   const index = list.findIndex(
        //     (element) => element.Title.toLowerCase() === variable.toLowerCase()
        //   );
        //   console.log("index", index);
        //  index = 0;
        //     if (index !== -1) {
        //       document.getElementById(`movies-${index}`).click();
        //     }
        //   },
        "scroll down *tag": (variable) => {
          if (variable.toLowerCase() === "bottom") {
            window.scrollTo(0, document.body.scrollHeight);
          } else {
            if (variable.toLowerCase() === "medium") {
              window.scrollBy(0, 600);
            } else {
              window.scrollBy(0, 300);
            }
          }
          setCount("scroll down");
        },
        "scroll up *tag": (variable) => {
          if (variable.toLowerCase() === "top") {
            window.scrollTo(0, 0);
          } else {
            if (variable.toLowerCase() === "medium") {
              window.scrollBy(0, -600);
            } else {
              window.scrollBy(0, -300);
            }
          }
          setCount("scroll up");
        },
        //   "download commands": () => {
        //     document.getElementById("pdf-download").click();
        //   },
        //   "show video": () => {
        //     document.getElementById("video").click();
        //   },
      };

      // Add our commands to annyang

      annyang.addCommands(commands);
      annyang.start();
    }
  });

  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <SignIn />}
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <SignIn />}</Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/Profile/Web">
          {user ? <Web /> : <Redirect to="/login" />}
        </Route>
        <Route path="/Profile/:username">
          {user ? <Profile /> : <Redirect to="/login" />}
        </Route>
        <Route path="/messenger">
          {user ? <Messenger /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
