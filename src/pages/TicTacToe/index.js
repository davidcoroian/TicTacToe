import React, { Component } from "react";
import "./styles.css";

const SYMBOL = {
  player1: "O",
  player2: "X"
};

// all possible winning solutions
const POSSIBLE_SOLUTIONS = [
  [0, 1, 2],
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8]
];

export default class TicTacToe extends Component {
  initialState = {
    boxes: {
      ...Array.from(new Array(9), box => (box = { value: undefined }))
    },
    playerTurn: "player1",
    winner: undefined
  };

  state = this.initialState;

  checkCombinations = () => {
    const { boxes } = this.state;

    const reducer = (acc, curVal) => {
      // check if the box has a value in it and if it is equal to the previous ones in this group
      if (boxes[curVal].value && acc === boxes[curVal].value) {
        return acc;
      }
      return null;
    };

    POSSIBLE_SOLUTIONS.forEach(combination => {
      // grab the value for the first box in this combination to initialize the accumulator
      const initialVal = boxes[combination[0]].value;
      // iterate over groups of winning combiantions, checking if all 3 values belong to the same player
      const result = combination.reduce(reducer, initialVal);

      // if a result is returned and its not null, we have a winner.
      if (result) {
        this.setState({ winner: result });
      }
    });
  };

  onClick = key => {
    const { boxes, playerTurn, winner } = this.state;

    if (!winner && !boxes[key].value) {
      // update the box that was clicked
      this.setState(
        {
          boxes: {
            ...boxes,
            [key]: { value: SYMBOL[playerTurn] }
          }
        },
        // check combinations after each move to see if there is a winner
        this.checkCombinations
      );

      // switch player turns
      if (playerTurn === "player1") {
        this.setState({ playerTurn: "player2" });
      } else {
        this.setState({ playerTurn: "player1" });
      }
    }
  };

  resetGame = () => {
    this.setState({ ...this.initialState });
  };

  render() {
    const { boxes, winner } = this.state;

    return (
      <div className="board">
        {Object.keys(boxes).map(key => {
          return (
            <div key={key} className="box" onClick={() => this.onClick(key)}>
              <div className="symbol">{boxes[key].value}</div>
            </div>
          );
        })}
        <button className="button" onClick={this.resetGame}>
          Reset Game
        </button>
        {winner && <div className="winner">The winner is {winner}</div>}
      </div>
    );
  }
}
