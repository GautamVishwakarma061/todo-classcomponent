import React, { ChangeEvent, Component, Key, KeyboardEvent } from "react";
import { IoMdAdd } from "react-icons/io";

type TodoClassProps = {};

type TodoClassState = {
  show: boolean;
  task: string;
  todo: string[];
  goItems: string[];
};

class TodoClass extends Component<TodoClassProps, TodoClassState> {
  constructor(props: TodoClassProps) {
    super(props);
    this.state = {
      show: false,
      task: "",
      todo: [],
      goItems: [],
    };
    this.handleAddToDo = this.handleAddToDo.bind(this);
    this.handleSaveTodo = this.handleSaveTodo.bind(this);
    this.perDelete = this.perDelete.bind(this);
    this.hanndleKeyPress = this.hanndleKeyPress.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleAddToDo(event: ChangeEvent<HTMLInputElement>): void {
    this.setState({ task: event.target.value });
  }
  handleSaveTodo(): void {
    if (this.state.task.trim() !== "") {
      this.setState({ todo: [this.state.task, ...this.state.todo], task: "" });
    } else {
      alert("Please add something");
    }
  }
  handleGetDown(id: number): void {
    const deleted = this.state.todo.filter((element, key) => {
      return key !== id;
    });
    this.setState({ todo: [...deleted] });
    const deleted1 = this.state.todo.filter((element, key) => {
      return key === id;
    });
    this.setState({ goItems: [...deleted1, ...this.state.goItems] });
  }
  perDelete(id: number): void {
    const perDel = this.state.goItems.filter((element, key) => {
      return key !== id;
    });
    this.setState({ goItems: [...perDel] });
  }
  hanndleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      this.handleSaveTodo();
    }
  }
  handleOpen() {
    this.setState({ show: !this.state.show });
  }
  handleClose() {
    this.setState({ show: false });
  }
  render(): React.ReactNode {
    return (
      <div className="mx-4">
        <div className="text-3xl font-bold">TODO APP</div>
        {this.state.todo.length >= 0 && (
          <p className=" font-semibold text-2xl  mt-2">Things To Do</p>
        )}
        {this.state.todo.length == 0 && (
          <span className="pr-2 font-semibold border text-gray-300 border-yellow-500 mb-4 ">
            No Todo`s Here...
          </span>
        )}
        {this.state.todo && (
          <div>
            {this.state.todo.map((item, id) => {
              return (
                <div key={id} className="flex gap-4 m-1  ">
                  {item}
                  <button
                    className=" px-2 py-1 text-green-500  rounded-md "
                    onClick={() => this.handleGetDown(id)}
                  >
                    ✓
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {!this.state.show && (
          <div
            onClick={this.handleOpen}
            className="flex items-center  gap-2 px-2 py-1 bg-yellow-400 rounded-xl w-40 justify-center my-5"
          >
            <IoMdAdd className="text-sm font-black text-white " />

            <button className="text-xl font-semibold text-white">
              Add Todo
            </button>
          </div>
        )}

        {this.state.show && (
          <div className="w-full flex mx-2 items-center gap-1">
            <input
              className=" border-yellow-500 border-2 rounded-md mt-3  px-2"
              placeholder="Add a todo..."
              onChange={this.handleAddToDo}
              onKeyUp={this.hanndleKeyPress}
              value={this.state.task}
            />
            <div className="flex">
              <button
                onClick={this.handleSaveTodo}
                className="px-2 rounded-md bg-yellow-500 text-white font-bold "
              >
                Add
              </button>
              <button
                onClick={this.handleClose}
                className="px-2 rounded-md bg-yellow-500 text-white font-bold ml-3"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {this.state.goItems.length > 0 && (
          <div className="  text-xl    m-2">Things Done</div>
        )}
        {this.state.goItems.map((item, id) => {
          return (
            <div key={id} className="flex gap-4 m-1 text-xl ">
              {item}
              <button
                className=" text-red-500  text-xl px-2 rounded-md"
                onClick={() => {
                  this.perDelete(id);
                }}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}
export default TodoClass;
