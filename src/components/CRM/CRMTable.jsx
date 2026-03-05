import { useState } from 'react';
import { Search, Plus, Filter, MoreHorizontal, Mail, ExternalLink, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CRMTable = ({ leads, onAdd, onDelete }) => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [newLead, setNewLead] = useState({ name: '', contact: '', status: 'Discovery', value: '', email: '' });

    const filteredLeads = leads.filter(lead =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.contact.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({ ...newLead, date: new Date().toISOString().split('T')[0] });
        setNewLead({ name: '', contact: '', status: 'Discovery', value: '', email: '' });
        setShowAddModal(false);
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'closed': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400';
            case 'negotiation': return 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400';
            case 'discovery': return 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400';
            case 'proposal': return 'bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400';
            default: return 'bg-zinc-100 text-zinc-700 dark:bg-zinc-500/10 dark:text-zinc-400';
        }
    };

    return (
        <div className="space-y-6 max-w-[1400px] mx-auto">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Lead Pipeline</h2>
                    <p className="text-sm text-zinc-500">Manage and track your business relationships.</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2"
                >
                    <Plus size={18} />
                    Add New Lead
                </button>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-800/30">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search leads..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 pr-4 py-1.5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-200 w-64"
                        />
                    </div>
                    <button className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 text-sm font-medium px-3 py-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg transition-all">
                        <Filter size={16} />
                        Filters
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-zinc-50/50 dark:bg-zinc-800/20 text-zinc-500 uppercase text-[10px] font-bold tracking-wider">
                                <th className="px-6 py-4">Company</th>
                                <th className="px-6 py-4">Primary Contact</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Deal Value</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                            <AnimatePresence>
                                {filteredLeads.map((lead) => (
                                    <motion.tr
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        key={lead.id}
                                        className="group hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-all"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                                                {lead.name}
                                                <ExternalLink size={12} className="text-zinc-300 group-hover:text-zinc-500 cursor-pointer" />
                                            </div>
                                            <div className="text-xs text-zinc-500">{lead.date}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{lead.contact}</div>
                                            <div className="text-xs text-zinc-400 flex items-center gap-1">
                                                <Mail size={10} />
                                                {lead.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${getStatusColor(lead.status)}`}>
                                                {lead.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-bold text-zinc-900 dark:text-white">{lead.value}</div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => onDelete(lead.id)}
                                                    className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md transition-all"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                                <button className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-all">
                                                    <MoreHorizontal size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>


            {showAddModal && (
                <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 dark:border-zinc-800"
                    >
                        <div className="p-6 border-b border-slate-100 dark:border-zinc-800 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Register New Lead</h3>
                            <button onClick={() => setShowAddModal(false)} className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                                <Plus size={20} className="rotate-45" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-zinc-500 uppercase">Company Name</label>
                                <input
                                    required
                                    type="text"
                                    value={newLead.name}
                                    onChange={e => setNewLead({ ...newLead, name: e.target.value })}
                                    className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-200"
                                    placeholder="e.g. Acme Corp"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-zinc-500 uppercase">Contact Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={newLead.contact}
                                        onChange={e => setNewLead({ ...newLead, contact: e.target.value })}
                                        className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-200"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-zinc-500 uppercase">Deal Value</label>
                                    <input
                                        required
                                        type="text"
                                        value={newLead.value}
                                        onChange={e => setNewLead({ ...newLead, value: e.target.value })}
                                        className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-200"
                                        placeholder="$10,000"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-zinc-500 uppercase">Contact Email</label>
                                <input
                                    required
                                    type="email"
                                    value={newLead.email}
                                    onChange={e => setNewLead({ ...newLead, email: e.target.value })}
                                    className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-200"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-zinc-500 uppercase">Lifecycle Stage</label>
                                <select
                                    value={newLead.status}
                                    onChange={e => setNewLead({ ...newLead, status: e.target.value })}
                                    className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-200"
                                >
                                    <option>Discovery</option>
                                    <option>Proposal</option>
                                    <option>Negotiation</option>
                                    <option>Closed</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold text-sm mt-4 shadow-lg active:scale-[0.98] transition-all"
                            >
                                Create Lead Record
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default CRMTable;
