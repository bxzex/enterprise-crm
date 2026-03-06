import React, { useState, useEffect } from 'react'
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreVertical,
  Calendar,
  ChevronRight
} from 'lucide-react'
import { getStorage, Client, Lead } from '../utils/storage'
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

const data = [
  { name: 'Mon', revenue: 4000, leads: 24 },
  { name: 'Tue', revenue: 3000, leads: 13 },
  { name: 'Wed', revenue: 2000, leads: 98 },
  { name: 'Thu', revenue: 2780, leads: 39 },
  { name: 'Fri', revenue: 1890, leads: 48 },
  { name: 'Sat', revenue: 2390, leads: 38 },
  { name: 'Sun', revenue: 3490, leads: 43 },
]

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

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-500 font-medium mt-1">Overview of your business performance.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
            <Calendar size={16} />
            Last 30 Days
          </button>
          <button className="btn-primary" onClick={handleExport}>
            Export Data
          </button>
        </div>
      </div>

      {/* Modern Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'bg-emerald-500', trend: '+24.5%', positive: true },
          { label: 'Active Leads', value: stats.totalLeads, icon: TrendingUp, color: 'bg-blue-500', trend: '+12.3%', positive: true },
          { label: 'Total Clients', value: stats.totalClients, icon: Users, color: 'bg-violet-500', trend: '-2.1%', positive: false },
          { label: 'Pending Tasks', value: stats.pendingTasks, icon: Clock, color: 'bg-orange-500', trend: '+4.4%', positive: true },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.color} p-3 rounded-2xl text-white shadow-lg`}>
                <stat.icon size={22} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${stat.positive ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                {stat.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.trend}
              </div>
            </div>
            <h3 className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">{stat.label}</h3>
            <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            <div className="absolute -bottom-4 -right-4 text-slate-100 opacity-0 group-hover:opacity-100 transition-opacity transform scale-150 pointer-events-none">
              <stat.icon size={100} />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-black text-slate-900">Revenue Overview</h2>
              <p className="text-sm text-slate-500 font-medium">Revenue over the last 7 days</p>
            </div>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400">
              <MoreVertical size={20} />
            </button>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-slate-900">Lead Conversions</h2>
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="leads" fill="#2563eb" radius={[6, 6, 6, 6]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-100">
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-slate-500 uppercase tracking-widest text-[10px]">Benchmark</span>
              <span className="text-slate-900">84.2%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="glass-card p-8">
        <h2 className="text-xl font-black text-slate-900 mb-6">Recent Activity</h2>
        <div className="space-y-6">
          {[1,2,3].map(i => (
            <div key={i} className="flex items-center gap-4 group cursor-pointer p-3 -m-3 hover:bg-slate-50 rounded-2xl transition-colors">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 font-bold group-hover:bg-accent group-hover:text-white transition-colors shadow-sm">
                AL
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="text-sm font-black text-slate-900 tracking-tight">Acme Limited <span className="font-medium text-slate-400">upgraded their</span> Subscription</p>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">2m ago</span>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">New client activity detected.</p>
              </div>
              <ChevronRight size={18} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
