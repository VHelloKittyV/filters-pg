import React, { useReducer, useState } from "react";

const ACTION = {
  ADD_TODO: "todo",
  TOGGLE_TODO: "toggle-todo",
  DELETE_TODO:'delete-todo'
};

const reducer = (todos, action) => {
  switch (action.type) {
    case ACTION.ADD_TODO:
      return [...todos, newTodo(action.payload.name)];
    case ACTION.TOGGLE_TODO: {
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo
        
      });
    }
    case ACTION.DELETE_TODO:{
      return todos.filter((todo)=>todo.id!==action.payload.id)
    }
    default:
      return todos
  }
};

const newTodo = (name) => {
  return { id: new Date(), name: name, isCompleted: false };
};
export default function UseReducerList() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      dispatch({ type: ACTION.ADD_TODO, payload: { name: name } });
      setName("");
    }
  };
  return (
    <div className="wrapper">
      <h1 className="text-center">useReduce List</h1>
      <form onSubmit={handleSubmit} className="row">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
        <button type="submit">submit</button>
      </form>

      <ul className="list">
        {todos.map((todo) => (
          <li className="row" key={todo.id}>
            {todo.name}
            <span>
              <button
                onClick={() =>
                  dispatch({
                    type: ACTION.TOGGLE_TODO,
                    payload: { id: todo.id },
                  })
                }
              >
                {todo.isCompleted ? "undone" : "done"}
              </button>
            </span>
            <span>
              <button onClick={() =>
                  dispatch({
                    type: ACTION.DELETE_TODO,
                    payload: { id: todo.id },
                  })
                }>delete</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
