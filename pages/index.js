import React, { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from './api/todo';
import Sidebar from './Sidebar/Sidebar';
import MainContent from './MainContent/MainContent';
import Header from './Header/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    try {
      const createdTodo = await createTodo(newTodo);
      setTodos([...todos, createdTodo]);
      setNewTodo({ title: '', description: '' });
      toast.success('Todo created successfully!');
    } catch (error) {
      toast.error('Failed to create todo.');
    }
  };

  const handleUpdateTodo = async (id, updatedTodo) => {
    try {
      const updated = await updateTodo(id, updatedTodo);
      setTodos(todos.map((t) => (t._id === id ? updated : t)));
      setSelectedTodo(null);  // Optionally reset the selected todo
      toast.success('Todo updated successfully!');
    } catch (error) {
      toast.error('Failed to update todo.');
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((t) => t._id !== id));
      setSelectedTodo(null);  // Optionally reset the selected todo
      toast.success('Todo deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete todo.');
    }
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
      <ToastContainer />
    </div>
  );
};

export default Home;
