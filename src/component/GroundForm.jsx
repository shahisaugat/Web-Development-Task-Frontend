import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GroundForm = () => {
  const [formData, setFormData] = useState({
    id: null,
    name: ''
  });
  const [grounds, setGrounds] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: formData.name
    };

    try {
      if (formData.id) {
        // Update operation
        await axios.put(`http://localhost:8080/ground/update/${formData.id}`, data);
        console.log('Ground updated successfully');
      } else {
        // Create operation
        await axios.post('http://localhost:8080/ground/save', data);
        console.log('Ground saved successfully');
      }
      setFormData({
        id: null,
        name: ''
      });
      fetchGrounds(); // Fetch updated list of grounds after submission
    } catch (error) {
      console.error('Error sending data', error);
    }
  };

  const fetchGrounds = async () => {
    try {
      const response = await axios.get('http://localhost:8080/ground/get');
      setGrounds(response.data.data);
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
      await axios.delete(`http://localhost:8080/ground/delete/${id}`);
      console.log('Ground deleted successfully');
      fetchGrounds(); // Fetch updated list of grounds after deletion
    } catch (error) {
      console.error('Error deleting data', error);
    }
  };

  const handleEdit = (ground) => {
    setFormData({
      id: ground.id,
      name: ground.name
    });
  };

  useEffect(() => {
    fetchGrounds();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">Ground Form</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Ground Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          {formData.id ? 'Update' : 'Submit'}
        </button>
      </form>

      <div className="w-full max-w-md">
        {grounds.map((ground) => (
          <div key={ground.id} className="bg-white p-4 rounded shadow-md mb-4">
            <h3 className="text-lg font-bold mb-2">{ground.name}</h3>
            <button
              onClick={() => handleDelete(ground.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2"
            >
              Delete
            </button>
            <button
              onClick={() => handleEdit(ground)}
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

export default GroundForm;
