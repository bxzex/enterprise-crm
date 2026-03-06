import React, { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, X, Filter, Target, Zap, TrendingUp } from 'lucide-react'
import { getStorage, setStorage, Lead } from '../utils/storage'
import { motion, AnimatePresence } from 'framer-motion'

const Leads = () => {
  const [leads, setLeads] = useState<Lead[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingLead, setEditingLead] = useState<Lead | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    source: 'Website',
    value: 0,
    status: 'New' as 'New' | 'Contacted' | 'Qualified' | 'Lost'
  })

  useEffect(() => {
    setLeads(getStorage('leads', []))
  }, [])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    let updatedLeads: Lead[]
    if (editingLead) {
      updatedLeads = leads.map(l => l.id === editingLead.id ? { ...l, ...formData } : l)
    } else {
      const newLead: Lead = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString()
      }
      updatedLeads = [...leads, newLead]
    }
    setLeads(updatedLeads)
    setStorage('leads', updatedLeads)
    closeModal()
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this sales opportunity?')) {
      const updated = leads.filter(l => l.id !== id)
      setLeads(updated)
      setStorage('leads', updated)
    }
  }

  const openModal = (lead: Lead | null = null) => {
    if (lead) {
      setEditingLead(lead)
      setFormData({
        name: lead.name,
        email: lead.email,
        source: lead.source,
        value: lead.value,
        status: lead.status
      })
    } else {
      setEditingLead(null)
      setFormData({ name: '', email: '', source: 'Website', value: 0, status: 'New' })
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingLead(null)
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Sales Pipeline</h1>
          <p className="text-slate-500 font-medium mt-1">Acquisition funnel and deal velocity tracking.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
            <Filter size={16} />
            Pipeline Filter
          </button>
          <button className="btn-primary flex items-center gap-2" onClick={() => openModal()}>
            <Zap size={18} />
            Inject Opportunity
          </button>
        </div>
      </div>

      {/* Pipeline Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['New', 'Contacted', 'Qualified', 'Lost'].map((status) => (
          <div key={status} className="glass-card p-4 border-l-4 border-l-accent/20">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{status}</p>
            <p className="text-xl font-black text-slate-900">
              {leads.filter(l => l.status === status).length} <span className="text-xs font-medium text-slate-400">Leads</span>
            </p>
          </div>
        ))}
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50 text-left">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Target</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Origin</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Projected Value</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Stage</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-slate-400 font-medium">
                    Pipeline empty. Initiate outbound sequences to populate.
                  </td>
                </tr>
              ) : leads.map(lead => (
                <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                        <Target size={16} />
                      </div>
                      <p className="text-sm font-bold text-slate-900 leading-tight">{lead.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold px-2 py-1 bg-slate-100 rounded text-slate-600">{lead.source}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm font-black text-slate-900">
                      <TrendingUp size={14} className="text-emerald-500" />
                      ${lead.value?.toLocaleString() || 0}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        lead.status === 'Qualified' ? 'bg-emerald-500' : 
                        lead.status === 'Lost' ? 'bg-rose-500' : 'bg-orange-500'
                      }`} />
                      <span className="text-xs font-bold text-slate-700">{lead.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openModal(lead)} className="text-slate-400 hover:text-accent p-1.5"><Edit2 size={16} /></button>
                      <button onClick={() => handleDelete(lead.id)} className="text-slate-400 hover:text-rose-500 p-1.5"><Trash2 size={16} /></button>
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
              <div className="p-8 border-b border-slate-100">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Lead Intelligence</h2>
              </div>
              <form onSubmit={handleSave} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Contact Identity</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="input-field" placeholder="Full name..." />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Capture Source</label>
                    <select value={formData.source} onChange={e => setFormData({...formData, source: e.target.value})} className="input-field appearance-none">
                      <option value="Website">Inbound Web</option>
                      <option value="Referral">Network Referral</option>
                      <option value="LinkedIn">Social Outreach</option>
                      <option value="Cold Outreach">Cold Matrix</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Deal Valuation ($)</label>
                    <input required type="number" value={formData.value} onChange={e => setFormData({...formData, value: parseInt(e.target.value) || 0})} className="input-field" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Pipeline Stage</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})} className="input-field appearance-none">
                    <option value="New">Initial Contact</option>
                    <option value="Contacted">Active Discussion</option>
                    <option value="Qualified">High Probability</option>
                    <option value="Lost">Closed/Lost</option>
                  </select>
                </div>
                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={closeModal} className="flex-1 px-6 py-3 border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
                  <button type="submit" className="flex-[2] btn-primary py-3 rounded-2xl">Commit to Pipeline</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Leads
