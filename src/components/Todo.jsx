import React, { useState } from "react";
import styles from "./Todo.module.css";

export const Todo = ({ todo, onDelete, onEdit }) => {
  const [isEditable, setisEditable] = useState(false);
  const [value, setvalue] = useState(todo.value);

  const deleteTodo = async () => {
    await fetch(`http://localhost:8080/todos/${todo.id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    onDelete(todo.id);
  };

  const editTodo = async () => {
    let res = await fetch(`http://localhost:8080/todos/${todo.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        value,
        completed: true,
      }),
    });
    let data = await res.json();
    onEdit(data);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={todo.completed ? styles.linethrough : "none"}>
          {isEditable ? (
            <div>
              <input
                type="text"
                value={value}
                name="todo"
                onChange={(e) => setvalue(e.target.value)}
              />
              <button
                onClick={() => {
                  if (value) {
                    editTodo(value);
                    setisEditable(false);
                  }
                }}
              >
                Update
              </button>
            </div>
          ) : (
            <div>{todo.value}</div>
          )}
        </div>
        <div>
          <button onClick={() => setisEditable(!isEditable)}>Edit Todo</button>
          <button onClick={deleteTodo}>Delete Todo</button>
        </div>
        
      </div>
    </>
  );
};