import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import TodoItem from '../components/TodoItem';

const TodoApp = ({ token, user, logout }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchTodos = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/todos`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/todos`, 
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
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/todos/${id}`, 
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
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/todos/${id}`, {
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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <div className="w-10 h-10 border-4 rounded-full border-white/30 border-t-white animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="max-w-2xl pt-8 mx-auto">
        <div className="p-8 border shadow-2xl bg-white/95 backdrop-blur-sm rounded-3xl border-white/20">
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-gray-200">
            <div>
              <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text">
                Welcome back, {user.username}!
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                {completedCount} of {totalCount} tasks completed
              </p>
            </div>
            <button 
              onClick={logout} 
              className="px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 bg-gray-100 rounded-xl hover:bg-gray-200"
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
                className="flex-1 px-5 py-4 transition-all duration-300 border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 bg-white/90"
              />
              <button 
                type="submit" 
                className="px-6 py-4 font-semibold text-white transition-all duration-300 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl hover:-translate-y-1 hover:shadow-lg"
              >
                Add Task
              </button>
            </div>
          </form>

          <div className="grid grid-cols-3 gap-4 p-5 mb-8 bg-indigo-50 rounded-2xl">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{totalCount}</div>
              <div className="text-xs tracking-wide text-gray-600 uppercase">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{completedCount}</div>
              <div className="text-xs tracking-wide text-gray-600 uppercase">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{totalCount - completedCount}</div>
              <div className="text-xs tracking-wide text-gray-600 uppercase">Remaining</div>
            </div>
          </div>

          <div className="overflow-y-auto max-h-96">
            {todos.length === 0 ? (
              <div className="py-12 text-center text-gray-500">
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