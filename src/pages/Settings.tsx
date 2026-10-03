import React, { useState, useEffect } from 'react'

import { getStorage, setStorage, loadSampleData } from '../utils/storage'

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    companyName: 'Enterprise CRM',
    adminName: 'Admin User',
    adminEmail: 'admin@example.com',
    notifications: true,
    darkMode: false,
    autoSave: true
  })

  useEffect(() => {
    const saved = getStorage('app_settings', settings)
    setSettings(saved)
  }, [])

  const handleSave = () => {
    setStorage('app_settings', settings)
    // Dispatch event to notify App component
    window.dispatchEvent(new Event('settingsUpdated'))
    alert('Settings saved.')
  }

  const restoreSample = () => {
    if (window.confirm('Replace your current clients, leads and tasks with the sample data?')) {
      loadSampleData()
      window.location.reload()
    }
  }

  const clearAllData = () => {
    if (window.confirm('Delete all clients, leads and tasks? This cannot be undone.')) {
      setStorage('clients', [])
      setStorage('leads', [])
      setStorage('tasks', [])
      window.location.reload()
    }
  }

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Settings</h1>
          <p className="text-slate-500 font-medium mt-1">Manage your application preferences and data.</p>
        </div>
        <button className="btn-primary flex items-center gap-2" onClick={handleSave}>
          Save Settings
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <section className="glass-card overflow-hidden">
          <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center gap-3">
            <h2 className="text-sm font-semibold text-slate-900">General Settings</h2>
          </div>
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500">Company Name</label>
                <input type="text" value={settings.companyName} onChange={e => setSettings({...settings, companyName: e.target.value})} className="input-field" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500">Admin Name</label>
                <input type="text" value={settings.adminName} onChange={e => setSettings({...settings, adminName: e.target.value})} className="input-field" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500">Admin Email</label>
                <input type="email" value={settings.adminEmail} onChange={e => setSettings({...settings, adminEmail: e.target.value})} className="input-field" />
              </div>
            </div>
          </div>
        </section>

        <section className="glass-card overflow-hidden">
          <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center gap-3">
            <h2 className="text-sm font-semibold text-slate-900">Data</h2>
          </div>
          <div className="p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-900 leading-tight">Sample data</p>
              <p className="text-sm text-slate-500 mt-1">Replace everything with the sample clients, leads and tasks, dated from today.</p>
            </div>
            <button className="shrink-0 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50" onClick={restoreSample}>
              Load sample data
            </button>
          </div>
        </section>

        <section className="glass-card overflow-hidden border-rose-100">
          <div className="p-6 bg-rose-50 border-b border-rose-100 flex items-center gap-3">
            <h2 className="text-sm font-semibold text-rose-900">Danger Zone</h2>
          </div>
          <div className="p-8">
            <p className="text-sm text-slate-500 font-medium mb-6">
              Deleting all data will permanently remove all clients, leads, and tasks. This action cannot be undone.
            </p>
            <button className="w-full px-6 py-4 bg-white border-2 border-rose-100 rounded-lg font-semibold text-rose-500 hover:bg-rose-500 hover:text-white transition-all transform active:scale-[0.98] shadow-sm" onClick={clearAllData}>
              Delete All Data
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SettingsPage
