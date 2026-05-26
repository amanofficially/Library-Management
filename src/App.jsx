import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Students from './pages/Students'
import Books from './pages/Books'
import IssueBooks from './pages/IssueBooks'

const App = () => (
  <Layout>
    <Routes>
      <Route path="/"            element={<Home />} />
      <Route path="/students"    element={<Students />} />
      <Route path="/books"       element={<Books />} />
      <Route path="/issue-books" element={<IssueBooks />} />
    </Routes>
  </Layout>
)

export default App
