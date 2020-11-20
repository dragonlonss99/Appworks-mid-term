/* eslint-disable react/require-render-return */
import React from "react";
import "./App.css";
import Page from "./Page";
import { v4 } from "node-uuid";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listText: "",
      totalList: [],
      view: false,
    };
  }
  handleInput = (e) => {
    this.setState({ listText: e.target.value });
  };

  handleAdd = (e) => {
    e.preventDefault();
    this.setState({ view: true });
  };

  handleCancel = (e) => {
    e.preventDefault();
    this.setState({ view: false });
  };
  addTask(text) {
    const newTask = {
      key: v4(),
      name: text,
    };
    this.setState({ totalList: [...this.state.totalList, newTask] });
  }

  handleNewone = (e) => {
    if (this.state.listText !== "") {
      e.preventDefault();
      this.addTask(this.state.listText);
      this.setState({
        listText: "",
      });
    }
  };

  editTheList = (index, newName) => {
    const editedTaskList = this.state.totalList.map((task) => {
      if (index === task.key) {
        return { ...task, name: newName };
      }
      return task;
    });
    this.setState({
      totalList: editedTaskList,
    });
  };

  deleteTheList = (index) => {
    let remainingTasks = this.state.totalList.filter(
      (task) => index !== task.key
    );
    this.setState({
      totalList: remainingTasks,
    });
  };

  render() {
    return (
      <div className="box">
        {this.state.totalList.map((task) => (
          <Page
            key={task.key}
            name={task.name}
            index={task.key}
            editTheList={this.editTheList}
            deleteTheList={this.deleteTheList}
          />
        ))}
        <div className="order">
          <button
            onClick={this.handleAdd}
            style={{ display: this.state.view ? "none" : "block" }}
          >
            + Add a list
          </button>
          <div
            className="inputArea"
            style={{ display: this.state.view ? "block" : "none" }}
          >
            <input
              type="text"
              value={this.state.listText}
              onChange={this.handleInput}
              placeholder="A new list?"
            ></input>
            <div className="btnBox">
              <button onClick={this.handleNewone}>Add List</button>
              <button onClick={this.handleCancel}>X</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
