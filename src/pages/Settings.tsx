import React, { useState, useEffect } from 'react'
import { Save, Shield, Bell, User, Database, Globe, Lock, Cpu } from 'lucide-react'
import { getStorage, setStorage } from '../utils/storage'
import { motion } from 'framer-motion'

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    companyName: 'Enterprise CRM',
    adminEmail: 'admin@example.com',
    notifications: true,
    darkMode: false,
    autoSave: true
  })

  useEffect(() => {
    setSettings(getStorage('app_settings', settings))
  }, [])

  const handleSave = () => {
    setStorage('app_settings', settings)
    alert('Settings saved successfully.')
  }

  const clearAllData = () => {
    if (window.confirm('WARNING: This will delete all your data permanently. Are you sure?')) {
      localStorage.clear()
      window.location.reload()
    }
  }

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Settings</h1>
          <p className="text-slate-500 font-medium mt-1">Manage your application preferences and data.</p>
        </div>
        <button className="btn-primary flex items-center gap-2" onClick={handleSave}>
          <Save size={18} />
          Save Settings
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <section className="glass-card overflow-hidden">
          <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm text-accent">
              <Cpu size={20} />
            </div>
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-900">General Settings</h2>
          </div>
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Company Name</label>
                <input type="text" value={settings.companyName} onChange={e => setSettings({...settings, companyName: e.target.value})} className="input-field" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Admin Email</label>
                <input type="email" value={settings.adminEmail} onChange={e => setSettings({...settings, adminEmail: e.target.value})} className="input-field" />
              </div>
            </div>
          </div>
        </section>

        <section className="glass-card overflow-hidden">
          <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm text-accent">
              <Shield size={20} />
            </div>
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-900">Preferences</h2>
          </div>
          <div className="p-8 space-y-6">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-accent/20 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm text-slate-400 group-hover:text-accent transition-colors">
                  <Bell size={20} />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900 leading-tight">Notifications</p>
                  <p className="text-xs text-slate-500 font-medium">Receive alerts for new leads and tasks.</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={settings.notifications} onChange={e => setSettings({...settings, notifications: e.target.checked})} className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent shadow-sm"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-accent/20 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm text-slate-400 group-hover:text-accent transition-colors">
                  <Database size={20} />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900 leading-tight">Auto-save</p>
                  <p className="text-xs text-slate-500 font-medium">Automatically save changes to local storage.</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={settings.autoSave} onChange={e => setSettings({...settings, autoSave: e.target.checked})} className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent shadow-sm"></div>
              </label>
            </div>
          </div>
        </section>

        <section className="glass-card overflow-hidden border-rose-100">
          <div className="p-6 bg-rose-50 border-b border-rose-100 flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm text-rose-500">
              <Lock size={20} />
            </div>
            <h2 className="text-sm font-black uppercase tracking-widest text-rose-900">Danger Zone</h2>
          </div>
          <div className="p-8">
            <p className="text-sm text-slate-500 font-medium mb-6">
              Deleting all data will permanently remove all clients, leads, and tasks. This action cannot be undone.
            </p>
            <button className="w-full px-6 py-4 bg-white border-2 border-rose-100 rounded-2xl font-black text-rose-500 hover:bg-rose-500 hover:text-white transition-all transform active:scale-[0.98] shadow-sm" onClick={clearAllData}>
              Delete All Data
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SettingsPage
