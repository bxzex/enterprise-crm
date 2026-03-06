import React, { useState, useEffect } from 'react'
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight 
} from 'lucide-react'
import { getStorage, Client, Lead } from '../utils/storage'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalClients: 0,
    totalLeads: 0,
    totalRevenue: 0,
    pendingTasks: 0
  })

  useEffect(() => {
    const clients = getStorage('clients', [])
    const leads = getStorage('leads', [])
    const tasks = getStorage('tasks', [])
    
    setStats({
      totalClients: clients.length,
      totalLeads: leads.length,
      totalRevenue: leads.reduce((acc: number, lead: Lead) => acc + (lead.value || 0), 0),
      pendingTasks: tasks.filter((t: any) => !t.completed).length
    })
  }, [])

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>Enterprise Dashboard</h1>
          <p>Welcome back, here's what's happening today.</p>
        </div>
        <button className="btn btn-primary">Generate Report</button>
      </div>

      <div className="stats-grid">
        <div className="card stat-card">
          <div className="stat-icon" style={{ background: '#dbeafe', color: '#2563eb' }}>
            <Users size={24} />
          </div>
          <div className="stat-info">
            <h3>Total Clients</h3>
            <p>{stats.totalClients}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--success)', marginTop: '4px' }}>
              <ArrowUpRight size={14} /> <span>12% from last month</span>
            </div>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-icon" style={{ background: '#fef3c7', color: '#d97706' }}>
            <TrendingUp size={24} />
          </div>
          <div className="stat-info">
            <h3>Active Leads</h3>
            <p>{stats.totalLeads}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--success)', marginTop: '4px' }}>
              <ArrowUpRight size={14} /> <span>5% from last month</span>
            </div>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-icon" style={{ background: '#dcfce7', color: '#059669' }}>
            <DollarSign size={24} />
          </div>
          <div className="stat-info">
            <h3>Pipeline Value</h3>
            <p>${stats.totalRevenue.toLocaleString()}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--success)', marginTop: '4px' }}>
              <ArrowUpRight size={14} /> <span>24% from last month</span>
            </div>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-icon" style={{ background: '#fee2e2', color: '#dc2626' }}>
            <Clock size={24} />
          </div>
          <div className="stat-info">
            <h3>Pending Tasks</h3>
            <p>{stats.pendingTasks}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--danger)', marginTop: '4px' }}>
              <ArrowDownRight size={14} /> <span>2 tasks overdue</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div className="card">
          <h2 style={{ fontSize: '1.125rem', marginBottom: '20px' }}>Recent Performance</h2>
          <div style={{ height: '300px', background: '#f8fafc', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            [Interactive Chart Placeholder]
          </div>
        </div>
        <div className="card">
          <h2 style={{ fontSize: '1.125rem', marginBottom: '20px' }}>Activity Stream</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[1,2,3,4].map(i => (
              <div key={i} style={{ display: 'flex', gap: '12px', fontSize: '0.875rem', borderBottom: i < 4 ? '1px solid var(--border)' : 'none', paddingBottom: '12px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', marginTop: '6px' }}></div>
                <div>
                  <div style={{ fontWeight: 600 }}>New lead qualified</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>2 hours ago by System</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
