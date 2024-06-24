import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = () => {
  const [formData, setFormData] = useState({
    Id: null,
    userName: ''
  });
  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      userName: formData.userName
    };

    try {
      if (formData.Id) {
        // Update operation
        await axios.put(`http://localhost:8080/user/update/${formData.Id}`, data);
        console.log('User updated successfully');
      } else {
        // Create operation
        await axios.post('http://localhost:8080/user/save', data);
        console.log('User saved successfully');
      }
      setFormData({
        Id: null,
        userName: ''
      });
      fetchUsers(); // Fetch updated list of users after submission
    } catch (error) {
      console.error('Error sending data', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/user/get');
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.error('Invalid ID');
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/user/delete/${id}`);
      console.log('User deleted successfully');
      fetchUsers(); // Fetch updated list of users after deletion
    } catch (error) {
      console.error('Error deleting data', error);
    }
  };

  const handleEdit = (user) => {
    setFormData({
      Id: user.Id,
      userName: user.userName
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">User Form</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">User Name:</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          {formData.Id ? 'Update' : 'Submit'}
        </button>
      </form>

      <div className="w-full max-w-md">
        {users.map((user) => (
          <div key={user.Id} className="bg-white p-4 rounded shadow-md mb-4">
            <h3 className="text-lg font-bold mb-2">{user.userName}</h3>
            <button
              onClick={() => handleDelete(user.Id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2"
            >
              Delete
            </button>
            <button
              onClick={() => handleEdit(user)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserForm;
