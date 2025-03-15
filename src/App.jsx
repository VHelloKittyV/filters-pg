import React from "react";
import { useState, useMemo } from "react";
import List from "./List";

export default function App() {
  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");

  const filterItems = useMemo(()=>{
    return  items.filter((item) =>item.toLowerCase().includes(query.toLowerCase()));
  },[items, query])

  const onSubmit = (e) => {
    e.preventDefault();
    setItems((prev) => [...prev, item]);
    setItem("");
  };

  return (
    <div className="wrapper">
      <h1>List</h1>

      <label className="input">
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
          onChange={(e) => setQuery(e.target.value)}
          type="search"
          required
          placeholder="Search"
        />
      </label>

      <form className="row" onSubmit={onSubmit}>
        <input
          value={item}
          onChange={(e) => setItem(e.target.value)}
          type="text"
          placeholder="New Item"
          className="input"
        />
        <button type="submit" className="btn">
          Add item
        </button>
      </form>

      <h2>Items:</h2>
      <ul className="list">
        {filterItems.map((item) => (
          <li key={item} className="list-item">
            {item}
          </li>
        ))}
      </ul>
      <List/>
    </div>
  );
}
