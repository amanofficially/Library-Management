import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="text-black px-10 py-4 flex justify-between items-center shadow-lg">
      {/* Logo */}
      <div>
        <h1 className="text-2xl font-bold">📚 Library Management</h1>
      </div>

      {/* Nav Links */}
      <ul className="flex gap-6 text-lg font-medium">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "bg-blue-100 text-slate-900 px-4 py-2 rounded-lg"
                : "hover:text-yellow-400 transition"
            }
          >
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/students"
            className={({ isActive }) =>
              isActive
                ? "bg-white text-slate-900 px-4 py-2 rounded-lg"
                : "hover:text-yellow-400 transition"
            }
          >
            Students
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/books"
            className={({ isActive }) =>
              isActive
                ? "bg-white text-slate-900 px-4 py-2 rounded-lg"
                : "hover:text-yellow-400 transition"
            }
          >
            Books
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/issue-books"
            className={({ isActive }) =>
              isActive
                ? "bg-white text-slate-900 px-4 py-2 rounded-lg"
                : "hover:text-yellow-400 transition"
            }
          >
            Issue Books
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
