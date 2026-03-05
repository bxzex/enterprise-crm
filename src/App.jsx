import { useState, useEffect } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard/Dashboard';
import CRMTable from './components/CRM/CRMTable';
import Tasks from './components/Tasks/Tasks';
import Team from './components/Team/Team';
import Performance from './components/Analytics/Performance';
import Integrations from './components/Integrations/Integrations';
import Settings from './components/Settings/Settings';

function App() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [leads, setLeads] = useState(() => {
        const saved = localStorage.getItem('crm_leads');
        return saved ? JSON.parse(saved) : [
            { id: 1, name: 'Acme Corp', contact: 'John Doe', status: 'Negotiation', value: '$12,000', email: 'john@acme.com', date: '2025-03-01' },
            { id: 2, name: 'Global Tech', contact: 'Sarah Smith', status: 'Closed', value: '$45,000', email: 'sarah@global.tech', date: '2025-02-28' },
            { id: 3, name: 'Summit Inc', contact: 'Mike Ross', status: 'Discovery', value: '$5,500', email: 'mike@summit.com', date: '2025-03-04' },
            { id: 4, name: 'Infinite Ltd', contact: 'Harvey Specter', status: 'Proposal', value: '$30,000', email: 'harvey@infinite.co', date: '2025-03-02' },
        ];
    });

    useEffect(() => {
        localStorage.setItem('crm_leads', JSON.stringify(leads));
    }, [leads]);

    const addLead = (newLead) => {
        setLeads(prev => [...prev, { ...newLead, id: Date.now() }]);
    };

    const deleteLead = (id) => {
        setLeads(prev => prev.filter(l => l.id !== id));
    };

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header activeTab={activeTab} />

                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 scroll-smooth">
                    {activeTab === 'dashboard' && <Dashboard leads={leads} />}
                    {activeTab === 'leads' && <CRMTable leads={leads} onAdd={addLead} onDelete={deleteLead} />}
                    {activeTab === 'tasks' && <Tasks />}
                    {activeTab === 'team' && <Team />}
                    {activeTab === 'analytics' && <Performance />}
                    {activeTab === 'integrations' && <Integrations />}
                    {activeTab === 'settings' && <Settings />}
                </main>
            </div>
        </div>
    );
}

export default App;
