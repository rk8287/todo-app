import React, { useState, useEffect } from 'react';

const MainContent = ({ selectedTodo, newTodo, setNewTodo, handleUpdateTodo, handleDeleteTodo }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTodo((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateClick = () => {
    if (selectedTodo) {
      handleUpdateTodo(selectedTodo._id, {
        title: newTodo.title,
        description: newTodo.description
      });
    }
  };

  const handleDeleteClick = () => {
    if (selectedTodo) {
      handleDeleteTodo(selectedTodo._id);
    }
  };

  useEffect(() => {
    if (selectedTodo) {
      setNewTodo({
        title: selectedTodo.title,
        description: selectedTodo.description
      });
    }
  }, [selectedTodo]);

  return (
    <div className="flex-1 p-6 bg-white">
      <div className="flex flex-col md:flex-row md:justify-between items-start mb-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full md:w-2/3 mt-4 p-2 rounded-lg text-2xl focus:border-transparent focus:outline-none font-bold"
          value={newTodo.title || ''}
          onChange={handleChange}
        />
        {/* Conditionally render the delete button */}
        {selectedTodo && (
          <button className="text-gray-600 hover:text-black md:ml-4 mt-4 md:mt-0" onClick={handleDeleteClick}>🗑️</button>
        )}
      </div>
      <div className="flex space-x-2 mb-4">
        <button className="px-3 py-1 border border-gray-300 rounded-lg">B</button>
        <button className="px-3 py-1 border border-gray-300 rounded-lg">I</button>
        <button className="px-3 py-1 border border-gray-300 rounded-lg">U</button>
        <button className="px-3 py-1 border border-gray-300 rounded-lg">...</button>
      </div>
      <div className="border-t border-gray-300 pt-4">
        <textarea
          name="description"
          id="message"
          placeholder="Type your message here..."
          className="w-full h-80 rounded-lg p-2 focus:border-transparent focus:outline-none resize-none"
          value={newTodo.description || ''}
          onChange={handleChange}
        ></textarea>
        {/* Conditionally render the update button */}
        {selectedTodo && (
          <button onClick={handleUpdateClick} className="px-4 py-2 bg-black text-white rounded-lg mt-4">
            Update Todo
          </button>
        )}
      </div>
    </div>
  );
};

export default MainContent;
