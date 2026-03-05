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

    const [showAddModal, setShowAddModal] = useState(false);
    const [filter, setFilter] = useState('all');
    const [newTask, setNewTask] = useState({ title: '', priority: 'Medium', due: 'Today' });

    useEffect(() => {
        localStorage.setItem('crm_tasks', JSON.stringify(tasks));
    }, [tasks]);

    const toggleTask = (id) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const addTask = (e) => {
        e.preventDefault();
        setTasks(prev => [{ ...newTask, id: Date.now(), completed: false }, ...prev]);
        setNewTask({ title: '', priority: 'Medium', due: 'Today' });
        setShowAddModal(false);
    };

    const filteredTasks = tasks.filter(t => {
        if (filter === 'pending') return !t.completed;
        if (filter === 'completed') return t.completed;
        return true;
    });

    return (
        <div className="max-w-[1000px] mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Active Tasks</h2>
                    <p className="text-sm text-zinc-500 font-medium">Coordinate your daily operations</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm active:scale-95 transition-all"
                >
                    <Plus size={18} />
                    New Task
                </button>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 dark:border-zinc-800 flex justify-between items-center">
                    <div className="flex gap-4">
                        <button
                            onClick={() => setFilter('all')}
                            className={`text-xs font-bold pb-1 transition-all ${filter === 'all' ? 'text-zinc-900 dark:text-white border-b-2 border-zinc-900 dark:border-white' : 'text-zinc-400 hover:text-zinc-600'}`}
                        >
                            All Tasks
                        </button>
                        <button
                            onClick={() => setFilter('pending')}
                            className={`text-xs font-bold pb-1 transition-all ${filter === 'pending' ? 'text-zinc-900 dark:text-white border-b-2 border-zinc-900 dark:border-white' : 'text-zinc-400 hover:text-zinc-600'}`}
                        >
                            Pending
                        </button>
                        <button
                            onClick={() => setFilter('completed')}
                            className={`text-xs font-bold pb-1 transition-all ${filter === 'completed' ? 'text-zinc-900 dark:text-white border-b-2 border-zinc-900 dark:border-white' : 'text-zinc-400 hover:text-zinc-600'}`}
                        >
                            Completed
                        </button>
                    </div>
                </div>

                <div className="divide-y divide-slate-50 dark:divide-zinc-800">
                    <AnimatePresence mode="popLayout">
                        {filteredTasks.map((task) => (
                            <motion.div
                                key={task.id}
                                layout
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="p-4 flex items-center justify-between hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <button onClick={() => toggleTask(task.id)} className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
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
                                <button className="opacity-0 group-hover:opacity-100 p-2 text-zinc-400 hover:text-rose-500 transition-all" onClick={() => setTasks(prev => prev.filter(t => t.id !== task.id))}>
                                    <Clock size={16} />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            <AnimatePresence>
                {showAddModal && (
                    <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden"
                        >
                            <div className="p-6 border-b border-slate-100 dark:border-zinc-800 flex justify-between items-center">
                                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">New Operational Task</h3>
                                <button onClick={() => setShowAddModal(false)} className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                                    <Plus size={20} className="rotate-45" />
                                </button>
                            </div>
                            <form onSubmit={addTask} className="p-6 space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Task Definition</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. Executive report review"
                                        value={newTask.title}
                                        onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                                        className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-all"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Priority</label>
                                        <select
                                            value={newTask.priority}
                                            onChange={e => setNewTask({ ...newTask, priority: e.target.value })}
                                            className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-sm outline-none"
                                        >
                                            <option>Low</option>
                                            <option>Medium</option>
                                            <option>High</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Due Date</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Today"
                                            value={newTask.due}
                                            onChange={e => setNewTask({ ...newTask, due: e.target.value })}
                                            className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-sm outline-none"
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="w-full py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold text-sm shadow-xl active:scale-95 transition-all">
                                    Register Task
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Tasks;
