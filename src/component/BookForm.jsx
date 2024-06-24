import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingData = () => {
    const [formData, setFormData] = useState({
        bookingId: null,
        userName: '',
        groundId: '',
        userId: '',
        userDisplayName: ''
    });
    const [books, setBooks] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            userName: formData.userName,
            ground: {
                id: parseInt(formData.groundId)
            },
            user: {
                id: parseInt(formData.userId),
                userName: formData.userDisplayName
            }
        };

        try {
            if (formData.bookingId) {
                // Update operation
                await axios.put(`http://localhost:8080/book/update/${formData.bookingId}`, data);
                console.log('Data updated successfully');
            } else {
                // Create operation
                await axios.post('http://localhost:8080/book/save', data);
                console.log('Data sent successfully');
            }
            setFormData({
                bookingId: null,
                userName: '',
                groundId: '',
                userId: '',
                userDisplayName: ''
            });
            await fetchBooks(); // Fetch updated list of books after submission
        } catch (error) {
            console.error('Error sending data', error);
        }
    };

    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:8080/book/get');
            setBooks(response.data.data);
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
            await axios.delete(`http://localhost:8080/book/delete/${id}`);
            console.log('Data deleted successfully');
            fetchBooks(); // Fetch updated list of books after deletion
        } catch (error) {
            console.error('Error deleting data', error);
        }
    };

    const handleEdit = (book) => {
        setFormData({
            bookingId: book.bookingId, // Update to use bookingId
            userName: book.userName,
            groundId: book.ground.id.toString(),
            userId: book.user.id.toString(),
            userDisplayName: book.user.userName
        });
    };

    useEffect(() => {
        fetchBooks();
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
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Ground ID:</label>
                    <input
                        type="text"
                        name="groundId"
                        value={formData.groundId}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">User ID:</label>
                    <input
                        type="text"
                        name="userId"
                        value={formData.userId}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">User Display Name:</label>
                    <input
                        type="text"
                        name="userDisplayName"
                        value={formData.userDisplayName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    {formData.bookingId ? 'Update' : 'Submit'}
                </button>
            </form>

            <div className="w-full max-w-md">
                {books.map((book) => (
                    <div key={book.bookingId} className="bg-white p-4 rounded shadow-md mb-4">
                        <h3 className="text-lg font-bold mb-2">{book.userName}</h3>
                        <p className="text-gray-700 mb-2">Ground ID: {book.ground.id}</p>
                        <p className="text-gray-700 mb-2">User ID: {book.user.id}</p>
                        <p className="text-gray-700 mb-2">User Display Name: {book.userName}</p>
                        <button
                            onClick={() => handleDelete(book.bookingId)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2"
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => handleEdit(book)}
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

export default BookingData;