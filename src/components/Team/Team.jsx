import { useState, useEffect } from 'react';
import { Plus, MoreVertical, Mail, ShieldCheck, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Team = () => {
    const [team, setTeam] = useState(() => {
        const saved = localStorage.getItem('crm_team');
        return saved ? JSON.parse(saved) : [
            { name: 'Brian Ochoa', role: 'System Admin', email: 'brian@enterprise.crm', status: 'Active', avatar: 'BO' },
            { name: 'Alex Rivera', role: 'Sales Lead', email: 'alex@enterprise.crm', status: 'In Call', avatar: 'AR' },
            { name: 'Elena Chen', role: 'Account Executive', email: 'elena@enterprise.crm', status: 'Active', avatar: 'EC' },
            { name: 'Marcus Wright', role: 'Marketing Manager', email: 'marcus@enterprise.crm', status: 'Away', avatar: 'MW' },
        ];
    });

    const [showInviteModal, setShowInviteModal] = useState(false);
    const [newMember, setNewMember] = useState({ name: '', role: 'Account Executive', email: '' });

    useEffect(() => {
        localStorage.setItem('crm_team', JSON.stringify(team));
    }, [team]);

    const inviteMember = (e) => {
        e.preventDefault();
        const initials = newMember.name.split(' ').map(n => n[0]).join('').toUpperCase();
        setTeam(prev => [...prev, { ...newMember, status: 'Active', avatar: initials || '?' }]);
        setNewMember({ name: '', role: 'Account Executive', email: '' });
        setShowInviteModal(false);
    };

    const removeMember = (email) => {
        setTeam(prev => prev.filter(m => m.email !== email));
    };

    return (
        <div className="max-w-[1200px] mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Organization Structure</h2>
                    <p className="text-sm text-zinc-500 font-medium">Manage human capital and access levels</p>
                </div>
                <button
                    onClick={() => setShowInviteModal(true)}
                    className="flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm active:scale-95 transition-all"
                >
                    <Plus size={18} />
                    Invite Member
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {team.map((member, idx) => (
                        <motion.div
                            key={member.email}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm relative overflow-hidden group"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center font-bold text-zinc-900 dark:text-white border border-slate-100 dark:border-zinc-700">
                                    {member.avatar}
                                </div>
                                <button
                                    onClick={() => removeMember(member.email)}
                                    className="p-1 text-zinc-300 hover:text-rose-500 transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <div className="space-y-1">
                                <h4 className="font-bold text-zinc-900 dark:text-white group-hover:text-zinc-600 transition-colors">{member.name}</h4>
                                <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">{member.role}</p>
                            </div>

                            <div className="mt-6 pt-6 border-t border-slate-50 dark:border-zinc-800 space-y-4">
                                <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                                    <Mail size={14} />
                                    {member.email}
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${member.status === 'Active' ? 'bg-emerald-500' :
                                            member.status === 'In Call' ? 'bg-amber-500' : 'bg-slate-300'
                                            }`} />
                                        <span className="text-[10px] font-bold text-zinc-500 uppercase">{member.status}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-zinc-400">
                                        <ShieldCheck size={14} />
                                        <span className="text-[10px] font-bold uppercase">Authorized</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {showInviteModal && (
                    <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden"
                        >
                            <div className="p-6 border-b border-slate-100 dark:border-zinc-800 flex justify-between items-center">
                                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Invite Professional</h3>
                                <button onClick={() => setShowInviteModal(false)} className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                                    <Plus size={20} className="rotate-45" />
                                </button>
                            </div>
                            <form onSubmit={inviteMember} className="p-6 space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Full Name</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Enter name"
                                        value={newMember.name}
                                        onChange={e => setNewMember({ ...newMember, name: e.target.value })}
                                        className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-all"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Work Email</label>
                                    <input
                                        required
                                        type="email"
                                        placeholder="name@enterprise.crm"
                                        value={newMember.email}
                                        onChange={e => setNewMember({ ...newMember, email: e.target.value })}
                                        className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-all"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Organizational Role</label>
                                    <select
                                        value={newMember.role}
                                        onChange={e => setNewMember({ ...newMember, role: e.target.value })}
                                        className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-sm outline-none"
                                    >
                                        <option>Sales Lead</option>
                                        <option>Account Executive</option>
                                        <option>Marketing Manager</option>
                                        <option>System Admin</option>
                                    </select>
                                </div>
                                <button type="submit" className="w-full py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold text-sm shadow-xl active:scale-95 transition-all">
                                    Send Access Invitation
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Team;
