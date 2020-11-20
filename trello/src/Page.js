/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/require-render-return */
import React from "react";
import "./App.css";
import { v4 } from "node-uuid";
import Card from "./Card";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.index,
      name: this.props.name,
      pageInput: "",
      cardList: [],
      view: false,
      id: 1,
      inputView: false,
      newText: "",
    };
  }
  handleInput = (e) => {
    this.setState({ pageInput: e.target.value });
  };

  handleAdd = (e) => {
    e.preventDefault();
    this.setState({ view: true });
  };

  handleCancel = (e) => {
    e.preventDefault();
    this.setState({ view: false });
  };

  addTask(text, id) {
    const newTask = {
      cardkey: v4(),
      name: text,
      id: id,
    };
    this.setState({ cardList: [...this.state.cardList, newTask] });
  }

  handleNewone = (e) => {
    if (this.state.pageInput !== "") {
      e.preventDefault();
      this.addTask(this.state.pageInput, this.state.id);
      this.setState({
        pageInput: "",
        id: this.state.id + 1,
      });
    }
  };

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
      this.props.editTheList(this.state.index, this.state.newText);
      this.setState({ inputView: false, name: this.state.newText });
    }
  };

  handleAdd = (e) => {
    e.preventDefault();
    this.setState({ view: true });
  };
  hadleDeleteList = (e) => {
    e.preventDefault();
    this.props.deleteTheList(this.state.index);
  };

  editTheCard = (index, newName) => {
    const editedTaskList = this.state.cardList.map((task) => {
      if (index === task.cardkey) {
        return { ...task, name: newName };
      }
      return task;
    });
    this.setState({
      cardList: editedTaskList,
    });
  };

  deleteTheCard = (index) => {
    let remainingTasks = this.state.cardList.filter(
      (task) => index !== task.cardkey
    );
    this.setState({
      cardList: remainingTasks,
    });
    // console.log(remainingTasks);
  };

  render() {
    return (
      <div className="order">
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

        <DragDropContext
          onDragEnd={(result) => {
            console.log(result);
            const { source, destination } = result;
            if (!destination) {
              return;
            }

            let arr = Array.from(this.state.cardList);
            console.log(arr);
            const [remove] = arr.splice(source.index, 1);
            arr.splice(destination.index, 0, remove);
            this.setState({
              cardList: arr,
            });
          }}
        >
          <Droppable droppableId="cards">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {this.state.cardList.map(({ cardkey, id, name }, index) => (
                  <Draggable
                    key={cardkey}
                    draggableId={String(id)}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <Card
                          key={cardkey}
                          name={name}
                          id={index}
                          index={cardkey}
                          className="card"
                          editTheCard={this.editTheCard}
                          deleteTheCard={this.deleteTheCard}
                        />
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        <button
          onClick={this.handleAdd}
          style={{ display: this.state.view ? "none" : "block" }}
        >
          + Add a card
        </button>
        <div
          className="inputArea"
          style={{ display: this.state.view ? "block" : "none" }}
        >
          <input
            type="text"
            value={this.state.pageInput}
            onChange={this.handleInput}
            placeholder="A new card?"
          ></input>
          <div className="btnBox">
            <button onClick={this.handleNewone}>Add Card</button>
            <button onClick={this.handleCancel}>X</button>
          </div>
        </div>
        <button onClick={this.hadleDeleteList}>Delete This List</button>
      </div>
    );
  }
}

export default Page;
