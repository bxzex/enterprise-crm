import { LayoutDashboard, Users, Settings, BarChart3, LogOut, CheckSquare, Shield, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ activeTab, setActiveTab }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'leads', label: 'Leads & CRM', icon: Users },
        { id: 'tasks', label: 'Tasks & Activity', icon: CheckSquare },
        { id: 'team', label: 'Team Management', icon: Shield },
        { id: 'analytics', label: 'Performance', icon: BarChart3 },
        { id: 'integrations', label: 'Integrations', icon: Share2 },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="w-64 bg-white dark:bg-zinc-900 border-r border-slate-200 dark:border-zinc-800 flex flex-col h-full shadow-sm z-10">
            <div className="p-6">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-zinc-900 dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-zinc-900 font-bold text-xl">
                        B
                    </div>
                    <span className="font-bold text-xl tracking-tight text-zinc-900 dark:text-white uppercase">Enterprise</span>
                </div>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === item.id
                            ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm'
                            : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <item.icon size={19} className={activeTab === item.id ? 'text-zinc-900 dark:text-white' : 'text-zinc-400'} />
                            {item.label}
                        </div>
                        {activeTab === item.id && (
                            <motion.div layoutId="activeInd" className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-white" />
                        )}
                    </button>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-100 dark:border-zinc-800">
                <button
                    onClick={() => {
                        if (confirm('Are you sure you want to terminate your current session?')) {
                            localStorage.clear();
                            window.location.reload();
                        }
                    }}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg w-full transition-colors active:scale-95"
                >
                    <LogOut size={18} />
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
