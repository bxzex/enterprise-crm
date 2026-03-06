import React, { useState, useEffect } from 'react'
import { Plus, CheckCircle, Circle, Trash2, X, Clock, AlertTriangle, CheckSquare } from 'lucide-react'
import { getStorage, setStorage, Task } from '../utils/storage'
import { motion, AnimatePresence } from 'framer-motion'

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    priority: 'Medium' as 'High' | 'Medium' | 'Low',
    dueDate: new Date().toISOString().split('T')[0]
  })

  useEffect(() => {
    setTasks(getStorage('tasks', []))
  }, [])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    const newTask: Task = {
      id: Date.now().toString(),
      ...formData,
      completed: false
    }
    const updated = [...tasks, newTask]
    setTasks(updated)
    setStorage('tasks', updated)
    setIsModalOpen(false)
    setFormData({ title: '', priority: 'Medium', dueDate: new Date().toISOString().split('T')[0] })
  }

  const toggleTask = (id: string) => {
    const updated = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    setTasks(updated)
    setStorage('tasks', updated)
  }

  const deleteTask = (id: string) => {
    if (window.confirm('Delete this task?')) {
      const updated = tasks.filter(t => t.id !== id)
      setTasks(updated)
      setStorage('tasks', updated)
    }
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Tasks</h1>
          <p className="text-slate-500 font-medium mt-1">Manage your daily tasks and reminders.</p>
        </div>
        <button className="btn-primary flex items-center gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Tasks Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Active Tasks</h2>
            <span className="bg-slate-200 text-slate-600 text-[10px] font-black px-2 py-0.5 rounded-full">
              {tasks.filter(t => !t.completed).length}
            </span>
          </div>
          
          <div className="space-y-3">
            {tasks.filter(t => !t.completed).length === 0 ? (
              <div className="glass-card p-12 text-center text-slate-400 font-medium italic">
                No pending tasks.
              </div>
            ) : tasks.filter(t => !t.completed).map(task => (
              <motion.div 
                layout
                key={task.id} 
                className={`glass-card p-4 flex items-center gap-4 group border-l-4 ${
                  task.priority === 'High' ? 'border-l-rose-500' : 
                  task.priority === 'Medium' ? 'border-l-orange-500' : 'border-l-slate-300'
                }`}
              >
                <button 
                  onClick={() => toggleTask(task.id)} 
                  className="w-6 h-6 rounded-full border-2 border-slate-200 flex items-center justify-center text-transparent hover:border-accent hover:text-accent transition-all shrink-0"
                >
                  <Circle size={14} fill="currentColor" className="opacity-0 hover:opacity-20" />
                </button>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900 leading-tight">{task.title}</p>
                  <div className="flex items-center gap-3 mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span className="flex items-center gap-1"><Clock size={12} /> {task.dueDate}</span>
                    <span className={`flex items-center gap-1 ${task.priority === 'High' ? 'text-rose-500' : ''}`}>
                      <AlertTriangle size={12} /> {task.priority} Priority
                    </span>
                  </div>
                </div>
                <button onClick={() => deleteTask(task.id)} className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-rose-500 transition-all">
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Completed Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Completed Tasks</h2>
            <span className="bg-slate-200 text-slate-600 text-[10px] font-black px-2 py-0.5 rounded-full">
              {tasks.filter(t => t.completed).length}
            </span>
          </div>

          <div className="space-y-3">
            {tasks.filter(t => t.completed).length === 0 ? (
              <div className="glass-card p-12 text-center text-slate-400 font-medium italic">
                No completed tasks.
              </div>
            ) : tasks.filter(t => t.completed).map(task => (
              <motion.div 
                layout
                key={task.id} 
                className="glass-card p-4 flex items-center gap-4 group opacity-60 bg-slate-50/50"
              >
                <button 
                  onClick={() => toggleTask(task.id)} 
                  className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0"
                >
                  <CheckCircle size={14} />
                </button>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-500 line-through leading-tight">{task.title}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Completed</p>
                </div>
                <button onClick={() => deleteTask(task.id)} className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-rose-500 transition-all">
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Add Task</h2>
              </div>
              <form onSubmit={handleSave} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Task Description</label>
                  <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="input-field" placeholder="Task description..." />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Priority</label>
                    <select value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value as any})} className="input-field appearance-none">
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Due Date</label>
                    <input required type="date" value={formData.dueDate} onChange={e => setFormData({...formData, dueDate: e.target.value})} className="input-field" />
                  </div>
                </div>
                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-6 py-3 border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
                  <button type="submit" className="flex-[2] btn-primary py-3 rounded-2xl flex items-center justify-center gap-2">
                    <CheckSquare size={18} />
                    Save Task
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Tasks
