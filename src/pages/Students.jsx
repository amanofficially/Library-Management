import React, { useEffect, useState } from 'react'
import {
  Users, Plus, Search, RefreshCw, Trash2,
  UserCircle2, X, Check, AlertCircle
} from 'lucide-react'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

// Fields matching the API: name, email, age, course
const EMPTY_FORM = { name: '', email: '', age: '', course: '' }

const Toast = ({ msg, type, onClose }) => (
  <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl animate-slide-up text-sm font-medium
    ${type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
    {type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
    {msg}
    <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100"><X size={14} /></button>
  </div>
)

const Students = () => {
  const [students, setStudents]     = useState([])
  const [filtered, setFiltered]     = useState([])
  const [formData, setFormData]     = useState(EMPTY_FORM)
  const [loading, setLoading]       = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [search, setSearch]         = useState('')
  const [showForm, setShowForm]     = useState(false)
  const [toast, setToast]           = useState(null)
  const [deleteId, setDeleteId]     = useState(null)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  // GET /students/get
  const fetchStudents = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/students/get`)
      const data = await res.json()
      setStudents(data.data ?? data ?? [])
    } catch (err) {
      showToast('Failed to load students', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchStudents() }, [])

  useEffect(() => {
    const q = search.toLowerCase()
    setFiltered(
      q
        ? students.filter(s =>
            s.name?.toLowerCase().includes(q) ||
            s.email?.toLowerCase().includes(q) ||
            s.course?.toLowerCase().includes(q)
          )
        : students
    )
  }, [search, students])

  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  // POST /students/create  — body: { name, email, age, course }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch(`${BASE_URL}/students/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          age: Number(formData.age), // API expects a number
        }),
      })
      if (!res.ok) throw new Error()
      showToast('Student added successfully!')
      setFormData(EMPTY_FORM)
      setShowForm(false)
      fetchStudents()
    } catch {
      showToast('Failed to add student', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  // DELETE /students/delete/:id
  const handleDelete = async (id) => {
    try {
      await fetch(`${BASE_URL}/students/delete/${id}`, { method: 'DELETE' })
      showToast('Student removed')
      fetchStudents()
    } catch {
      showToast('Failed to delete student', 'error')
    } finally {
      setDeleteId(null)
    }
  }

  const initials = (name) =>
    name ? name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() : '?'

  const avatarColor = (name) => {
    const colors = [
      'bg-ink-700', 'bg-gold-500', 'bg-emerald-600',
      'bg-blue-600', 'bg-purple-600', 'bg-rose-600',
    ]
    const idx = (name?.charCodeAt(0) ?? 0) % colors.length
    return colors[idx]
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* Page header */}
      <div className="page-header flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-ink-800 flex items-center justify-center">
            <Users size={20} className="text-white" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-ink-900">Students</h1>
            <p className="text-ink-400 text-sm">{students.length} registered members</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={fetchStudents} disabled={loading} className="btn-ghost text-sm">
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
          <button onClick={() => setShowForm(true)} className="btn-primary">
            <Plus size={15} /> Add Student
          </button>
        </div>
      </div>

      {/* Add student modal */}
      {showForm && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-ink-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="card w-full max-w-md p-7 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-semibold text-ink-900">Add New Student</h2>
              <button onClick={() => setShowForm(false)} className="btn-ghost p-2"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-ink-500 mb-1.5 uppercase tracking-wider">Full Name</label>
                <input
                  type="text" name="name" required
                  value={formData.name} onChange={handleChange}
                  placeholder="Neha Singh"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-ink-500 mb-1.5 uppercase tracking-wider">Email Address</label>
                <input
                  type="email" name="email" required
                  value={formData.email} onChange={handleChange}
                  placeholder="neha@gmail.com"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-ink-500 mb-1.5 uppercase tracking-wider">Age</label>
                <input
                  type="number" name="age" required
                  value={formData.age} onChange={handleChange}
                  placeholder="21"
                  min="1"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-ink-500 mb-1.5 uppercase tracking-wider">Course</label>
                <input
                  type="text" name="course" required
                  value={formData.course} onChange={handleChange}
                  placeholder="MERN Stack Developer"
                  className="input-field"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary flex-1">Cancel</button>
                <button type="submit" disabled={submitting} className="btn-primary flex-1 justify-center">
                  {submitting ? <RefreshCw size={14} className="animate-spin" /> : <Check size={14} />}
                  {submitting ? 'Saving…' : 'Add Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-ink-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="card w-full max-w-sm p-6 text-center animate-slide-up">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <Trash2 size={22} className="text-red-600" />
            </div>
            <h3 className="font-display font-semibold text-ink-900 mb-2">Remove Student?</h3>
            <p className="text-ink-400 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 btn-danger justify-center">
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search bar */}
      <div className="relative mb-6 animate-fade-in">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-300 pointer-events-none" />
        <input
          type="text"
          placeholder="Search by name, email, or course…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field pl-11"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-300 hover:text-ink-600">
            <X size={15} />
          </button>
        )}
      </div>

      {/* Students table */}
      <div className="card overflow-hidden animate-slide-up">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-ink-300">
            <RefreshCw size={22} className="animate-spin mr-3" />
            Loading students…
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-ink-300">
            <UserCircle2 size={40} className="mb-3 opacity-30" />
            <p className="font-medium text-ink-500">No students found</p>
            <p className="text-sm mt-1">{search ? 'Try a different search term' : 'Add your first student above'}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="table-header">
                  <th className="px-6 py-3.5 text-left text-xs">Student</th>
                  <th className="px-6 py-3.5 text-left text-xs hidden sm:table-cell">Email</th>
                  <th className="px-6 py-3.5 text-left text-xs hidden md:table-cell">Course</th>
                  <th className="px-6 py-3.5 text-left text-xs hidden lg:table-cell">Age</th>
                  <th className="px-6 py-3.5 text-left text-xs hidden lg:table-cell">ID</th>
                  <th className="px-6 py-3.5 text-center text-xs w-20">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((student, i) => (
                  <tr
                    key={student.id}
                    className="table-row animate-slide-up"
                    style={{ animationDelay: `${i * 30}ms` }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0 ${avatarColor(student.name)}`}>
                          {initials(student.name)}
                        </div>
                        <span className="font-medium text-ink-800 text-sm">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-ink-500 text-sm hidden sm:table-cell">{student.email}</td>
                    <td className="px-6 py-4 text-ink-500 text-sm hidden md:table-cell">{student.course || '—'}</td>
                    <td className="px-6 py-4 text-ink-500 text-sm hidden lg:table-cell">{student.age || '—'}</td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span className="font-mono text-xs text-ink-400 bg-ink-50 px-2 py-1 rounded-md">#{student.id}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => setDeleteId(student.id)}
                        className="p-2 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Remove student"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-xs text-ink-300 text-right mt-3">
        Showing {filtered.length} of {students.length} students
      </p>
    </div>
  )
}

export default Students
