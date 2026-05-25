import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const Students = () => {
  const BASE_URL = "https://prisma-learningapp-2.onrender.com/api";

  const [students, setStudents] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    course: "",
  });

  const [editId, setEditId] = useState(null);

  // ================= GET STUDENTS =================
  const fetchStudents = async () => {
    try {
      const response = await fetch(`${BASE_URL}/students/get`);

      const data = await response.json();

      setStudents(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= ADD & UPDATE =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // UPDATE STUDENT
    if (editId) {
      try {
        await fetch(`${BASE_URL}/students/update/${editId}`, {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        });

        alert("Student Updated Successfully");

        setEditId(null);

        setFormData({
          name: "",
          email: "",
          age: "",
          course: "",
        });

        fetchStudents();
      } catch (error) {
        console.log(error);
      }
    }

    // CREATE STUDENT
    else {
      try {
        await fetch(`${BASE_URL}/students/create`, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        });

        alert("Student Added Successfully");

        setFormData({
          name: "",
          email: "",
          age: "",
          course: "",
        });

        fetchStudents();
      } catch (error) {
        console.log(error);
      }
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      await fetch(`${BASE_URL}/students/delete/${id}`, {
        method: "DELETE",
      });

      alert("Student Deleted");

      fetchStudents();
    } catch (error) {
      console.log(error);
    }
  };

  // ================= EDIT =================
  const handleEdit = (student) => {
    setEditId(student.id);

    setFormData({
      name: student.name,
      email: student.email,
      age: student.age,
      course: student.course,
    });
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
            🎓 Students Management
          </h1>

          <button
            onClick={fetchStudents}
            className="bg-slate-900 text-white px-5 py-2 rounded-lg hover:bg-slate-700"
          >
            Refresh
          </button>
        </div>

        {/* Form */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-10">
          <h2 className="text-2xl font-semibold mb-5">
            {editId ? "Update Student" : "Add Student"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="number"
              name="age"
              placeholder="Enter Age"
              value={formData.age}
              onChange={handleChange}
              className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="text"
              name="course"
              placeholder="Enter Course"
              value={formData.course}
              onChange={handleChange}
              className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <button
              type="submit"
              className={`${
                editId
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white py-3 rounded-lg transition`}
            >
              {editId ? "Update Student" : "Add Student"}
            </button>
          </form>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto">
          <h2 className="text-2xl font-bold mb-5">📋 Students List</h2>

          <table className="w-full">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="p-3 text-left">ID</th>

                <th className="p-3 text-left">Name</th>

                <th className="p-3 text-left">Email</th>

                <th className="p-3 text-left">Age</th>

                <th className="p-3 text-left">Course</th>

                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="border-b hover:bg-slate-100 transition"
                >
                  <td className="p-3">{student.id}</td>

                  <td className="p-3">{student.name}</td>

                  <td className="p-3">{student.email}</td>

                  <td className="p-3">{student.age}</td>

                  <td className="p-3">{student.course}</td>

                  <td className="p-3 flex gap-3 justify-center">
                    <button
                      onClick={() => handleEdit(student)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(student.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
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

export default Students;
