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
  Search
} from 'lucide-react'

// Pages (will create these next)
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import Leads from './pages/Leads'
import Tasks from './pages/Tasks'
import SettingsPage from './pages/Settings'

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <Briefcase size={28} color="#2563eb" />
            <span>Enterprise CRM</span>
          </div>
          <nav className="sidebar-nav">
            <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/clients" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <Users size={20} />
              <span>Clients</span>
            </NavLink>
            <NavLink to="/leads" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <UserPlus size={20} />
              <span>Leads</span>
            </NavLink>
            <NavLink to="/tasks" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <CheckSquare size={20} />
              <span>Tasks</span>
            </NavLink>
            <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <Settings size={20} />
              <span>Settings</span>
            </NavLink>
          </nav>
          <div style={{ padding: '24px', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '0.75rem', opacity: 0.5 }}>
            © 2026 bxzex CRM
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <header style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px', marginBottom: '32px', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
              <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search everything..." 
                style={{ width: '100%', padding: '10px 10px 10px 40px', border: '1px solid var(--border)', borderRadius: '8px', outline: 'none' }}
              />
            </div>
            <button className="btn-outline" style={{ padding: '8px', borderRadius: '50%' }}><Bell size={20} /></button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>bxzex Admin</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Enterprise Plan</div>
              </div>
              <div style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                <span style={{ margin: 'auto' }}>BX</span>
              </div>
            </div>
          </header>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
