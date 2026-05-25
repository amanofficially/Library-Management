// src/pages/Books.jsx

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const Books = () => {
  const BASE_URL = "https://prisma-learningapp-2.onrender.com/api";

  const [books, setBooks] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    quantity: "",
  });

  // ================= GET BOOKS =================
  const fetchBooks = async () => {
    try {
      const response = await fetch(`${BASE_URL}/books/getBooks`);

      const data = await response.json();

      setBooks(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= ADD BOOK =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(`${BASE_URL}/books/create`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title: formData.title,
          author: formData.author,
          quantity: Number(formData.quantity),
        }),
      });

      alert("Book Added Successfully");

      setFormData({
        title: "",
        author: "",
        quantity: "",
      });

      fetchBooks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Main Container */}
      <div className="p-8 bg-slate-100 min-h-screen">
        {/* Heading */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800">
            📚 Books Management
          </h1>

          <button
            onClick={fetchBooks}
            className="bg-slate-900 text-white px-5 py-2 rounded-lg hover:bg-slate-700"
          >
            Refresh
          </button>
        </div>

        {/* Add Book Form */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-10">
          <h2 className="text-2xl font-semibold mb-5">
            Add New Book
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <input
              type="text"
              name="title"
              placeholder="Enter Book Title"
              value={formData.title}
              onChange={handleChange}
              className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="text"
              name="author"
              placeholder="Enter Author Name"
              value={formData.author}
              onChange={handleChange}
              className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="number"
              name="quantity"
              placeholder="Enter Quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
            >
              Add Book
            </button>
          </form>
        </div>

        {/* Books Table */}
        <div className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto">
          <h2 className="text-2xl font-bold mb-5">
            📖 Books List
          </h2>

          <table className="w-full">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="p-3 text-left">ID</th>

                <th className="p-3 text-left">Title</th>

                <th className="p-3 text-left">Author</th>

                <th className="p-3 text-left">Quantity</th>
              </tr>
            </thead>

            <tbody>
              {books.map((book) => (
                <tr
                  key={book.id}
                  className="border-b hover:bg-slate-100 transition"
                >
                  <td className="p-3">{book.id}</td>

                  <td className="p-3">{book.title}</td>

                  <td className="p-3">{book.author}</td>

                  <td className="p-3">{book.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Books;