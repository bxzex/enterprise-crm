import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom'
import { Search, Menu } from './icons'
import { motion, AnimatePresence } from 'framer-motion'
import { getStorage, Client, Lead, Task } from './utils/storage'

// Pages
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import Leads from './pages/Leads'
import Tasks from './pages/Tasks'
import SettingsPage from './pages/Settings'

function App() {
  const defaultSettings = {
    companyName: 'Enterprise CRM',
    adminName: 'Admin User',
    adminEmail: 'admin@example.com'
  }

  const [settings, setSettings] = useState(defaultSettings)

  const loadSettings = () => {
    const saved = getStorage('app_settings', defaultSettings)
    // Ensure we have all required fields even if storage has old data
    setSettings({
      ...defaultSettings,
      ...saved
    })
  }

  useEffect(() => {
    loadSettings()
    window.addEventListener('settingsUpdated', loadSettings)
    return () => window.removeEventListener('settingsUpdated', loadSettings)
  }, [])

  const [navOpen, setNavOpen] = useState(false)
  const [query, setQuery] = useState('')

  const results = (() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    const has = (...parts: string[]) => parts.some(p => (p || '').toLowerCase().includes(q))
    return [
      ...(getStorage('clients', []) as Client[]).filter(c => has(c.name, c.company, c.email)).map(c => ({ key: `c-${c.id}`, label: `${c.name}, ${c.company}`, kind: 'Client', to: '/clients' })),
      ...(getStorage('leads', []) as Lead[]).filter(l => has(l.name, l.source)).map(l => ({ key: `l-${l.id}`, label: l.name, kind: 'Lead', to: '/leads' })),
      ...(getStorage('tasks', []) as Task[]).filter(t => has(t.title)).map(t => ({ key: `t-${t.id}`, label: t.title, kind: 'Task', to: '/tasks' })),
    ].slice(0, 8)
  })()

  const adminInitials = (settings.adminName || 'AU')
    .split(' ')
    .filter(Boolean)
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <Router>
      <div className="flex h-screen w-screen bg-slate-50 overflow-hidden font-sans">
        {navOpen && <div className="fixed inset-0 bg-slate-900/30 z-20 md:hidden" onClick={() => setNavOpen(false)} />}
        <aside className={`w-60 bg-sidebar border-r border-slate-200 flex flex-col p-4 z-30 fixed inset-y-0 left-0 transition-transform md:static md:translate-x-0 ${navOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="px-3 pt-2 pb-6">
            <span className="text-base font-bold text-slate-900 tracking-tight">{settings.companyName || 'Enterprise CRM'}</span>
          </div>

          <nav className="flex-1 space-y-1" onClick={() => setNavOpen(false)}>
            <NavLink to="/" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/clients" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <span>Clients</span>
            </NavLink>
            <NavLink to="/leads" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <span>Leads</span>
            </NavLink>
            <NavLink to="/tasks" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <span>Tasks</span>
            </NavLink>
            <NavLink to="/settings" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <span>Settings</span>
            </NavLink>
          </nav>

          <div className="mt-auto pt-4 border-t border-slate-200 text-sm">
            <p className="px-3 pb-3 text-xs text-slate-500">Data is saved in this browser only.</p>
            <a href="https://buy.stripe.com/9B6eVfd9E6OC3sr7cEaAw03" target="_blank" rel="noopener noreferrer" className="block px-3 py-1.5 text-slate-600 hover:text-slate-900">Support this project</a>
            <a href="https://github.com/bxzex/enterprise-crm" target="_blank" rel="noopener noreferrer" className="block px-3 py-1.5 text-slate-600 hover:text-slate-900">Source on GitHub</a>
            <p className="px-3 pt-3 text-xs text-slate-500">
              © 2026 <a href="https://bxzex.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-slate-700">bxzex</a>
            </p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 flex flex-col overflow-hidden relative">
          {/* Header */}
          <header className="h-14 shrink-0 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between gap-4 z-10">
            <button className="md:hidden p-1.5 -ml-1.5 text-slate-600" aria-label="Open menu" onClick={() => setNavOpen(true)}>
              <Menu size={20} />
            </button>
            <div className="relative flex-1 max-w-96">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Escape' && setQuery('')}
                placeholder="Search clients, leads and tasks"
                className="w-full bg-slate-100 border border-transparent rounded-md py-1.5 pl-9 pr-3 focus:border-accent focus:bg-white text-sm outline-none"
              />
              {query.trim() && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg max-h-80 overflow-y-auto">
                  {results.length === 0 ? (
                    <p className="px-3 py-3 text-sm text-slate-500">Nothing matches "{query.trim()}".</p>
                  ) : results.map(r => (
                    <Link key={r.key} to={r.to} onClick={() => setQuery('')} className="flex items-baseline justify-between gap-3 px-3 py-2 text-sm hover:bg-slate-50">
                      <span className="text-slate-900 truncate">{r.label}</span>
                      <span className="text-xs text-slate-500 shrink-0">{r.kind}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-900 leading-none">{settings.adminName || 'Admin User'}</p>
                <p className="text-xs text-slate-500 mt-1">Administrator</p>
              </div>
              <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-700 text-xs font-semibold">
                {adminInitials}
              </div>
            </div>
          </header>

          {/* Content Wrapper */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
            <AnimatePresence mode="wait">
              <motion.div
                key={window.location.hash}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/clients" element={<Clients />} />
                  <Route path="/leads" element={<Leads />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </Router>
  )
}

export default App
