import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./firbaseconfigue";
import reducer, { initialState } from "./reducer";
import { StateProvider } from "./stateprovider";

// document.onkeydown = function (e) {
//   if (e.keyCode == 123) {
//     console.log("You cannot inspect Element");
//     return false;
//   }
//   if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
//     console.log("You cannot inspect Element");
//     return false;
//   }
//   if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
//     console.log("You cannot inspect Element");
//     return false;
//   }
//   if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
//     console.log("You cannot inspect Element");
//     return false;
//   }
//   if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
//     console.log("You cannot inspect Element");
//     return false;
//   }
// };
// document.addEventListener("contextmenu", (e) => e.preventDefault());

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
  </StateProvider>,
  document.getElementById("root")
);
