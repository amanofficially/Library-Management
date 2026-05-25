import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const [students, setStudents] = useState([]);

  // Fetch Students
  useEffect(() => {
    fetch("https://prisma-learningapp-2.onrender.com/api/students/get")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Average Age
  const averageAge =
    students.length > 0
      ? Math.floor(
          students.reduce((acc, item) => acc + item.age, 0) / students.length,
        )
      : 0;

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full">
          {/* Left Side */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              📚 Library <br />
              Management System
            </h1>

            <p className="text-gray-900 mt-6 text-lg leading-8">
              Manage students, books, issued books, and library activities
              easily using our modern Library Management Dashboard.
            </p>

            <button
              className="mt-8 bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white px-6 py-3 rounded-xl text-lg font-semibold transition"
              onClick={() => {}}
            >
              Explore Dashboard
            </button>
          </div>

          {/* Right Side Image */}
          <div className="flex justify-center">
            <img src="image.png" alt="Library" className="h-100 md:w-112.5" />
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <div className="p-8 bg-slate-100 min-h-screen">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800">
            📊 Dashboard Overview
          </h1>

          <p className="text-gray-600 mt-2">
            Manage students and courses easily
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Students */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">
              Total Students
            </h2>

            <p className="text-4xl font-bold text-blue-600 mt-3">
              {students.length}
            </p>
          </div>

          {/* Courses */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">
              Total Courses
            </h2>

            <p className="text-4xl font-bold text-green-600 mt-3">
              {[...new Set(students.map((item) => item.course))].length}
            </p>
          </div>

          {/* Age */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">Average Age</h2>

            <p className="text-4xl font-bold text-purple-600 mt-3">
              {averageAge}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-md mt-10 p-6 overflow-x-auto">
          <h2 className="text-2xl font-bold text-slate-800 mb-5">
            Student Details
          </h2>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="p-3 text-left">ID</th>

                <th className="p-3 text-left">Name</th>

                <th className="p-3 text-left">Email</th>

                <th className="p-3 text-left">Age</th>

                <th className="p-3 text-left">Course</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;
