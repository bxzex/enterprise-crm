import { useState, useEffect } from 'react';
import { Share2, Terminal, Code2, Database, Zap } from 'lucide-react';

const Integrations = () => {
    const [systems, setSystems] = useState(() => {
        const saved = localStorage.getItem('crm_integrations');
        return saved ? JSON.parse(saved) : [
            { id: 1, name: 'External Webhooks', icon: 'Zap', status: 'Connected', desc: 'Real-time data synchronization' },
            { id: 2, name: 'REST API Access', icon: 'Code2', status: 'Setup Required', desc: 'Integration with custom systems' },
            { id: 3, name: 'Database Sync', icon: 'Database', status: 'Disconnected', desc: 'Enterprise data warehousing' },
            { id: 4, name: 'System Logs', icon: 'Terminal', status: 'Normal', desc: 'Operation audit and tracking' },
        ];
    });

    useEffect(() => {
        localStorage.setItem('crm_integrations', JSON.stringify(systems));
    }, [systems]);

    const icons = { Zap, Code2, Database, Terminal };

    const toggleStatus = (id) => {
        setSystems(prev => prev.map(s => {
            if (s.id === id) {
                const statuses = ['Connected', 'Disconnected', 'Setup Required', 'Normal'];
                const currentIndex = statuses.indexOf(s.status);
                const nextStatus = statuses[(currentIndex + 1) % statuses.length];
                return { ...s, status: nextStatus };
            }
            return s;
        }));
    };

    return (
        <div className="max-w-[1000px] mx-auto space-y-8">
            <div className="bg-zinc-900 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-2">Connect Your Stack</h2>
                    <p className="text-zinc-400 max-w-lg">Streamline your enterprise operations by connecting your existing tools and automating data flows.</p>
                    <button
                        onClick={() => alert(`Synchronizing with Enterprise Marketplace... Connected to external relay.`)}
                        className="mt-6 px-6 py-3 bg-white text-zinc-900 rounded-xl font-bold text-sm shadow-xl hover:scale-105 active:scale-95 transition-all"
                    >
                        Explore Marketplace
                    </button>
                </div>
                <div className="absolute top-0 right-0 p-8 opacity-20">
                    <Share2 size={120} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {systems.map((sys) => {
                    const Icon = icons[sys.icon];
                    return (
                        <div key={sys.id} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                                    <Icon size={22} className="text-zinc-900 dark:text-white" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-zinc-900 dark:text-white mb-0.5">{sys.name}</h4>
                                    <p className="text-xs text-zinc-500 font-medium">{sys.desc}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => toggleStatus(sys.id)}
                                className={`text-[10px] font-black uppercase px-2 py-1 rounded-full transition-all active:scale-95 ${sys.status === 'Connected' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' :
                                    sys.status === 'Normal' ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400' :
                                        'bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500'
                                    }`}
                            >
                                {sys.status}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Integrations;
