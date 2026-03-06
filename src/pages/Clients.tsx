import React, { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, X, Download } from 'lucide-react'
import { getStorage, setStorage, Client } from '../utils/storage'

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
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

  const exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(clients));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "clients_export.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>Clients</h1>
          <p>Manage your corporate relationships and key accounts.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-outline" onClick={exportData}><Download size={18} /> Export</button>
          <button className="btn btn-primary" onClick={() => openModal()}><Plus size={18} /> Add Client</button>
        </div>
      </div>

      <div className="card" style={{ padding: '0' }}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Email</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  No clients found. Click "Add Client" to get started.
                </td>
              </tr>
            ) : clients.map(client => (
              <tr key={client.id}>
                <td style={{ fontWeight: 600 }}>{client.name}</td>
                <td>{client.company}</td>
                <td>{client.email}</td>
                <td>
                  <span className={`badge badge-${client.status.toLowerCase() === 'active' ? 'success' : client.status.toLowerCase() === 'pending' ? 'warning' : 'danger'}`}>
                    {client.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                    <button className="btn-outline" style={{ padding: '6px', borderRadius: '4px' }} onClick={() => openModal(client)}><Edit2 size={14} /></button>
                    <button className="btn-outline" style={{ padding: '6px', borderRadius: '4px', color: 'var(--danger)' }} onClick={() => handleDelete(client.id)}><Trash2 size={14} /></button>
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
              <h2 style={{ margin: 0 }}>{editingClient ? 'Edit Client' : 'Add New Client'}</h2>
              <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X /></button>
            </div>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Full Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Company</label>
                <input required type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})}>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px' }}>
                <button type="button" className="btn btn-outline" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Client</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Clients
