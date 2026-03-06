import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Users, Zap } from 'lucide-react';

const revenueData = [
    { name: 'Jan', value: 45000 },
    { name: 'Feb', value: 52000 },
    { name: 'Mar', value: 48000 },
    { name: 'Apr', value: 61000 },
    { name: 'May', value: 55000 },
    { name: 'Jun', value: 67000 },
];

const conversionData = [
    { name: 'Discovery', value: 400 },
    { name: 'Proposal', value: 300 },
    { name: 'Negotiation', value: 200 },
    { name: 'Closed', value: 120 },
];

const COLORS = ['#18181b', '#3f3f46', '#71717a', '#a1a1aa'];

const Performance = () => {
    return (
        <div className="space-y-6 max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                            <TrendingUp size={20} className="text-zinc-900 dark:text-white" />
                        </div>
                        <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Conversion Rate</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h4 className="text-2xl font-bold text-zinc-900 dark:text-white">24.8%</h4>
                        <span className="text-xs font-bold text-emerald-600">+2.4%</span>
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                            <Target size={20} className="text-zinc-900 dark:text-white" />
                        </div>
                        <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Quota Attainment</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h4 className="text-2xl font-bold text-zinc-900 dark:text-white">92.1%</h4>
                        <span className="text-xs font-bold text-emerald-600">+5.1%</span>
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                            <Users size={20} className="text-zinc-900 dark:text-white" />
                        </div>
                        <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Pipeline Velocity</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h4 className="text-2xl font-bold text-zinc-900 dark:text-white">18 Days</h4>
                        <span className="text-xs font-bold text-rose-600">-2 Days</span>
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                            <Zap size={20} className="text-zinc-900 dark:text-white" />
                        </div>
                        <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Active Deals</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h4 className="text-2xl font-bold text-zinc-900 dark:text-white">142</h4>
                        <span className="text-xs font-bold text-emerald-600">+12</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                    <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-6">Monthly Revenue Stream</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Line type="monotone" dataKey="value" stroke="#18181b" strokeWidth={3} dot={{ fill: '#18181b', r: 4 }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                    <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-6">Sales Funnel Analysis</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={conversionData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                                    {conversionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Performance;
