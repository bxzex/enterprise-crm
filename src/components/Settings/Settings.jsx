import { useState, useEffect } from 'react';
import { User, Bell, Shield, Palette, Globe, CreditCard } from 'lucide-react';

const Settings = () => {
    const [prefs, setPrefs] = useState(() => {
        const saved = localStorage.getItem('crm_settings');
        return saved ? JSON.parse(saved) : {
            emailNotif: true,
            realtimeAlerts: false,
        };
    });

    useEffect(() => {
        localStorage.setItem('crm_settings', JSON.stringify(prefs));
    }, [prefs]);

    const sections = [
        { id: 'profile', label: 'Admin Profile', icon: User, desc: 'Manage your administrative identity' },
        { id: 'security', label: 'Security & Access', icon: Shield, desc: 'Two-factor auth and active sessions' },
        { id: 'notifications', label: 'System Notifications', icon: Bell, desc: 'Configure pipeline alerts' },
        { id: 'appearance', label: 'Interface Design', icon: Palette, desc: 'Theme preferences and branding' },
        { id: 'localization', label: 'Region & Currency', icon: Globe, desc: 'Set operational timezone' },
        { id: 'billing', label: 'Subscription', icon: CreditCard, desc: 'Manage enterprise license' },
    ];

    return (
        <div className="max-w-[1000px] mx-auto space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => alert(`Configuring ${section.label}: Accessing localized persistence layer...`)}
                        className="group flex items-start gap-4 p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all text-left shadow-sm active:scale-95"
                    >
                        <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-zinc-900 transition-all">
                            <section.icon size={22} />
                        </div>
                        <div>
                            <h4 className="font-bold text-zinc-900 dark:text-white mb-1 tracking-tight">{section.label}</h4>
                            <p className="text-xs text-zinc-500 font-medium">{section.desc}</p>
                        </div>
                    </button>
                ))}
            </div>

            <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-6">General Preferences</h3>
                <div className="space-y-6">
                    <div className="flex items-center justify-between py-4 border-b border-slate-50 dark:border-zinc-800">
                        <div>
                            <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Email Notifications</p>
                            <p className="text-xs text-zinc-500">Receive daily pipeline summaries</p>
                        </div>
                        <button
                            onClick={() => setPrefs({ ...prefs, emailNotif: !prefs.emailNotif })}
                            className={`w-10 h-5 rounded-full relative transition-colors ${prefs.emailNotif ? 'bg-zinc-900 dark:bg-white' : 'bg-zinc-200 dark:bg-zinc-700'}`}
                        >
                            <div className={`absolute top-0.5 w-4 h-4 rounded-full shadow-sm transition-all ${prefs.emailNotif ? 'right-0.5 bg-white dark:bg-zinc-900' : 'left-0.5 bg-white dark:bg-zinc-400'}`}></div>
                        </button>
                    </div>
                    <div className="flex items-center justify-between py-4 border-b border-slate-50 dark:border-zinc-800">
                        <div>
                            <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Real-time Lead Alerts</p>
                            <p className="text-xs text-zinc-500">Desktop notifications for new leads</p>
                        </div>
                        <button
                            onClick={() => setPrefs({ ...prefs, realtimeAlerts: !prefs.realtimeAlerts })}
                            className={`w-10 h-5 rounded-full relative transition-colors ${prefs.realtimeAlerts ? 'bg-zinc-900 dark:bg-white' : 'bg-zinc-200 dark:bg-zinc-700'}`}
                        >
                            <div className={`absolute top-0.5 w-4 h-4 rounded-full shadow-sm transition-all ${prefs.realtimeAlerts ? 'right-0.5 bg-white dark:bg-zinc-900' : 'left-0.5 bg-white dark:bg-zinc-400'}`}></div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
