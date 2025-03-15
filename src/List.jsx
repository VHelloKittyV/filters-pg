import React, { useState, useMemo } from "react";
import { useDebounce } from "use-debounce";

export default function List() {
  const [tasks, setTasks] = useState([
    { id: 1, name: "apples", isCompleted: false },
    { id: 2, name: "oranges", isCompleted: false },
    { id: 3, name: "pinapples", isCompleted: false },
    { id: 4, name: "mangoes", isCompleted: false },
    { id: 5, name: "pears", isCompleted: false },
  ]);
  const [task, setTask] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [deSearch] = useDebounce(query, 1000);
  
 
  
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        if (filter === "active") return !task.isCompleted;
        if (filter === "completed") return task.isCompleted;
        return true;
      })
      .filter((task) =>
        task.name.toLowerCase().includes(deSearch.toLowerCase())
      );
  }, [tasks, filter, deSearch]);

  const handleAddTask = () => {
    if (task.trim()) {
      const newTask = {
        id: tasks.length + 1,
        name: task,
        isCompleted: false,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTask("");
    }
  };

  const handleDelete = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  return (
    <>
      <h1 className="text-center">List</h1>
      <div className="col">
        <Filters value={query} setQuery={setQuery} />
        <Info tasks={tasks} setFilter={setFilter} filter={filter} />
        <AddTask task={task} setTask={setTask} handleAddTask={handleAddTask} />

        {filteredTasks.length === 0 ? (
          <span className="text-lg text-center text-gray-400 mt-10 capitalize">
            nothing to show
          </span>
        ) : (
          <ListTask
            tasks={filteredTasks}
            onDelete={handleDelete}
            onComplete={handleComplete}
          />
        )}
      </div>
    </>
  );
}

const ListTask = ({ tasks, onDelete, onComplete }) => {
  return (
    <ul className="list">
      {tasks.map((task) => (
        <li key={task.id} className="row list-row">
          <span
            className={`${
              task.isCompleted ? "line-through text-gray-400" : ""
            }`}
          >
            {task.name}
          </span>

          <div className="row">
            <span
              onClick={() => onComplete(task.id)}
              className="icon p-2 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className={`w-6 h-6 ${
                  task.isCompleted ? "text-green-500" : "text-gray-500"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>

            <span
              className="icon p-2 cursor-pointer"
              onClick={() => onDelete(task.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};

const AddTask = ({ task, setTask, handleAddTask }) => {
  return (
    <div className="row">
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        type="text"
        placeholder="Add task"
        className="input w-full"
      />
      <button onClick={handleAddTask} className="btn">
        Add task
      </button>
    </div>
  );
};

const Info = ({ tasks, setFilter, filter }) => {
  const allTasks = tasks.length;
  const activeTasks = tasks.filter((task) => !task.isCompleted).length;
  const completedTasks = tasks.filter((task) => task.isCompleted).length;

  return (
    <div role="tablist" className="tabs tabs-border">
      <a
        role="tab"
        onClick={() => setFilter("all")}
        className={`tab ${filter === "all" ? "tab-active" : ""}`}
      >
        All tasks: {allTasks}
      </a>
      <a
        role="tab"
        onClick={() => setFilter("active")}
        className={`tab ${filter === "active" ? "tab-active" : ""}`}
      >
        Active: {activeTasks}
      </a>
      <a
        role="tab"
        onClick={() => setFilter("completed")}
        className={`tab ${filter === "completed" ? "tab-active" : ""}`}
      >
        Completed: {completedTasks}
      </a>
    </div>
  );
};

const Filters = ({ query, setQuery}) => {
  return (
    <>
      <label className="input mb-4 w-full">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
          type="search"
          placeholder="Search"
        />
      </label>
    </>
  );
};
