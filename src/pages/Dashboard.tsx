import React, { useState, useEffect, useMemo } from 'react'
import { getStorage, Client, Lead, Task } from '../utils/storage'
import { exportToCSV } from '../utils/export'
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts'
import { format, subDays, startOfDay, isWithinInterval, parseISO } from 'date-fns'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalClients: 0,
    totalLeads: 0,
    totalRevenue: 0,
    pendingTasks: 0
  })
  const [recentActivity, setRecentActivity] = useState<any[]>([])
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    const clients: Client[] = getStorage('clients', [])
    const leads: Lead[] = getStorage('leads', [])
    const tasks: Task[] = getStorage('tasks', [])
    
    // Stats calculation
    setStats({
      totalClients: clients.length,
      totalLeads: leads.length,
      totalRevenue: leads.reduce((acc: number, lead: Lead) => acc + (lead.value || 0), 0),
      pendingTasks: tasks.filter((t: any) => !t.completed).length
    })

    // Recent Activity calculation
    const activity = [
      ...clients.map(c => ({
        id: `c-${c.id}`,
        type: 'client',
        title: c.name,
        action: 'added as a client',
        date: c.createdAt,
        color: 'bg-slate-100 text-slate-600'
      })),
      ...leads.map(l => ({
        id: `l-${l.id}`,
        type: 'lead',
        title: l.name,
        action: `came in as a lead from ${l.source}`,
        date: l.createdAt,
        color: 'bg-blue-100 text-blue-600'
      })),
      ...tasks.map(t => ({
        id: `t-${t.id}`,
        type: 'task',
        title: t.title,
        action: t.completed ? 'marked done' : 'added as a task',
        date: t.createdAt || t.dueDate, // Fallback to dueDate if createdAt is missing
        color: t.completed ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'
      }))
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

    setRecentActivity(activity)

    // Chart Data calculation (Last 7 days)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(new Date(), i)
      return {
        date,
        name: format(date, 'EEE'),
        revenue: 0,
        leads: 0
      }
    }).reverse()

    leads.forEach(lead => {
      const leadDate = parseISO(lead.createdAt)
      const dayIndex = last7Days.findIndex(day => 
        format(day.date, 'yyyy-MM-dd') === format(leadDate, 'yyyy-MM-dd')
      )
      if (dayIndex !== -1) {
        last7Days[dayIndex].leads += 1
        last7Days[dayIndex].revenue += lead.value || 0
      }
    })

    setChartData(last7Days)
  }, [])

  const handleExport = () => {
    const clients = getStorage('clients', [])
    const leads = getStorage('leads', [])
    const tasks = getStorage('tasks', [])
    
    const combinedData = [
      ...clients.map((c: any) => ({ ...c, type: 'Client' })),
      ...leads.map((l: any) => ({ ...l, type: 'Lead' })),
      ...tasks.map((t: any) => ({ ...t, type: 'Task' }))
    ]
    
    exportToCSV(combinedData, 'crm_summary')
  }

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000)
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return format(date, 'MMM d')
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-slate-500 font-medium mt-1">Pipeline, clients and tasks at a glance.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-primary" onClick={handleExport}>
            Export CSV
          </button>
        </div>
      </div>

      {/* Professional Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Pipeline value', value: `$${stats.totalRevenue.toLocaleString()}`, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
          { label: 'Leads', value: stats.totalLeads, color: 'text-blue-600', bgColor: 'bg-blue-50' },
          { label: 'Clients', value: stats.totalClients, color: 'text-slate-600', bgColor: 'bg-slate-50' },
          { label: 'Open tasks', value: stats.pendingTasks, color: 'text-orange-600', bgColor: 'bg-orange-50' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 group hover:border-slate-300 transition-all duration-200">
            <h3 className="text-slate-500 text-xs font-bold mb-1">{stat.label}</h3>
            <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">New pipeline, last 7 days</h2>
              <p className="text-sm text-slate-500 font-medium">Value of the leads added each day</p>
            </div>
          </div>
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1f5a94" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1f5a94" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '6px', border: '1px solid #e2e8f0', boxShadow: 'none', fontSize: 13 }}
                  formatter={(value: any) => [`$${value.toLocaleString()}`, 'Lead value']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#1f5a94" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-slate-900">Leads added per day</h2>
          </div>
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '6px', border: '1px solid #e2e8f0', boxShadow: 'none', fontSize: 13 }}
                />
                <Bar dataKey="leads" fill="#1f5a94" radius={[2, 2, 0, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-100">
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-slate-500 text-xs">Conversion Rate</span>
              <span className="text-slate-900">
                {stats.totalLeads > 0 ? ((stats.totalClients / (stats.totalLeads + stats.totalClients)) * 100).toFixed(1) : 0}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="glass-card p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-slate-900">Recent Activity</h2>
        </div>
        <div className="space-y-4">
          {recentActivity.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-slate-500 font-medium">Nothing yet. Add a client, lead or task to see it here.</p>
            </div>
          ) : recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="text-sm font-semibold text-slate-900 tracking-tight">
                    {activity.title} <span className="font-medium text-slate-500">{activity.action}</span>
                  </p>
                  <span className="text-xs font-bold text-slate-500">
                    {formatRelativeTime(activity.date)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
