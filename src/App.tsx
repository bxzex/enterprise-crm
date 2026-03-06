import React from 'react'
import { HashRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  CheckSquare, 
  Settings, 
  Briefcase,
  Bell,
  Search,
  ChevronRight,
  LogOut
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Pages
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import Leads from './pages/Leads'
import Tasks from './pages/Tasks'
import SettingsPage from './pages/Settings'

function App() {
  return (
    <Router>
      <div className="flex h-screen w-screen bg-slate-50 overflow-hidden font-sans">
        {/* Modern Sidebar */}
        <aside className="w-72 bg-sidebar flex flex-col p-6 shadow-2xl z-20">
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="bg-accent p-2 rounded-xl shadow-lg shadow-accent/30 text-white">
              <Briefcase size={24} />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">Enterprise CRM</span>
          </div>

          <nav className="flex-1 space-y-2">
            <NavLink to="/" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <LayoutDashboard size={20} />
              <span className="font-medium">Dashboard</span>
            </NavLink>
            <NavLink to="/clients" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <Users size={20} />
              <span className="font-medium">Clients</span>
            </NavLink>
            <NavLink to="/leads" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <UserPlus size={20} />
              <span className="font-medium">Leads</span>
            </NavLink>
            <NavLink to="/tasks" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <CheckSquare size={20} />
              <span className="font-medium">Tasks</span>
            </NavLink>
            <NavLink to="/settings" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <Settings size={20} />
              <span className="font-medium">Settings</span>
            </NavLink>
          </nav>

          <div className="mt-auto pt-6 border-t border-white/5 space-y-4">
            <div className="bg-white/5 rounded-2xl p-4">
              <p className="text-xs text-slate-500 mb-1">Storage Usage</p>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-accent w-1/3 shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div>
              </div>
              <p className="text-[10px] text-slate-400 mt-2">Local Mode Active</p>
            </div>
            <button className="flex items-center gap-3 text-slate-400 hover:text-white px-4 py-2 transition-colors w-full">
              <LogOut size={18} />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {/* Header */}
          <header className="h-20 bg-white/50 backdrop-blur-xl border-b border-slate-200 px-8 flex items-center justify-between z-10">
            <div className="relative w-96 group">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors" />
              <input 
                type="text" 
                placeholder="Search resources, leads, or tasks..." 
                className="w-full bg-slate-100 border-none rounded-2xl py-2.5 pl-12 pr-4 focus:ring-2 focus:ring-accent/20 focus:bg-white transition-all text-sm outline-none"
              />
            </div>

            <div className="flex items-center gap-6">
              <button className="relative p-2 text-slate-500 hover:text-accent transition-colors">
                <Bell size={22} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              
              <div className="h-10 w-[1px] bg-slate-200"></div>

              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-900 leading-none">Admin User</p>
                  <p className="text-[11px] font-medium text-slate-500 mt-1 uppercase tracking-wider">System Administrator</p>
                </div>
                <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-accent/20 ring-2 ring-white">
                  AD
                </div>
              </div>
            </div>
          </header>

          {/* Content Wrapper */}
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <AnimatePresence mode="wait">
              <motion.div
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
