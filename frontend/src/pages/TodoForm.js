import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import api from '../services/api';
import '../App.css';
import { jwtDecode } from "jwt-decode";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "./LanguageSwitcher";



export default function TodoForm() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editTodo, setEditTodo] = useState(null);

  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const { t } = useTranslation();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
        navigate('/'); 
        return;
    }

    try {
        const decoded = jwtDecode(token);
        setUsername(decoded.displayName);
    } catch (err) {
        console.error("Error decoding token:", err);
    }

    fetchTodos();
}, [navigate]);

const fetchTodos = async () => {
  try {
    const todosData = await api.getTodos();
    setTodos(todosData);
  } catch (err) {
    console.error("Error fetching todos:", err);
  }
};

  const addTodo = async () => {
    if (newTodo.trim()) {
      if (isEditing && editTodo) {
        await api.updateTodo(editTodo, { title: newTodo });
        setIsEditing(false);
        setEditTodo(null);
      } else {
        await api.addTodo({ title: newTodo });
      }
      setNewTodo('');
      fetchTodos();
    }
  };

  const handleEditTodo = (todo) => {
    setNewTodo(todo.title);
    setIsEditing(true);
    setEditTodo(todo.id);
  };

  const deleteTodo = async (id) => {
    try{
      await api.deleteTodo(id);
      fetchTodos();
    } catch(err){
      console.error("Error deleting todos:", err); 
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate('/');
  };

  return (
    <div className="App">
      <div>
        <h2 className="todotitle">{t('title')}</h2>
        {username && <h3>{t('greeting', { name: username })}</h3>}
        <div className="form">
          <input type="text" placeholder={t('enter')} className="form-input"
            onChange={(e) => setNewTodo(e.target.value)} value={newTodo} />
          <button onClick={addTodo} className="form-btn">
            {isEditing ? t('Update') : t('Add')}
          </button>
        </div>
      </div>

      <div>
        {todos.map((todo) => (
          <div className="todo-form" key={todo.id}>
            <p className="todo-item">{todo.title}</p>
            <div>
              <FontAwesomeIcon icon={faPenToSquare} onClick={() => handleEditTodo(todo)} />
              <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(todo.id)} />
            </div>
          </div>
        ))}
      </div>
      <div style={{textAlign: "left"}}>
        <LanguageSwitcher style={{marginTop: "0px"}}/>
        <button onClick={logout} className="logout-btn">Logout</button>
      </div>
    </div>
  )
}