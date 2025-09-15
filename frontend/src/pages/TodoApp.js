import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from '../components/TodoItem';

const TodoApp = ({ token, user, logout }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/api/todos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const response = await axios.post('/api/todos', 
        { text: newTodo },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      const response = await axios.put(`/api/todos/${id}`, 
        { completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos(todos.map(todo => 
        todo._id === id ? response.data : todo
      ));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
          <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-200">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Welcome back, {user.username}!
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                {completedCount} of {totalCount} tasks completed
              </p>
            </div>
            <button 
              onClick={logout} 
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors duration-200 text-sm font-medium"
            >
              Logout
            </button>
          </div>

          <form onSubmit={addTodo} className="mb-8">
            <div className="flex gap-3">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="What needs to be done?"
                className="flex-1 px-5 py-4 border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 bg-white/90"
              />
              <button 
                type="submit" 
                className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-semibold hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                Add Task
              </button>
            </div>
          </form>

          <div className="grid grid-cols-3 gap-4 mb-8 p-5 bg-indigo-50 rounded-2xl">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{totalCount}</div>
              <div className="text-xs text-gray-600 uppercase tracking-wide">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{completedCount}</div>
              <div className="text-xs text-gray-600 uppercase tracking-wide">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{totalCount - completedCount}</div>
              <div className="text-xs text-gray-600 uppercase tracking-wide">Remaining</div>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {todos.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>No tasks yet. Add one above to get started!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {todos.map(todo => (
                  <TodoItem
                    key={todo._id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;