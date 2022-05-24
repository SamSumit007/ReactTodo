import React, { useState } from "react";

export const AddTodo = ({ onAdd}) => {
  const [newTodo, setnewTodo] = useState("");

  const postTodos = async (newTodo) => {
    
  try {
    let res = await fetch(`http://localhost:8080/todos`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ value:newTodo, completed: false }),
    });
    let data = await res.json();
    onAdd(data)
  } catch (e) {
    console.log(e);
  }
};

 

  return (
    <div>
      <input
        type="text"
        value={newTodo}
        name="todo"
        placeholder="Enter Todos here"
        onChange={(e) => setnewTodo(e.target.value)}
      />
      <button
        onClick={() => {
          if (newTodo) {
            postTodos(newTodo);
            setnewTodo("");
          }
        }}
      >
        Add Todo
      </button>
    </div>
  );
};