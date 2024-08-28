const TodoItem = ({ todo, onUpdateTodo, onDeleteTodo }) => {
    const handleToggleCompleted = () => {
      onUpdateTodo(todo._id, { ...todo, completed: !todo.completed });
    };
  
    return (
      <li>
        <h2>{todo.title}</h2>
        <p>{todo.description}</p>
        <button onClick={handleToggleCompleted}>
          {todo.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
        </button>
        <button onClick={() => onDeleteTodo(todo._id)}>Delete</button>
      </li>
    );
  };
  
  export default TodoItem;
  