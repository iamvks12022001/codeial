import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";

var timecount = 1;
setInterval(function () {
  alert(`You are using this site for ${timecount * 30} minute`);
  timecount++;
}, 60000 * 30);

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
