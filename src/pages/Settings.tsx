import React, { useState, useEffect } from 'react'
import { Save, Shield, Bell, User, Database } from 'lucide-react'
import { getStorage, setStorage } from '../utils/storage'

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    companyName: 'bxzex Enterprise',
    adminEmail: 'admin@bxzex.com',
    notifications: true,
    darkMode: false,
    autoSave: true
  })

  useEffect(() => {
    setSettings(getStorage('app_settings', settings))
  }, [])

  const handleSave = () => {
    setStorage('app_settings', settings)
    alert('Settings saved successfully!')
  }

  const clearAllData = () => {
    if (window.confirm('WARNING: This will delete all clients, leads, and tasks. Proceed?')) {
      localStorage.clear()
      window.location.reload()
    }
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>Settings</h1>
          <p>Configure your workspace and system preferences.</p>
        </div>
        <button className="btn btn-primary" onClick={handleSave}><Save size={18} /> Save Changes</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px' }}>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
            <User size={20} color="var(--primary)" />
            <h2 style={{ margin: 0, fontSize: '1.125rem' }}>General Configuration</h2>
          </div>
          <div className="form-group">
            <label>Organization Name</label>
            <input type="text" value={settings.companyName} onChange={e => setSettings({...settings, companyName: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Administrator Email</label>
            <input type="email" value={settings.adminEmail} onChange={e => setSettings({...settings, adminEmail: e.target.value})} />
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
            <Bell size={20} color="var(--primary)" />
            <h2 style={{ margin: 0, fontSize: '1.125rem' }}>Preferences</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input type="checkbox" checked={settings.notifications} onChange={e => setSettings({...settings, notifications: e.target.checked})} />
              <span>Enable Email Notifications</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input type="checkbox" checked={settings.autoSave} onChange={e => setSettings({...settings, autoSave: e.target.checked})} />
              <span>Enable Cloud-local Auto-save</span>
            </label>
          </div>
        </div>

        <div className="card" style={{ borderColor: '#fee2e2' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', borderBottom: '1px solid #fee2e2', paddingBottom: '12px' }}>
            <Database size={20} color="var(--danger)" />
            <h2 style={{ margin: 0, fontSize: '1.125rem', color: 'var(--danger)' }}>Data Management</h2>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
            The Enterprise CRM stores all data locally in your browser's persistent storage. No data is sent to external servers.
          </p>
          <button className="btn btn-outline" style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }} onClick={clearAllData}>
            Factory Reset (Wipe All Data)
          </button>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
