import React, { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import CalendarView from '../components/hrms/CalendarView';
import Modal from '../components/common/Modal';
import FormInput from '../components/common/FormInput';
import ErrorState from '../components/common/ErrorState';
import { useAuth } from '../context/AuthContext';
import { Plus, CheckSquare, Square, Trash2, ShieldCheck, UserCheck, Clock, ListTodo } from 'lucide-react';

const SharedCalendarPage = () => {
  const { user } = useAuth();
  const role = user?.role || 'employee';
  const canManageEvents = role === 'admin' || role === 'hr';

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Default Role-Specific Tasks
  const getRoleDefaultTasks = (roleName) => {
    if (roleName === 'admin') {
      return [
        { id: 1, text: 'Audit system user roles & active security permissions', completed: true },
        { id: 2, text: 'Review database memory usage & server API response latency', completed: false },
        { id: 3, text: 'Inspect executive department headcount & attendance stats', completed: false }
      ];
    } else if (roleName === 'hr') {
      return [
        { id: 1, text: 'Approve pending employee leave requests for calendar sync', completed: true },
        { id: 2, text: 'Generate new candidate onboarding offer letter for Engineering', completed: false },
        { id: 3, text: 'Verify monthly payroll calculation & issue payslips', completed: false }
      ];
    } else {
      return [
        { id: 1, text: 'Log daily check-in attendance on portal header', completed: true },
        { id: 2, text: 'Prepare notes for upcoming team sync & project roadmap', completed: false },
        { id: 3, text: 'Review issued monthly take-home salary payslip statement', completed: false }
      ];
    }
  };

  // Daily To-Do Notes State (persisted in localStorage per user role)
  const storageKey = `neuzenai_todo_${role}_${user?.id || 'guest'}`;
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : getRoleDefaultTasks(role);
  });

  const [newNoteText, setNewNoteText] = useState('');

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(notes));
  }, [notes, storageKey]);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    const note = {
      id: Date.now(),
      text: newNoteText.trim(),
      completed: false,
    };
    setNotes([...notes, note]);
    setNewNoteText('');
  };

  const toggleNote = (id) => {
    setNotes(notes.map((n) => (n.id === id ? { ...n, completed: !n.completed } : n)));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  const resetRoleTasks = () => {
    setNotes(getRoleDefaultTasks(role));
  };

  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'meeting',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    description: '',
  });

  const fetchEvents = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axiosClient.get('/calendar/events');
      if (res.data.success) {
        setEvents(res.data.events);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch calendar events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAddEvent = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await axiosClient.post('/calendar/events', formData);
      if (res.data.success) {
        setIsOpen(false);
        setFormData({
          title: '',
          type: 'meeting',
          startDate: new Date().toISOString().split('T')[0],
          endDate: new Date().toISOString().split('T')[0],
          description: '',
        });
        fetchEvents();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create calendar event');
    } finally {
      setSubmitting(false);
    }
  };

  if (error) return <ErrorState message={error} onRetry={fetchEvents} />;

  const roleTitle = role === 'admin' ? 'Administrator System CTO' : role === 'hr' ? 'HR Operations Lead' : 'Employee Self-Service';

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-outfit">Shared Team Calendar & Role To-Do Checklist</h1>
          <p className="text-sm text-slate-500">Track company events and manage your role-tailored daily checklist ({roleTitle})</p>
        </div>

        {canManageEvents ? (
          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-sky-600/20"
          >
            <Plus className="w-4 h-4" /> Add Team Event
          </button>
        ) : (
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600 border border-slate-200">
            View-Only Calendar Access (HR & Admin Post Access)
          </span>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 p-4 bg-white rounded-2xl border border-sky-100 shadow-sm text-xs font-semibold">
        <span className="flex items-center gap-1.5 text-emerald-700">
          <span className="w-3 h-3 rounded bg-emerald-600"></span> Company Holiday
        </span>
        <span className="flex items-center gap-1.5 text-rose-700">
          <span className="w-3 h-3 rounded bg-rose-600"></span> Approved Employee Leave
        </span>
        <span className="flex items-center gap-1.5 text-sky-700">
          <span className="w-3 h-3 rounded bg-sky-600"></span> Internal Meeting / Event
        </span>
        <span className="flex items-center gap-1.5 text-amber-700">
          <span className="w-3 h-3 rounded bg-amber-600"></span> Onboarding Event
        </span>
      </div>

      {/* Role-Specific Today's To-Do List Card */}
      <div className="p-6 rounded-3xl bg-white border border-sky-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-sky-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white ${
              role === 'admin' ? 'bg-purple-600' : role === 'hr' ? 'bg-sky-600' : 'bg-emerald-600'
            }`}>
              <ListTodo className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 font-outfit">
                  {role === 'admin' ? 'System CTO Daily Checklist' : role === 'hr' ? 'HR Operational To-Do List' : 'Employee Daily Action Items'}
                </h3>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                  role === 'admin' ? 'bg-purple-100 text-purple-700 border border-purple-200' :
                  role === 'hr' ? 'bg-sky-100 text-sky-700 border border-sky-200' : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                }`}>
                  {role} Mode
                </span>
              </div>
              <p className="text-xs text-slate-500">Tasks tailored for your role for {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
              {notes.filter((n) => n.completed).length} / {notes.length} Completed
            </span>
            <button
              onClick={resetRoleTasks}
              className="text-[11px] font-semibold text-slate-500 hover:text-sky-600 underline"
            >
              Reset Role Tasks
            </button>
          </div>
        </div>

        {/* Add Note Input */}
        <form onSubmit={handleAddNote} className="flex gap-2">
          <input
            type="text"
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
            placeholder={`Add a new ${role} task or note for today...`}
            className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-sky-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl shadow-xs"
          >
            Add Task
          </button>
        </form>

        {/* Checklist Items */}
        <div className="space-y-2 pt-1">
          {notes.length === 0 ? (
            <p className="text-xs text-slate-400 italic py-2 text-center">No tasks added to your {role} checklist yet.</p>
          ) : (
            notes.map((note) => (
              <div
                key={note.id}
                className="flex items-center justify-between p-3 rounded-xl bg-sky-50/40 border border-sky-100 hover:bg-sky-50/80 transition-all text-xs"
              >
                <div
                  onClick={() => toggleNote(note.id)}
                  className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                >
                  {note.completed ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                  <span className={`truncate font-medium ${note.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                    {note.text}
                  </span>
                </div>

                <button
                  onClick={() => deleteNote(note.id)}
                  className="p-1 text-slate-400 hover:text-rose-600 transition-colors ml-2"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <CalendarView events={events} />

      {/* Add Event Modal (Admin & HR Only) */}
      {canManageEvents && (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Create Shared Calendar Event">
          <form onSubmit={handleAddEvent} className="space-y-4">
            <FormInput
              label="Event Title"
              name="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Sprint Review & Planning Meeting"
              required
            />

            <FormInput
              label="Event Category"
              name="type"
              type="select"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              options={[
                { value: 'meeting', label: 'Team Meeting / Sync' },
                { value: 'holiday', label: 'Company Holiday' },
                { value: 'onboarding', label: 'Onboarding Event' },
                { value: 'leave', label: 'Team Outing / Reminder' },
              ]}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                label="Start Date"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
              <FormInput
                label="End Date"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
              />
            </div>

            <FormInput
              label="Description"
              name="description"
              type="textarea"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Event details & meeting link..."
            />

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
              <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-500">
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-xl shadow-md shadow-sky-600/20"
              >
                {submitting ? 'Creating...' : 'Post Calendar Event'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default SharedCalendarPage;
