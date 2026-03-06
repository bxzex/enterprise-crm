import React, { useState, useEffect } from 'react'
import { Plus, CheckCircle, Circle, Trash2, X } from 'lucide-react'
import { getStorage, setStorage, Task } from '../utils/storage'

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
    const updated = tasks.filter(t => t.id !== id)
    setTasks(updated)
    setStorage('tasks', updated)
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>Tasks</h1>
          <p>Organize your daily activities and stay on top of your deals.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}><Plus size={18} /> New Task</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="card">
          <h2 style={{ fontSize: '1.125rem', marginBottom: '20px' }}>Active Tasks</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {tasks.filter(t => !t.completed).length === 0 ? (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>No active tasks.</p>
            ) : tasks.filter(t => !t.completed).map(task => (
              <div key={task.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
                <button onClick={() => toggleTask(task.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                  <Circle size={20} />
                </button>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{task.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Due: {task.dueDate} • <span style={{ color: task.priority === 'High' ? 'var(--danger)' : 'inherit' }}>{task.priority} Priority</span></div>
                </div>
                <button onClick={() => deleteTask(task.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--danger)', opacity: 0.5 }}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 style={{ fontSize: '1.125rem', marginBottom: '20px' }}>Recently Completed</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {tasks.filter(t => t.completed).length === 0 ? (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>No completed tasks.</p>
            ) : tasks.filter(t => t.completed).map(task => (
              <div key={task.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#f1f5f9', borderRadius: '8px', opacity: 0.7 }}>
                <button onClick={() => toggleTask(task.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--success)' }}>
                  <CheckCircle size={20} />
                </button>
                <div style={{ flex: 1, textDecoration: 'line-through' }}>
                  <div style={{ fontWeight: 600 }}>{task.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Completed</div>
                </div>
                <button onClick={() => deleteTask(task.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--danger)', opacity: 0.5 }}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ margin: 0 }}>Create Task</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X /></button>
            </div>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Task Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Follow up with Acme Corp" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label>Priority</label>
                  <select value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value as any})}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Due Date</label>
                  <input required type="date" value={formData.dueDate} onChange={e => setFormData({...formData, dueDate: e.target.value})} />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px' }}>
                <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Tasks
