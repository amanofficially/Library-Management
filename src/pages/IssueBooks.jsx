// src/pages/IssueBooks.jsx

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const IssueBooks = () => {
  const BASE_URL = "https://prisma-learningapp-2.onrender.com/api";

  const [studentsBooks, setStudentsBooks] = useState([]);

  const [formData, setFormData] = useState({
    studentId: "",
    bookId: "",
  });

  // ================= GET ISSUED BOOKS =================
  const fetchIssuedBooks = async () => {
    try {
      const response = await fetch(`${BASE_URL}/issues/getStudentsWithBooks`);

      const data = await response.json();

      setStudentsBooks(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchIssuedBooks();
  }, []);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= ISSUE BOOK =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(`${BASE_URL}/issues/issueBook`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          studentId: Number(formData.studentId),
          bookId: Number(formData.bookId),
        }),
      });

      alert("Book Issued Successfully");

      setFormData({
        studentId: "",
        bookId: "",
      });

      fetchIssuedBooks();
    } catch (error) {
      console.log(error);
    }
  };

  // ================= RETURN BOOK =================
  const handleReturnBook = async (issueId) => {
    try {
      await fetch(`${BASE_URL}/issues/return`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          issueId,
        }),
      });

      alert("Book Returned Successfully");

      fetchIssuedBooks();
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
          <h1 className="text-4xl font-bold text-slate-800">📕 Issue Books</h1>

          <button
            onClick={fetchIssuedBooks}
            className="bg-slate-900 text-white px-5 py-2 rounded-lg hover:bg-slate-700"
          >
            Refresh
          </button>
        </div>

        {/* Issue Form */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-10">
          <h2 className="text-2xl font-semibold mb-5">Issue New Book</h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <input
              type="number"
              name="studentId"
              placeholder="Enter Student ID"
              value={formData.studentId}
              onChange={handleChange}
              className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="number"
              name="bookId"
              placeholder="Enter Book ID"
              value={formData.bookId}
              onChange={handleChange}
              className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
            >
              Issue Book
            </button>
          </form>
        </div>

        {/* Issued Books Table */}
        <div className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto">
          <h2 className="text-2xl font-bold mb-5">📚 Issued Books List</h2>

          <table className="w-full">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="p-3 text-left">Issue ID</th>

                <th className="p-3 text-left">Student Name</th>

                <th className="p-3 text-left">Book Title</th>

                <th className="p-3 text-left">Issue Date</th>

                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {studentsBooks.map((item) => (
                <tr
                  key={item.issueId}
                  className="border-b hover:bg-slate-100 transition"
                >
                  <td className="p-3">{item.issueId}</td>

                  <td className="p-3">{item.studentName}</td>

                  <td className="p-3">{item.bookTitle}</td>

                  <td className="p-3">
                    {new Date(item.issueDate).toLocaleDateString()}
                  </td>

                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleReturnBook(item.issueId)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                    >
                      Return Book
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default IssueBooks;
