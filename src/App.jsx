import React, { useState } from "react";
import { useDebounce } from 'use-debounce';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, name: "apples", isCompleted: false },
    { id: 2, name: "oranges", isCompleted: false },
    { id: 3, name: "pinapples", isCompleted: false },
    { id: 4, name: "mangoes", isCompleted: false },
    { id: 5, name: "pears", isCompleted: false },
  ]);
  const [task, setTask] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchInput, setSearchInput] = useState(""); 
  const [search] = useDebounce(searchInput, 1000);

  const handleSearch = (e) => {
    setSearchInput(e.target.value); 
  }

  
  const filteredTasks = tasks
    .filter((task) => {
      if (selectedFilter === "active") return !task.isCompleted;
      if (selectedFilter === "completed") return task.isCompleted;
      return true; 
    })
    .filter((task) =>
      task.name.toLowerCase().includes(search.toLowerCase())
    );

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
      <h1 className="text-center font-bold text-3xl mb-4">List</h1>
      <div className="flex flex-col mx-auto w-1/2">
        
        <Filters searchInput={searchInput} handleSearch={handleSearch}/>

        <Info
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          tasks={tasks}
        />

        <AddTask task={task} setTask={setTask} handleAddTask={handleAddTask} />

        {filteredTasks.length === 0 ? (
          <span className="text-lg text-center text-gray-400 mt-10 capitalize">nothing to show</span>
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

export default App;

const ListTask = ({ tasks, onDelete, onComplete }) => {
  return (
    <ul className="list">
      {tasks.map((task) => (
        <li key={task.id} className="flex justify-between items-center p-2  list-row">
          <span className={`${task.isCompleted ? "line-through text-gray-400" : ""}`}>
            {task.name}
          </span>

          <div className="flex gap-2">
            <span onClick={() => onComplete(task.id)} className="icon p-2 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className={`w-6 h-6 ${task.isCompleted ? "text-green-500" : "text-gray-500"}`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </span>

            <span className="icon p-2 cursor-pointer" onClick={() => onDelete(task.id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
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
    <div className="flex justify-between gap-2">
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

const Info = ({ tasks, selectedFilter, setSelectedFilter }) => {
  const allTasks = tasks.length;
  const activeTasks = tasks.filter((task) => !task.isCompleted).length;
  const completedTasks = tasks.filter((task) => task.isCompleted).length;

  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => setSelectedFilter("all")}
        className={`btn ${selectedFilter === "all" ? "btn-primary" : ""}`}
      >
        All <span>{allTasks}</span>
      </button>
      <button
        onClick={() => setSelectedFilter("active")}
        className={`btn ${selectedFilter === "active" ? "btn-primary" : ""}`}
      >
        Active <span>{activeTasks}</span>
      </button>
      <button
        onClick={() => setSelectedFilter("completed")}
        className={`btn ${selectedFilter === "completed" ? "btn-primary" : ""}`}
      >
        Completed <span>{completedTasks}</span>
      </button>
    </div>
  );
};
const Filters =({searchInput, handleSearch})=>{
  return(
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
            type="search"
            placeholder="Search"
            value={searchInput}
            onChange={handleSearch}
          />
        </label>
    </>
  )
}