import React from "react";
import ReactDOM from "react-dom";
import TicTacToe from "./pages/TicTacToe";

const App = () => {
  return <TicTacToe />;
};

ReactDOM.render(<App />, document.getElementById("root"));
