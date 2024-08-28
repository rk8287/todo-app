import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../api/todo';
import Loader from '../Loader/Loader';

const imageOne = require('../../public/Vector.png');

function Sidebar({ handleCreateTodo, selectedTodo, setSelectedTodo, handleUpdateTodo, handleDeleteTodo }) {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const fetchTodos = async () => {
        try {
            const data = await getTodos();
            setTodos(data);
        } catch (error) {
            setError('Failed to fetch todos.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchTodos();
    }, []);

    useEffect(() => {
        // Re-fetch todos after creating, updating, or deleting a todo
        fetchTodos();
    }, [handleCreateTodo, handleUpdateTodo, handleDeleteTodo]);

    const handleTodoClick = (todo) => {
        setSelectedTodo(todo);
    };

    const filteredTodos = todos.filter(todo =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <Loader />; // Display the loader while loading
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="w-full md:w-1/4 bg-gray-100 p-4 border-r border-gray-300 h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <button
                        onClick={handleCreateTodo}
                        className="text-lg font-bold bg-black text-white pt-1 pb-1 px-3 flex items-center rounded-lg ml-4"
                    >
                        <Image src={imageOne} alt="TODO" height={16} width={16} className="mr-2" />
                        TODO
                    </button>
                </div>
                <div className="relative">

                    <div
                        className="p-5 pr-10 overflow-hidden w-[20px] h-[20px] hover:w-[200px] shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center hover:duration-300 duration-300"
                    >
                        <div className="flex items-center justify-center fill-black">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                id="Isolation_Mode"
                                data-name="Isolation Mode"
                                viewBox="0 0 24 24"
                                width="22"
                                height="22"
                            >
                                <path
                                    d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"
                                ></path>
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="outline-none text-[20px] bg-transparent w-full text-black font-normal px-4"
                        />
                    </div>

                </div>
            </div>

            {/* List of Items */}
            <div className="space-y-2">
                {filteredTodos.length > 0 ? (
                    filteredTodos.map((todo) => (
                        <div
                        key={todo._id}
                        onClick={() => handleTodoClick(todo)}
                        className={`w-full p-5 bg-white rounded-lg border cursor-pointer overflow-auto ${selectedTodo?._id === todo._id ? 'border-black' : 'border-gray-300'
                            }`}
                    >
                        <h3 className="text-md font-bold">{todo.title}</h3>
                        <div className="flex flex-col md:flex-row md:justify-between items-start">
                            <p className="text-sm text-gray-600 break-words flex-1">{todo.description}</p>
                            <span className="text-xs text-gray-400 mt-2 md:mt-0 md:pl-5">{formatDate(todo.createdAt)}</span>
                        </div>
                    </div>
                    
                    ))
                ) : (
                    <div>No todos available.</div>
                )}
            </div>
        </div>
    );
}

export default Sidebar;
