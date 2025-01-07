import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8001/en',
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    console.warn("No access token found");
  } else {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers['Content-Type'] = 'application/json';
  return config;
});

const getTodos = async () => {
  try {
    const response = await api.get('/tasks/');
    return response.data;
  } catch (error) {
    console.error("Failed to fetch todos:", error.response?.data || error.message);
    throw error;
  }
};

const addTodo = async (todo) => {
  try{
    if (!todo || typeof todo !== 'object') {
      throw new Error("Invalid 'todo' object");
    }
    const response = await api.post('/tasks/', todo);
    return response.data;
  } catch (error){
    console.error("Failed to add todos:", error.response?.data || error.message);
    throw error;
  }
};

const updateTodo = async (id, updatedTodo) => {
  if (!updatedTodo || typeof updatedTodo !== 'object') {
    throw new Error("Invalid 'updatedTodo' object");
  }
  const response = await api.put(`/tasks/${id}/`, updatedTodo);
  return response.data;
};

const deleteTodo = async (id) => {
  await api.delete(`/tasks/${id}/`);
};

const links = {
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo,
  };

export default links;
