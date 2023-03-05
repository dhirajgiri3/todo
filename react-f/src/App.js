import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import "./App.css";
import axios from "axios";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    // update update the list of todos
    // when the component is rendered for the first time
    update();
  }, []);

  // This function updates the component with the
  // current todo data stored in the server
  function update() {
    axios
      .get(`${process.env.REACT_APP_BACKEND}api/todos`)
      .then((res) => {
        setTodos(res.data.data);
      })
      .catch((err) => console.log(err));
  }

  // This function sends a new todo to the server
  // and then call the update method to update the
  // component
  function addTodo(e) {
    e.preventDefault();
    let item = newTodo;
    let body = {
      data: {
        item,
      },
    };

    axios
      .post(`${process.env.REACT_APP_BACKEND}api/todos`, body, {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((res) => {
        setNewTodo(res.data.data.attributes.item);
        console.log(res.data.data);
        update();
      })
      .catch((err) => console.log(err));
  }

  function scrollToBottom() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }

  return (
    <div className="app">
      <main>
        {/* we centered the "main" tag in our style sheet*/}

        {/* This form collects the item we want to add to our todo, and sends it to the server */}
        <h1>Dhiraj Giri's Todo list</h1>
        <form className="form" onSubmit={addTodo}>
          <input
            type="text"
            className="todo_input"
            placeholder="Enter new todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.currentTarget.value)}
          />
          <button
            type="submit"
            className="todo_button"
            onClick={() => {
              alert("Added Successfuly");
            }}
          >
            Add todo
          </button>
        </form>

        {/* This is a list view of all the todos in the "todo" state variable */}
        <div className="todolist">
          <div>
            {todos.map((todo, i) => {
              return (
                <TodoItem
                  todo={todo}
                  newTod={newTodo}
                  key={i}
                  update={update}
                />
              );
            })}
          </div>
        </div>
        <div className="scrollbottom" onClick={scrollToBottom}>
          <p>Down</p>
        </div>
      </main>
    </div>
  );
}
export default App;
