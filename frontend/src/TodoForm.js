import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";


const axiosInstance = axios.create({
    baseURL:"http://localhost:8001",
    headers:{
        Accept: "application/json",
        "Content-Type": "application/json",
    }
})

export default function TodoForm(){
    const [todo, setTodo] = useState([]);
    const [title, setTitle] = useState("");
    // const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8001/task-list")
            .then((response) => setTodo(response.data))
            .catch((error) => console.error(error));
    }, []);


    
    const addTodo = () => {
        axiosInstance.post("/task-create", 
            { title: title },
            {headers:{
                "Content-Type":"multipart/form-data",
            }}
        )
            .then((response) => setTodo([...todo, response.data]))
            .catch((error) => console.error(error));
        setTitle("");
    };

    const updateTodo = (id) => {
        axios.put(`http://localhost:8001/task-update/${id}`, 
            { headers: { "Content-Type": "application/json" }}
        )
            .then((response) => {
                const updatedTodos = todo.map((todo) =>
                    todo.id === id ? response.data : todo
                );
                setTodo(updatedTodos);
            })
            .catch((error) => console.error(error));
    };

    const deleteTodo = (id) => {
        axios.delete(`http://localhost:8001/task-delete/${id}`)
            .then(() => setTodo(todo.filter((todo) => todo.id !== id)))
            .catch((error) => console.error(error));
    };
    return(
        <div>
            <div>
                <h2 class="todotitle">My To-do List</h2>
                <form method="post" class="form" onSubmit={(e) => e.preventDefault()}>
                    <input type="text" placeholder="Enter todo" class="form-input" 
                        onChange={(e) => setTitle(e.target.value)} value={title}/>
                    <input type="submit" value="Add Task" class="form-btn" onClick={addTodo}/>
                </form>
            </div>
            
            <div>
                {todo.map((todo) => (
                    <div class="todo-form" key={todo.id}>
                        <p class="todo-item">{todo.title}</p>
                        <div>
                            <FontAwesomeIcon icon={faPenToSquare} onClick={() => updateTodo(todo.id)}/>
                            <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(todo.id)}/>
                        </div>
                    </div>
                ))}
            </div> 
        </div>
    )
}