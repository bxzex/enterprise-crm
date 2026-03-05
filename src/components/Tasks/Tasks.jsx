import { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, Circle, Clock, Plus, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Tasks = () => {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('crm_tasks');
        return saved ? JSON.parse(saved) : [
            { id: 1, title: 'Follow up with Acme Corp', priority: 'High', due: 'Today', completed: false },
            { id: 2, title: 'Quarterly Review - Global Tech', priority: 'Medium', due: 'Tomorrow', completed: false },
            { id: 3, title: 'Send Proposal to Summit Inc', priority: 'High', due: 'Mar 12', completed: true },
            { id: 4, title: 'Internal Strategy Sync', priority: 'Low', due: 'Mar 15', completed: false },
        ];
    });

    useEffect(() => {
        localStorage.setItem('crm_tasks', JSON.stringify(tasks));
    }, [tasks]);

    const toggleTask = (id) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    return (
        <div className="max-w-[1000px] mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Active Tasks</h2>
                    <p className="text-sm text-zinc-500 font-medium">Coordinate your daily operations</p>
                </div>
                <button className="flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm">
                    <Plus size={18} />
                    New Task
                </button>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 dark:border-zinc-800 flex justify-between items-center">
                    <div className="flex gap-4">
                        <button className="text-xs font-bold text-zinc-900 dark:text-white pb-1 border-b-2 border-zinc-900 dark:border-white">All Tasks</button>
                        <button className="text-xs font-bold text-zinc-400 hover:text-zinc-600">Pending</button>
                        <button className="text-xs font-bold text-zinc-400 hover:text-zinc-600">Completed</button>
                    </div>
                    <button className="flex items-center gap-2 text-xs font-bold text-zinc-500">
                        <Filter size={14} />
                        Sort by Priority
                    </button>
                </div>

                <div className="divide-y divide-slate-50 dark:divide-zinc-800">
                    <AnimatePresence>
                        {tasks.map((task) => (
                            <motion.div
                                key={task.id}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="p-4 flex items-center justify-between hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <button onClick={() => toggleTask(task.id)} className="text-zinc-300 hover:text-zinc-900 dark:hover:text-white">
                                        {task.completed ? <CheckCircle2 size={22} className="text-emerald-500" /> : <Circle size={22} />}
                                    </button>
                                    <div>
                                        <p className={`text-sm font-bold ${task.completed ? 'text-zinc-400 line-through' : 'text-zinc-900 dark:text-white'}`}>{task.title}</p>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded ${task.priority === 'High' ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400' :
                                                    task.priority === 'Medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' :
                                                        'bg-zinc-100 text-zinc-700 dark:bg-zinc-500/10 dark:text-zinc-400'
                                                }`}>
                                                {task.priority}
                                            </span>
                                            <span className="flex items-center gap-1 text-[10px] text-zinc-500 font-bold uppercase">
                                                <Calendar size={10} />
                                                {task.due}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button className="opacity-0 group-hover:opacity-100 p-2 text-zinc-400 hover:text-zinc-900 transition-all">
                                    <Clock size={16} />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Tasks;
