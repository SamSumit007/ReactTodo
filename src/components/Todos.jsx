import React, { useEffect, useState } from "react";
import { AddTodo } from "./AddTodo";
import { Todo } from "./Todo";
import axios from "axios"
 const Todos = () => {

  const [todos, settodos] = useState([]);
  const [pageNo, setpageNo] = useState(1);
  const [totalcount, setTotalcount] = useState(0);
  const [limit, setLimit] = useState(3);

  useEffect(() => {
    axios.get(`http://localhost:8080/todos?_page=${pageNo}&_limit=${limit}`)
       .then((r)=> {
        settodos(r.data);
        setTotalcount(Number(r.headers["x-total-count"]));
      })
  }, [pageNo , limit]);

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
        <button disabled={pageNo <=1 }
        onClick={()=>{
            if(pageNo>1){
                setpageNo(pageNo - 1)
            }
        }}>Previous</button>
        <select onChange={(e)=> setLimit(Number(e.target.value))}>
        <option value={3}>3</option>
        <option value={6}>6</option>
        <option value={9}>9</option>



        </select>
        <button disabled={totalcount < pageNo * 3}
        onClick={()=>setpageNo(pageNo + 1)}>Next</button>
      </div>
    </div>
  );
};
export default Todos;