import { Share2, Terminal, Code2, Database, Zap } from 'lucide-react';

const Integrations = () => {
    const systems = [
        { name: 'External Webhooks', icon: Zap, status: 'Connected', desc: 'Real-time data synchronization' },
        { name: 'REST API Access', icon: Code2, status: 'Setup Required', desc: 'Integration with custom systems' },
        { name: 'Database Sync', icon: Database, status: 'Disconnected', desc: 'Enterprise data warehousing' },
        { name: 'System Logs', icon: Terminal, status: 'Normal', desc: 'Operation audit and tracking' },
    ];

    return (
        <div className="max-w-[1000px] mx-auto space-y-8">
            <div className="bg-zinc-900 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-2">Connect Your Stack</h2>
                    <p className="text-zinc-400 max-w-lg">Streamline your enterprise operations by connecting your existing tools and automating data flows.</p>
                    <button className="mt-6 px-6 py-3 bg-white text-zinc-900 rounded-xl font-bold text-sm shadow-xl hover:scale-105 transition-all">
                        Explore Marketplace
                    </button>
                </div>
                <div className="absolute top-0 right-0 p-8 opacity-20">
                    <Share2 size={120} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {systems.map((sys, idx) => (
                    <div key={idx} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                                <sys.icon size={22} className="text-zinc-900 dark:text-white" />
                            </div>
                            <div>
                                <h4 className="font-bold text-zinc-900 dark:text-white mb-0.5">{sys.name}</h4>
                                <p className="text-xs text-zinc-500 font-medium">{sys.desc}</p>
                            </div>
                        </div>
                        <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full ${sys.status === 'Connected' ? 'bg-emerald-50 text-emerald-600' :
                                sys.status === 'Normal' ? 'bg-blue-50 text-blue-600' :
                                    'bg-zinc-100 text-zinc-400'
                            }`}>
                            {sys.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Integrations;
