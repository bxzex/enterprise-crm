import React, { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, X, Download, Search, Mail, Building2, ExternalLink } from 'lucide-react'
import { getStorage, setStorage, Client } from '../utils/storage'
import { exportToCSV } from '../utils/export'
import { motion, AnimatePresence } from 'framer-motion'

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [searchTerm, setSearchSearchTerm] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    status: 'Active' as 'Active' | 'Inactive' | 'Pending'
  })

  useEffect(() => {
    setClients(getStorage('clients', []))
  }, [])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    let updatedClients: Client[]
    if (editingClient) {
      updatedClients = clients.map(c => c.id === editingClient.id ? { ...c, ...formData } : c)
    } else {
      const newClient: Client = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString()
      }
      updatedClients = [...clients, newClient]
    }
    setClients(updatedClients)
    setStorage('clients', updatedClients)
    closeModal()
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      const updated = clients.filter(c => c.id !== id)
      setClients(updated)
      setStorage('clients', updated)
    }
  }

  const handleExport = () => {
    exportToCSV(clients, 'clients_list')
  }

  const openModal = (client: Client | null = null) => {
    if (client) {
      setEditingClient(client)
      setFormData({
        name: client.name,
        email: client.email,
        company: client.company,
        status: client.status
      })
    } else {
      setEditingClient(null)
      setFormData({ name: '', email: '', company: '', status: 'Active' })
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingClient(null)
  }

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.company.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Clients</h1>
          <p className="text-slate-500 font-medium mt-1">Manage your client relationships and accounts.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
            <Download size={16} />
            Export CSV
          </button>
          <button className="btn-primary flex items-center gap-2" onClick={() => openModal()}>
            <Plus size={18} />
            Add Client
          </button>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search clients..." 
              value={searchTerm}
              onChange={e => setSearchSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-accent/20 outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
            Displaying {filteredClients.length} Clients
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50 text-left">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Name</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Company</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Email</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClients.map(client => (
                <tr key={client.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-500 group-hover:bg-accent group-hover:text-white transition-colors">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900 leading-tight">{client.name}</p>
                        <p className="text-xs text-slate-400 font-medium">ID: #{client.id.slice(-4)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                      <Building2 size={14} className="text-slate-400" />
                      {client.company}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                      <Mail size={14} className="text-slate-400" />
                      {client.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider
                      ${client.status === 'Active' ? 'bg-emerald-100 text-emerald-600' : 
                        client.status === 'Pending' ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-600'}`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openModal(client)} className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-slate-400 hover:text-accent transition-all">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(client.id)} className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-slate-400 hover:text-rose-500 transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeModal} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">{editingClient ? 'Edit Client' : 'New Client'}</h2>
                <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-xl transition-colors"><X size={20} /></button>
              </div>
              <form onSubmit={handleSave} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="input-field" placeholder="Full name..." />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Company</label>
                    <input required type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="input-field" placeholder="Company..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Status</label>
                    <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})} className="input-field appearance-none">
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="input-field" placeholder="email@domain.com" />
                </div>
                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={closeModal} className="flex-1 px-6 py-3 border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
                  <button type="submit" className="flex-[2] btn-primary py-3 rounded-2xl">Save Client</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Clients
