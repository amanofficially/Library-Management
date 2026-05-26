import React, { useEffect, useState } from 'react'
import {
  BookMarked, RefreshCw, X, Check,
  AlertCircle, RotateCcw, Calendar, User, BookOpen
} from 'lucide-react'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const EMPTY_FORM = { studentId: '', bookId: '' }

const Toast = ({ msg, type, onClose }) => (
  <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl animate-slide-up text-sm font-medium
    ${type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
    {type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
    {msg}
    <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100"><X size={14} /></button>
  </div>
)

const IssueBooks = () => {
  const [studentsBooks, setStudentsBooks] = useState([])
  const [formData, setFormData]           = useState(EMPTY_FORM)
  const [loading, setLoading]             = useState(false)
  const [submitting, setSubmitting]       = useState(false)
  const [returnId, setReturnId]           = useState(null)
  const [toast, setToast]                 = useState(null)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  const fetchIssuedBooks = async () => {
    setLoading(true)
    try {
      const res  = await fetch(`${BASE_URL}/issues/getStudentsWithBooks`)
      const data = await res.json()
      setStudentsBooks(data.data ?? [])
    } catch {
      showToast('Failed to load issued books', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchIssuedBooks() }, [])

  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch(`${BASE_URL}/issues/issueBook`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          studentId: Number(formData.studentId),
          bookId:    Number(formData.bookId),
        }),
      })
      if (!res.ok) throw new Error()
      showToast('Book issued successfully!')
      setFormData(EMPTY_FORM)
      fetchIssuedBooks()
    } catch {
      showToast('Failed to issue book', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const handleReturn = async (issueId) => {
    try {
      const res = await fetch(`${BASE_URL}/issues/return`, {
        method:  'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ issueId }),
      })
      if (!res.ok) throw new Error()
      showToast('Book returned successfully!')
      fetchIssuedBooks()
    } catch {
      showToast('Failed to return book', 'error')
    } finally {
      setReturnId(null)
    }
  }

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

  const daysSince = (d) =>
    Math.floor((Date.now() - new Date(d)) / 86400000)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* Page header */}
      <div className="page-header flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-600 flex items-center justify-center">
            <BookMarked size={20} className="text-white" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-ink-900">Issue Books</h1>
            <p className="text-ink-400 text-sm">{studentsBooks.length} active loans</p>
          </div>
        </div>
        <button onClick={fetchIssuedBooks} disabled={loading} className="btn-ghost text-sm self-start sm:self-auto">
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Issue form card */}
      <div className="card p-6 mb-8 animate-slide-up">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
            <BookOpen size={16} className="text-emerald-700" />
          </div>
          <h2 className="font-display font-semibold text-ink-900 text-lg">Issue a New Book</h2>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-ink-500 mb-1.5 uppercase tracking-wider">
              Student ID
            </label>
            <div className="relative">
              <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300 pointer-events-none" />
              <input
                type="number" name="studentId" required
                value={formData.studentId} onChange={handleChange}
                placeholder="Enter student ID"
                className="input-field pl-10"
                min="1"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-ink-500 mb-1.5 uppercase tracking-wider">
              Book ID
            </label>
            <div className="relative">
              <BookOpen size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300 pointer-events-none" />
              <input
                type="number" name="bookId" required
                value={formData.bookId} onChange={handleChange}
                placeholder="Enter book ID"
                className="input-field pl-10"
                min="1"
              />
            </div>
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full justify-center h-[46px]"
            >
              {submitting
                ? <><RefreshCw size={14} className="animate-spin" /> Issuing…</>
                : <><Check size={15} /> Issue Book</>
              }
            </button>
          </div>
        </form>
      </div>

      {/* Return confirm modal */}
      {returnId && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-ink-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="card w-full max-w-sm p-6 text-center animate-slide-up">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <RotateCcw size={22} className="text-emerald-700" />
            </div>
            <h3 className="font-display font-semibold text-ink-900 mb-2">Confirm Return</h3>
            <p className="text-ink-400 text-sm mb-6">
              Mark this book as returned? This will close the lending record.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setReturnId(null)} className="btn-secondary flex-1">Cancel</button>
              <button
                onClick={() => handleReturn(returnId)}
                className="flex-1 btn-primary justify-center bg-emerald-600 hover:bg-emerald-700"
              >
                <RotateCcw size={14} /> Confirm Return
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Issued books table */}
      <div className="card overflow-hidden animate-slide-up delay-100">
        <div className="px-6 py-4 border-b border-ink-100 flex items-center justify-between">
          <h2 className="font-display font-semibold text-ink-900">Active Lending Records</h2>
          <span className="badge-ink">{studentsBooks.length} loans</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-ink-300">
            <RefreshCw size={22} className="animate-spin mr-3" /> Loading records…
          </div>
        ) : studentsBooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-ink-300">
            <BookMarked size={40} className="mb-3 opacity-30" />
            <p className="font-medium text-ink-500">No active loans</p>
            <p className="text-sm mt-1">Issue a book above to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="table-header">
                  <th className="px-6 py-3.5 text-left text-xs">Issue ID</th>
                  <th className="px-6 py-3.5 text-left text-xs">Student</th>
                  <th className="px-6 py-3.5 text-left text-xs hidden md:table-cell">Book</th>
                  <th className="px-6 py-3.5 text-left text-xs hidden lg:table-cell">Issue Date</th>
                  <th className="px-6 py-3.5 text-left text-xs hidden xl:table-cell">Duration</th>
                  <th className="px-6 py-3.5 text-center text-xs">Action</th>
                </tr>
              </thead>
              <tbody>
                {studentsBooks.map((item, i) => {
                  const days = daysSince(item.issueDate)
                  const overdue = days > 14
                  return (
                    <tr
                      key={item.issueId}
                      className="table-row animate-slide-up"
                      style={{ animationDelay: `${i * 30}ms` }}
                    >
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs text-ink-400 bg-ink-50 px-2 py-1 rounded-md">
                          #{item.issueId}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-ink-700 flex items-center justify-center text-white text-[10px] font-semibold shrink-0">
                            {item.studentName?.[0]?.toUpperCase() ?? '?'}
                          </div>
                          <span className="font-medium text-ink-800 text-sm">{item.studentName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <BookOpen size={14} className="text-gold-500 shrink-0" />
                          <span className="text-ink-700 text-sm">{item.bookTitle}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <div className="flex items-center gap-1.5 text-ink-500 text-sm">
                          <Calendar size={13} className="text-ink-300" />
                          {formatDate(item.issueDate)}
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden xl:table-cell">
                        <span className={`badge ${overdue ? 'badge-red' : 'badge-green'}`}>
                          {days}d {overdue ? '• Overdue' : ''}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => setReturnId(item.issueId)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium hover:bg-emerald-100 transition-colors"
                        >
                          <RotateCcw size={12} /> Return
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default IssueBooks
