import React from "react";
import { useReducer } from "react";

const ACTIONS = {
  INCREASE: "increase",
  DECREASE: "decrease",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.INCREASE: {
      const newCount = state.count + 1;
      const hasError = newCount > 5;
      return {
        ...state,

        count: hasError ? state.count : newCount,
        error: hasError ? "Max reached" : null,
      };
    }

    case ACTIONS.DECREASE: {
      const newCount = state.count - 1;
      const hasError = newCount < 0;
      return {
        ...state,

        count: hasError ? state.count : newCount,
        error: hasError ? "Min reached" : null,
      };
    }
  }
};
export default function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  const handleIcrease = () => {
    dispatch({ type: ACTIONS.INCREASE });
  };
  const handleDecrease = () => {
    dispatch({ type: ACTIONS.DECREASE });
  };

  return (
    <div>
      <h1>{state.count}</h1>
      <p className="text-red-500">{state.error}</p>
      <div className="flex gap-2">
        <button onClick={handleIcrease}>+</button>
        <button onClick={handleDecrease}>-</button>
      </div>
    </div>
  );
}
