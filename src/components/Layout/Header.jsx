import { Search, Bell, User } from 'lucide-react';

const Header = ({ activeTab }) => {
    const getTitle = () => {
        switch (activeTab) {
            case 'dashboard': return 'Overview';
            case 'leads': return 'Lead Management';
            case 'analytics': return 'Performance Metrics';
            case 'settings': return 'System Settings';
            default: return 'Overview';
        }
    };

    return (
        <header className="h-16 bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between px-8 shadow-sm z-5">
            <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white capitalize">{getTitle()}</h2>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search leads, tasks..."
                        className="pl-10 pr-4 py-2 bg-zinc-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:focus:ring-zinc-700 w-64 transition-all focus:w-80"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <button className="relative p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-full transition-all">
                        <Bell size={20} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900"></span>
                    </button>

                    <div className="h-8 w-[1px] bg-slate-200 dark:bg-zinc-800 mx-2"></div>

                    <button className="flex items-center gap-2 group">
                        <div className="w-9 h-9 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center border border-slate-200 dark:border-zinc-700 group-hover:border-zinc-400 transition-all">
                            <User size={18} className="text-zinc-600 dark:text-zinc-400" />
                        </div>
                        <div className="text-left hidden lg:block">
                            <p className="text-xs font-semibold text-zinc-900 dark:text-white">Brian Ochoa</p>
                            <p className="text-[10px] text-zinc-500 uppercase font-bold">Administrator</p>
                        </div>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
