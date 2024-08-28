import React, { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from './api/todo';
import Sidebar from './Sidebar/Sidebar';
import MainContent from './MainContent/MainContent';
import Header from './Header/Header';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      const fetchedTodos = await getTodos();
      setTodos(fetchedTodos);
    };
    fetchTodos();
  }, []);

  const handleCreateTodo = async () => {
    const createdTodo = await createTodo(newTodo);
    setTodos([...todos, createdTodo]);
    setNewTodo({ title: '', description: '' });
  };

  const handleUpdateTodo = async (id, updatedTodo) => {
    const updated = await updateTodo(id, updatedTodo);
    setTodos(todos.map((t) => (t._id === id ? updated : t)));
    setSelectedTodo(null);  // Optionally reset the selected todo
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter((t) => t._id !== id));
    setSelectedTodo(null);  // Optionally reset the selected todo
  };

  return (
    <div className="flex flex-col h-screen">
    <Header />
    <div className="flex flex-1 flex-col md:flex-row mt-10 mx-5">
      <Sidebar
        handleCreateTodo={handleCreateTodo}
        selectedTodo={selectedTodo}
        setSelectedTodo={setSelectedTodo}
        handleUpdateTodo={handleUpdateTodo}
        handleDeleteTodo={handleDeleteTodo}
      />
      <MainContent
        selectedTodo={selectedTodo}
        setNewTodo={setNewTodo}
        handleUpdateTodo={handleUpdateTodo}
        handleDeleteTodo={handleDeleteTodo}
        newTodo={newTodo}
      />
    </div>
  </div>
  );
};

export default Home;
