import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Students from "./pages/Students";
import Books from "./pages/Books";
import IssueBooks from "./pages/IssueBooks";

const App = () => {
  return (
    <>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Students Page */}
        <Route path="/students" element={<Students />} />

        {/* Books Page */}
        <Route path="/books" element={<Books />} />

        {/* Issue Books Page */}
        <Route path="/issue-books" element={<IssueBooks />} />
      </Routes>
    </>
  );
};

export default App;
