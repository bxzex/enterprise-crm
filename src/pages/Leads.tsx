import React, { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, X, Filter } from 'lucide-react'
import { getStorage, setStorage, Lead } from '../utils/storage'

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
    if (window.confirm('Are you sure you want to delete this lead?')) {
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
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>Sales Leads</h1>
          <p>Track your pipeline and convert opportunities into clients.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-outline"><Filter size={18} /> Filter</button>
          <button className="btn btn-primary" onClick={() => openModal()}><Plus size={18} /> Add Lead</button>
        </div>
      </div>

      <div className="card" style={{ padding: '0' }}>
        <table>
          <thead>
            <tr>
              <th>Contact Name</th>
              <th>Source</th>
              <th>Deal Value</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  No leads in pipeline. Time to start prospecting!
                </td>
              </tr>
            ) : leads.map(lead => (
              <tr key={lead.id}>
                <td style={{ fontWeight: 600 }}>{lead.name}</td>
                <td>{lead.source}</td>
                <td>${lead.value?.toLocaleString() || 0}</td>
                <td>
                  <span className={`badge badge-${lead.status.toLowerCase() === 'qualified' ? 'success' : lead.status.toLowerCase() === 'lost' ? 'danger' : 'warning'}`}>
                    {lead.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                    <button className="btn-outline" style={{ padding: '6px', borderRadius: '4px' }} onClick={() => openModal(lead)}><Edit2 size={14} /></button>
                    <button className="btn-outline" style={{ padding: '6px', borderRadius: '4px', color: 'var(--danger)' }} onClick={() => handleDelete(lead.id)}><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ margin: 0 }}>{editingLead ? 'Edit Lead' : 'New Prospect'}</h2>
              <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X /></button>
            </div>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Contact Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label>Source</label>
                  <select value={formData.source} onChange={e => setFormData({...formData, source: e.target.value})}>
                    <option value="Website">Website</option>
                    <option value="Referral">Referral</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Cold Outreach">Cold Outreach</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Deal Value ($)</label>
                  <input required type="number" value={formData.value} onChange={e => setFormData({...formData, value: parseInt(e.target.value) || 0})} />
                </div>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})}>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px' }}>
                <button type="button" className="btn btn-outline" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Prospect</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Leads
