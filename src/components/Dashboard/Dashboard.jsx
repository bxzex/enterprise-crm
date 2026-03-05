import { TrendingUp, Users, DollarSign, Target, Plus, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { motion } from 'framer-motion';

const data = [
    { name: 'Mon', revenue: 4000, leads: 24 },
    { name: 'Tue', revenue: 3000, leads: 13 },
    { name: 'Wed', revenue: 2000, leads: 98 },
    { name: 'Thu', revenue: 2780, leads: 39 },
    { name: 'Fri', revenue: 1890, leads: 48 },
    { name: 'Sat', revenue: 2390, leads: 38 },
    { name: 'Sun', revenue: 3490, leads: 43 },
];

const StatCard = ({ title, value, icon: Icon, trend, color }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm"
    >
        <div className="flex justify-between items-start mb-4">
            <div className={`p-2.5 rounded-xl ${color}`}>
                <Icon size={22} className="text-white" />
            </div>
            <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${trend > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {trend > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {Math.abs(trend)}%
            </div>
        </div>
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">{value}</h3>
    </motion.div>
);

const Dashboard = ({ leads }) => {
    return (
        <div className="space-y-8 max-w-[1400px] mx-auto">

            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Workspace Overview</h1>
                    <p className="text-sm text-zinc-500">Welcome back, Brian. Here's what's happening today.</p>
                </div>
                <button className="flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-md shadow-zinc-200 dark:shadow-none">
                    <Plus size={18} />
                    Create Report
                </button>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Revenue" value="$145,200" icon={DollarSign} trend={12.5} color="bg-zinc-900 dark:bg-zinc-800" />
                <StatCard title="Active Leads" value={leads.length} icon={Users} trend={8.2} color="bg-zinc-900 dark:bg-zinc-800" />
                <StatCard title="Sales Target" value="84%" icon={Target} trend={-3.1} color="bg-zinc-900 dark:bg-zinc-800" />
                <StatCard title="Average Deal" value="$8,400" icon={TrendingUp} trend={4.5} color="bg-zinc-900 dark:bg-zinc-800" />
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="font-bold text-lg text-zinc-900 dark:text-white">Revenue Overview</h3>
                        <select className="bg-zinc-50 dark:bg-zinc-800 border-none text-xs font-bold px-3 py-1.5 rounded-lg outline-none">
                            <option>Last 7 Days</option>
                            <option>Last Month</option>
                        </select>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#18181b" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#18181b" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    cursor={{ stroke: '#cbd5e1', strokeWidth: 1 }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#18181b" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                    <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                        {leads.slice(0, 4).map((lead, idx) => (
                            <div key={idx} className="flex gap-4 items-start">
                                <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-zinc-800 flex items-center justify-center shrink-0 border border-slate-100 dark:border-zinc-700">
                                    <Clock size={16} className="text-zinc-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-zinc-900 dark:text-white">New Lead: {lead.name}</p>
                                    <p className="text-xs text-zinc-500 mt-0.5">Contact: {lead.contact}</p>
                                    <span className="inline-block mt-2 px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-[10px] uppercase font-bold text-zinc-600 dark:text-zinc-400">
                                        {lead.date}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-8 py-2.5 bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-bold rounded-xl hover:bg-zinc-100 transition-all uppercase tracking-wider">
                        View All Activity
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
