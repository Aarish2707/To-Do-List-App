import React from 'react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div className={`flex items-center justify-between p-4 bg-white/70 border border-gray-200 rounded-xl transition-all duration-300 hover:bg-white/90 hover:-translate-y-0.5 hover:shadow-md ${
      todo.completed ? 'opacity-70 bg-green-50/70' : ''
    }`}>
      <div className="flex items-center flex-1">
        <button
          className={`w-6 h-6 border-2 rounded-lg mr-4 flex items-center justify-center transition-all duration-300 hover:border-indigo-500 ${
            todo.completed 
              ? 'bg-green-500 border-green-500' 
              : 'border-gray-300 bg-white'
          }`}
          onClick={() => onToggle(todo._id, !todo.completed)}
        >
          {todo.completed && (
            <span className="text-white text-sm font-bold">✓</span>
          )}
        </button>
        <span className={`text-gray-800 transition-all duration-300 ${
          todo.completed ? 'line-through text-gray-500' : ''
        }`}>
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo._id)}
        className="px-3 py-1.5 bg-red-500 text-white text-xs font-medium rounded-lg hover:bg-red-600 transition-colors duration-200"
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;