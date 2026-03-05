import { Plus, MoreVertical, Mail, ShieldCheck } from 'lucide-react';

const Team = () => {
    const members = [
        { name: 'Brian Ochoa', role: 'System Admin', email: 'brian@enterprise.crm', status: 'Active', avatar: 'BO' },
        { name: 'Alex Rivera', role: 'Sales Lead', email: 'alex@enterprise.crm', status: 'In Call', avatar: 'AR' },
        { name: 'Elena Chen', role: 'Account Executive', email: 'elena@enterprise.crm', status: 'Active', avatar: 'EC' },
        { name: 'Marcus Wright', role: 'Marketing Manager', email: 'marcus@enterprise.crm', status: 'Away', avatar: 'MW' },
    ];

    return (
        <div className="max-w-[1200px] mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Organization Structure</h2>
                    <p className="text-sm text-zinc-500 font-medium">Manage human capital and access levels</p>
                </div>
                <button className="flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm">
                    <Plus size={18} />
                    Invite Member
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((member, idx) => (
                    <div key={idx} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center font-bold text-zinc-900 dark:text-white border border-slate-100 dark:border-zinc-700">
                                {member.avatar}
                            </div>
                            <button className="p-1 text-zinc-400 hover:text-zinc-900">
                                <MoreVertical size={18} />
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
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Team;
