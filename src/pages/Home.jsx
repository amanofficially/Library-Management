import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  BookOpen,
  BookMarked,
  TrendingUp,
  ArrowRight,
  RefreshCw,
  Library,
  BookCheck,
} from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const StatCard = ({ icon: Icon, label, value, color, delay = 0 }) => (
  <div
    className="stat-card animate-slide-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div
      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${color}`}
    >
      <Icon size={22} className="text-white" />
    </div>
    <div>
      <p className="text-ink-400 text-sm font-medium">{label}</p>
      <p className="text-2xl font-display font-bold text-ink-800 mt-0.5">
        {value ?? <span className="animate-pulse-soft text-ink-300">—</span>}
      </p>
    </div>
  </div>
);

const QuickAction = ({ to, icon: Icon, title, desc, color }) => (
  <Link
    to={to}
    className="card p-5 flex items-start gap-4 hover:shadow-card-hover transition-all duration-200 group animate-slide-up"
  >
    <div
      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${color}`}
    >
      <Icon size={20} className="text-white" />
    </div>
    <div className="flex-1 min-w-0">
      <h3 className="font-semibold text-ink-800 text-sm">{title}</h3>
      <p className="text-ink-400 text-xs mt-0.5 leading-relaxed">{desc}</p>
    </div>
    <ArrowRight
      size={16}
      className="text-ink-300 group-hover:text-gold-500 group-hover:translate-x-0.5 transition-all mt-1 shrink-0"
    />
  </Link>
);

const Home = () => {
  const [stats, setStats] = useState({
    students: null,
    books: null,
    issued: null,
  });
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [studentsRes, booksRes, issuedRes] = await Promise.allSettled([
        fetch(`${BASE_URL}/students/get`), // ✅ correct
        fetch(`${BASE_URL}/books/getBooks`), // ✅ correct
        fetch(`${BASE_URL}/issues/getStudentsWithBooks`), // ✅ correct
      ]);

      const s =
        studentsRes.status === "fulfilled"
          ? await studentsRes.value.json()
          : null;
      const b =
        booksRes.status === "fulfilled" ? await booksRes.value.json() : null;
      const i =
        issuedRes.status === "fulfilled" ? await issuedRes.value.json() : null;

      setStats({
        students: s?.data?.length ?? null,
        books: b?.data?.length ?? null,
        issued: i?.data?.length ?? null,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-3xl bg-ink-900 text-white mb-10 animate-fade-in">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1400&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 px-8 py-10 md:px-12 md:py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Library size={16} className="text-gold-400" />
              <span className="text-gold-400 text-xs font-mono uppercase tracking-widest">
                Welcome to Readify
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold leading-tight">
              Your Library,
              <br />
              <span className="text-gold-400">Beautifully Managed</span>
            </h1>
            <p className="text-ink-300 mt-3 text-sm max-w-md leading-relaxed">
              Effortlessly manage students, books, and lending records — all in
              one elegant dashboard.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&q=80"
            alt="Library books"
            className="hidden md:block w-42 h-30 object-cover rounded-2xl border border-white/10 shadow-xl"
          />
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl font-semibold text-ink-800">
          Overview
        </h2>
        <button
          onClick={fetchStats}
          disabled={loading}
          className="btn-ghost text-xs"
        >
          <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard
          icon={Users}
          label="Total Students"
          value={stats.students}
          color="bg-ink-700"
          delay={0}
        />
        <StatCard
          icon={BookOpen}
          label="Total Books"
          value={stats.books}
          color="bg-gold-500"
          delay={100}
        />
        <StatCard
          icon={BookMarked}
          label="Books Issued"
          value={stats.issued}
          color="bg-emerald-500"
          delay={200}
        />
        <StatCard
          icon={TrendingUp}
          label="Available Books"
          value={
            stats.books != null && stats.issued != null
              ? stats.books - stats.issued
              : null
          }
          color="bg-ink-500"
          delay={300}
        />
      </div>

      {/* Quick actions */}
      <h2 className="font-display text-xl font-semibold text-ink-800 mb-4">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        <QuickAction
          to="/students"
          icon={Users}
          title="Manage Students"
          desc="Add, view and manage all registered library members."
          color="bg-ink-700"
          delay={0}
        />
        <QuickAction
          to="/books"
          icon={BookOpen}
          title="Manage Books"
          desc="Browse and manage the complete book catalogue."
          color="bg-gold-500"
          delay={100}
        />
        <QuickAction
          to="/issue-books"
          icon={BookCheck}
          title="Issue & Return"
          desc="Issue books to students and track return status."
          color="bg-emerald-600"
          delay={200}
        />
      </div>

      {/* Info banner */}
      <div className="card p-6 flex flex-col md:flex-row items-start md:items-center gap-6 animate-fade-in">
        <img
          src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&q=80"
          alt="Reading"
          className="w-24 h-24 object-cover rounded-2xl shrink-0"
        />
        <div>
          <h3 className="font-display font-semibold text-ink-800 text-lg">
            Knowledge is Power
          </h3>
          <p className="text-ink-400 text-sm mt-1 leading-relaxed max-w-lg">
            Every book borrowed is a step toward learning. Readify helps you
            track every lending journey — from issue to return — so nothing ever
            gets lost in the stacks.
          </p>
          <Link to="/issue-books" className="btn-primary mt-4 text-xs">
            Issue a Book <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
