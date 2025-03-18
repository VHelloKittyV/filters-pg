import { useState, useReducer } from "react";

const initialState = {
  todos: [
    { id: "a", task: "Learn React", complete: true },
    { id: "b", task: "Learn Firebase", complete: true },
    { id: "c", task: "Learn GraphQL", complete: false },
  ],
  editID: null,
};

const ACTION = {
  ADD_TODO: "add-todo",
  EDIT_TODO: "edit-todo",
  TOGGLE_TODO: "toggle-todo",
  DELETE_TODO: "delete-todo",
  SET_EDIT_TODO: "set-edit-todo",
  CLEAR_EDIT_TODO: "clear-edit-todo",
  SHOW_ALL: "show-all",
  SHOW_COMPLETE: "show-complete",
  SHOW_INCOMPLETE: "show-incomplete",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, newTodo(action.payload.task)],
      };
    case ACTION.EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === state.editID
            ? { ...todo, task: action.payload.task }
            : todo
        ),
        editID: null,
      };
    case ACTION.TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, complete: !todo.complete }
            : todo
        ),
      };
    case ACTION.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    case ACTION.SET_EDIT_TODO:
      return { ...state, editID: action.payload.id };
    case ACTION.CLEAR_EDIT_TODO:
      return { ...state, editID: null };
    default:
      return state;
  }
};

const newTodo = (task) => ({
  id: Date.now().toString(),
  task,
  complete: false,
});

const filterReducer = (state, action) => {
  switch (action.type) {
    case ACTION.SHOW_ALL:
      return "ALL";
    case ACTION.SHOW_COMPLETE:
      return "COMPLETE";
    case ACTION.SHOW_INCOMPLETE:
      return "INCOMPLETE";
    default:
      return state;
  }
};

export default function ListReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [filter, dispatchFilter] = useReducer(filterReducer, "ALL");

  const [task, setTask] = useState("");

  const handleAddOrEdit = () => {
    if (state.editID) {
      dispatch({ type: ACTION.EDIT_TODO, payload: { task } });
    } else {
      if (task) {
        dispatch({ type: ACTION.ADD_TODO, payload: { task } });
      }
    }
    setTask("");
  };

  const handleShowAll = () => {
    dispatchFilter({ type: ACTION.SHOW_ALL });
  };

  const handleShowComplete = () => {
    dispatchFilter({ type: ACTION.SHOW_COMPLETE });
  };

  const handleShowIncomplete = () => {
    dispatchFilter({ type: ACTION.SHOW_INCOMPLETE });
  };

  const filteredTodos = state.todos.filter((todo) => {
    if (filter === "ALL") {
      return true;
    }

    if (filter === "COMPLETE" && todo.complete) {
      return true;
    }

    if (filter === "INCOMPLETE" && !todo.complete) {
      return true;
    }

    return false;
  });

  const totalCount = state.todos.length;
  const activeCount = state.todos.filter((todo) => !todo.complete).length;
  const completeCount = state.todos.filter((todo) => todo.complete).length;

  return (
    <div>
      <h1>List Reducer</h1>
      <div className="row">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          type="text"
        />
        <button onClick={handleAddOrEdit}>
          {state.editID ? "Save" : "Add"}
        </button>
      </div>

      <div role="tablist" className="tabs tabs-border">
        <a
          role="tab"
          onClick={handleShowAll}
          className={`tab ${filter === "ALL" ? "tab-active" : ""}`}
        >
          All tasks {totalCount}
        </a>
        <a
          role="tab"
          onClick={handleShowIncomplete}
          className={`tab ${filter === "INCOMPLETE" ? "tab-active" : ""}`}
        >
          Active {activeCount}
        </a>
        <a
          role="tab"
          onClick={handleShowComplete}
          className={`tab ${filter === "COMPLETE" ? "tab-active" : ""}`}
        >
          Completed {completeCount}
        </a>
      </div>

      <ul className="list">
        {filteredTodos.map((todo) => (
          <li className="list-row row" key={todo.id}>
            <div>
              <span>{todo.task}</span>
            </div>
            <div className="row">
              <button
                onClick={() =>
                  dispatch({
                    type: ACTION.TOGGLE_TODO,
                    payload: { id: todo.id },
                  })
                }
              >
                {todo.complete ? "Undone" : "Done"}
              </button>
              <button
                onClick={() => {
                  setTask(todo.task);
                  dispatch({
                    type: ACTION.SET_EDIT_TODO,
                    payload: { id: todo.id },
                  });
                }}
              >
                Edit
              </button>
              <button
                onClick={() =>
                  dispatch({
                    type: ACTION.DELETE_TODO,
                    payload: { id: todo.id },
                  })
                }
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
