import React, { useEffect, useState } from "react";
import { AddTodo } from "./AddTodo";
import { Todo } from "./Todo";

 const Todos = () => {

  const [todos, settodos] = useState([]);
  const [pageNo, setpageNo] = useState(1);

  useEffect(() => {
    const getTodos = async () => {
      try {
        let res = await fetch(`http://localhost:8080/todos?_page=${pageNo}`);
        let data = await res.json();
        settodos(data);
      } catch (e) {
        console.log(e);
      }
    };
    getTodos();
  }, [pageNo]);

  const onAdd = (newTodo) => {
    settodos([...todos, newTodo]);
  };

  const onDelete = (id) => {
    const newTodods = todos.filter((todo) => todo.id !== id);
    settodos(newTodods);
  };
  const onEdit = (updatedTodo) => {
    const newTodods = todos.map((todo) => {
      if (todo.id === updatedTodo.id) {
        return updatedTodo;
      } else {
        return todo;
      }
    });
    settodos(newTodods);
  };
  return (
    <div>
      <h1>My Todo's List</h1>
      <AddTodo onAdd={onAdd} />
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} onDelete={onDelete} onEdit={onEdit} />
      ))}

      <div>
        <button onClick={()=>{
            if(pageNo>1){
                setpageNo(pageNo - 1)
            }
        }}>Previous</button>
        <button onClick={()=>setpageNo(pageNo + 1)}>Next</button>
      </div>
    </div>
  );
};
export default Todos;