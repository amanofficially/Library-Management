import React, { useEffect, useState } from 'react'
import {
  BookOpen, Plus, Search, RefreshCw,
  X, Check, AlertCircle, BookMarked
} from 'lucide-react'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

// Fields matching the API: title, author, quantity
const EMPTY_FORM = { title: '', author: '', quantity: '' }

const COVER_IMAGES = [
  'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&q=80',
  'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&q=80',
  'https://images.unsplash.com/photo-1495640452828-3df6795cf69b?w=200&q=80',
  'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=200&q=80',
  'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=200&q=80',
  'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=200&q=80',
]

const coverFor = (id) => COVER_IMAGES[(id - 1) % COVER_IMAGES.length]

const Toast = ({ msg, type, onClose }) => (
  <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl animate-slide-up text-sm font-medium
    ${type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
    {type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
    {msg}
    <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100"><X size={14} /></button>
  </div>
)

const Books = () => {
  const [books, setBooks]           = useState([])
  const [filtered, setFiltered]     = useState([])
  const [formData, setFormData]     = useState(EMPTY_FORM)
  const [loading, setLoading]       = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [search, setSearch]         = useState('')
  const [showForm, setShowForm]     = useState(false)
  const [toast, setToast]           = useState(null)
  const [view, setView]             = useState('grid') // 'grid' | 'table'

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  // GET /books/getBooks
  const fetchBooks = async () => {
    setLoading(true)
    try {
      const res  = await fetch(`${BASE_URL}/books/getBooks`)
      const data = await res.json()
      setBooks(data.data ?? data ?? [])
    } catch {
      showToast('Failed to load books', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchBooks() }, [])

  useEffect(() => {
    const q = search.toLowerCase()
    setFiltered(
      q
        ? books.filter(b =>
            b.title?.toLowerCase().includes(q) ||
            b.author?.toLowerCase().includes(q)
          )
        : books
    )
  }, [search, books])

  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  // POST /books/create  — body: { title, author, quantity }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch(`${BASE_URL}/books/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          quantity: Number(formData.quantity), // API expects a number
        }),
      })
      if (!res.ok) throw new Error()
      showToast('Book added successfully!')
      setFormData(EMPTY_FORM)
      setShowForm(false)
      fetchBooks()
    } catch {
      showToast('Failed to add book', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* Page header */}
      <div className="page-header flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gold-500 flex items-center justify-center">
            <BookOpen size={20} className="text-white" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-ink-900">Books</h1>
            <p className="text-ink-400 text-sm">{books.length} titles in catalogue</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-ink-100 rounded-lg p-0.5">
            {['grid', 'table'].map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  view === v ? 'bg-white text-ink-800 shadow-sm' : 'text-ink-400 hover:text-ink-600'
                }`}
              >
                {v === 'grid' ? '⊞ Grid' : '☰ Table'}
              </button>
            ))}
          </div>
          <button onClick={fetchBooks} disabled={loading} className="btn-ghost text-sm">
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          </button>
          <button onClick={() => setShowForm(true)} className="btn-primary">
            <Plus size={15} /> Add Book
          </button>
        </div>
      </div>

      {/* Add book modal */}
      {showForm && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-ink-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="card w-full max-w-md p-7 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-semibold text-ink-900">Add New Book</h2>
              <button onClick={() => setShowForm(false)} className="btn-ghost p-2"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-ink-500 mb-1.5 uppercase tracking-wider">Book Title</label>
                <input
                  type="text" name="title" required
                  value={formData.title} onChange={handleChange}
                  placeholder="TypeScript Pro"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-ink-500 mb-1.5 uppercase tracking-wider">Author Name</label>
                <input
                  type="text" name="author" required
                  value={formData.author} onChange={handleChange}
                  placeholder="Anders Hejlsberg"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-ink-500 mb-1.5 uppercase tracking-wider">Quantity</label>
                <input
                  type="number" name="quantity" required
                  value={formData.quantity} onChange={handleChange}
                  placeholder="20"
                  min="1"
                  className="input-field"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary flex-1">Cancel</button>
                <button type="submit" disabled={submitting} className="btn-primary flex-1 justify-center">
                  {submitting ? <RefreshCw size={14} className="animate-spin" /> : <Check size={14} />}
                  {submitting ? 'Saving…' : 'Add Book'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative mb-6 animate-fade-in">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-300 pointer-events-none" />
        <input
          type="text"
          placeholder="Search by title or author…"
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

      {/* Content */}
      {loading ? (
        <div className="card flex items-center justify-center py-20 text-ink-300">
          <RefreshCw size={22} className="animate-spin mr-3" />Loading books…
        </div>
      ) : filtered.length === 0 ? (
        <div className="card flex flex-col items-center justify-center py-20 text-ink-300">
          <BookMarked size={40} className="mb-3 opacity-30" />
          <p className="font-medium text-ink-500">No books found</p>
          <p className="text-sm mt-1">{search ? 'Try different keywords' : 'Add your first book above'}</p>
        </div>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-slide-up">
          {filtered.map((book, i) => (
            <div
              key={book.id}
              className="card group overflow-hidden hover:shadow-card-hover transition-all duration-200 animate-slide-up"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="relative h-40 overflow-hidden bg-ink-100">
                <img
                  src={coverFor(book.id)}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => { e.target.style.display = 'none' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent" />
                <span className="absolute bottom-2 left-2 font-mono text-white text-[10px] bg-ink-900/60 px-1.5 py-0.5 rounded">
                  #{book.id}
                </span>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-ink-800 text-xs leading-snug line-clamp-2">{book.title}</h3>
                <p className="text-ink-400 text-xs mt-1 truncate">{book.author}</p>
                {book.quantity != null && (
                  <span className="badge-gold mt-2 inline-block">Qty: {book.quantity}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card overflow-hidden animate-slide-up">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="table-header">
                  <th className="px-6 py-3.5 text-left text-xs">Book</th>
                  <th className="px-6 py-3.5 text-left text-xs hidden md:table-cell">Author</th>
                  <th className="px-6 py-3.5 text-left text-xs hidden lg:table-cell">Quantity</th>
                  <th className="px-6 py-3.5 text-left text-xs hidden xl:table-cell">ID</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((book, i) => (
                  <tr key={book.id} className="table-row animate-slide-up" style={{ animationDelay: `${i * 25}ms` }}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={coverFor(book.id)}
                          alt=""
                          className="w-9 h-12 object-cover rounded-md shadow-sm shrink-0"
                        />
                        <div>
                          <p className="font-medium text-ink-800 text-sm">{book.title}</p>
                          <p className="text-ink-400 text-xs md:hidden">{book.author}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-ink-500 text-sm hidden md:table-cell">{book.author}</td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      {book.quantity != null
                        ? <span className="badge-gold">Qty: {book.quantity}</span>
                        : <span className="text-ink-300 text-sm">—</span>}
                    </td>
                    <td className="px-6 py-4 hidden xl:table-cell">
                      <span className="font-mono text-xs text-ink-400 bg-ink-50 px-2 py-1 rounded-md">#{book.id}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="text-xs text-ink-300 text-right mt-3">
        Showing {filtered.length} of {books.length} books
      </p>
    </div>
  )
}

export default Books
