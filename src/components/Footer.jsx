import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & About */}
        <div>
          <h1 className="text-2xl font-bold mb-3">📚 Library Management</h1>

          <p className="text-gray-300 leading-7">
            Manage students, books, and issued books easily with our Library
            Management System.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>

          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-white cursor-pointer transition">
              Dashboard
            </li>

            <li className="hover:text-white cursor-pointer transition">
              Students
            </li>

            <li className="hover:text-white cursor-pointer transition">
              Books
            </li>

            <li className="hover:text-white cursor-pointer transition">
              Issue Books
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact</h2>

          <p className="text-gray-300 mb-2">📧 support@library.com</p>

          <p className="text-gray-300 mb-2">📞 +91 9876543210</p>

          <p className="text-gray-300">📍 Bhopal, India</p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 text-center py-4 text-gray-400">
        © 2026 Library Management System. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
