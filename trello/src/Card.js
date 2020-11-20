/* eslint-disable react/require-render-return */
import React from "react";
import "./App.css";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.index,
      name: this.props.name,
      inputView: false,
      newText: "",
    };
  }

  editListInput = (e) => {
    this.setState({ newText: e.target.value });
  };

  turnToEdit = () => {
    this.setState({ inputView: true });
  };

  turnToName = () => {
    this.setState({ inputView: false });
  };

  hadleNewName = (e) => {
    if (this.state.newText !== "") {
      e.preventDefault();
      this.props.editTheCard(this.state.index, this.state.newText);
      this.setState({
        inputView: false,
        name: this.state.newText,
        newText: "",
      });
    }
  };

  handleAdd = (e) => {
    e.preventDefault();
    this.setState({ view: true });
  };
  hadleDeleteCard = (e) => {
    e.preventDefault();
    this.props.deleteTheCard(this.state.index);
  };
  render() {
    return (
      <div className="card">
        <div className="deleteDiv">
          <button onClick={this.hadleDeleteCard} className="deleteIcon">
            x
          </button>
        </div>
        <div
          className="nameBox"
          style={{ display: this.state.inputView ? "none" : "flex" }}
        >
          <div>{this.state.name}</div>

          <button onClick={this.turnToEdit}>edit</button>
        </div>
        <div
          className="nameBox"
          style={{ display: this.state.inputView ? "flex" : "none" }}
        >
          <input
            type="text label"
            className="editBox"
            value={this.state.newText}
            onChange={this.editListInput}
            placeholder="A new name?"
          ></input>
          <button onClick={this.hadleNewName}>save</button>
          <button onClick={this.turnToName}>cacel</button>
        </div>
      </div>
    );
  }
}

export default Card;
