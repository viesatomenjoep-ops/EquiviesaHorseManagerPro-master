import { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { GripVertical, Clock, User, Sparkles, Plus } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useTranslation } from 'react-i18next';

interface Staff {
  id: string;
  first_name: string;
  last_name: string;
}

interface Task {
  id: string;
  title: string;
  assignee?: string;
  assigned_to?: string;
  staff?: { first_name: string; last_name: string };
  time?: string;
  priority?: 'high' | 'medium' | 'low';
  status: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const ITEM_TYPE = 'TASK';

function TaskCard({ task }: { task: Task }) {
  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const priorityColors = {
    high: 'bg-[#EF4444]/10 text-[#EF4444]',
    medium: 'bg-[#F59E0B]/10 text-[#F59E0B]',
    low: 'bg-[#10B981]/10 text-[#10B981]',
  };

  return (
    <div
      ref={drag as unknown as React.Ref<HTMLDivElement>}
      className={`bg-white p-4 rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-sm cursor-move transition-all ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-start gap-2 mb-3">
        <GripVertical className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-slate-900 font-medium flex-1">{task.title}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <User className="w-3 h-3" />
          <span>{task.assignee || (task.staff ? `${task.staff.first_name} ${task.staff.last_name}` : 'Onbekend')}</span>
        </div>
        {task.time && (
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Clock className="w-3 h-3" />
            <span>{task.time}</span>
          </div>
        )}
      </div>

      {task.priority && (
        <div className="mt-2">
          <span className={`text-xs px-2 py-1 rounded ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
        </div>
      )}
    </div>
  );
}

function KanbanColumn({ column, onDrop }: { column: Column; onDrop: (taskId: string, columnId: string) => void }) {
  return (
    <div className="flex-1 min-w-0">
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 h-full min-h-[300px]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-900">{column.title}</h3>
          <span className="text-xs bg-slate-200 text-slate-700 font-medium px-2 py-1 rounded-full">
            {column.tasks.length}
          </span>
        </div>

        <div className="space-y-3">
          {column.tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Wrapper to handle dropping context
function KanbanColumnDropWrapper({ column, onDrop, children }: { column: Column; onDrop: (taskId: string, columnId: string) => void, children: React.ReactNode }) {
  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    drop: (item: { id: string }) => onDrop(item.id, column.id),
  });
  
  return (
    <div ref={drop as unknown as React.Ref<HTMLDivElement>} className="flex-1 min-w-0">
      {children}
    </div>
  );
}

export function KanbanBoard() {
  const { t } = useTranslation();
  const [columns, setColumns] = useState<Column[]>([
    { id: 'todo', title: t('dashboard.kanban.col_todo'), tasks: [] },
    { id: 'inprogress', title: t('dashboard.kanban.col_inprogress'), tasks: [] },
    { id: 'done', title: t('dashboard.kanban.col_done'), tasks: [] },
  ]);

  const [staff, setStaff] = useState<Staff[]>([]);
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    fetchData();
  }, [t]);

  async function fetchData() {
    try {
      const [tasksRes, staffRes] = await Promise.all([
        supabase.from('tasks').select('*, staff:assigned_to(first_name, last_name)'),
        supabase.from('staff').select('*')
      ]);

      if (staffRes.data) {
        setStaff(staffRes.data);
        if (staffRes.data.length > 0) setSelectedStaffId(staffRes.data[0].id);
      }

      if (tasksRes.data) {
        const parsedData = tasksRes.data.map(t => ({
          ...t,
          assignee: t.staff ? `${t.staff.first_name} ${t.staff.last_name}` : 'Onbekend'
        }));
        
        // Fallback for empty data
        const workingData = parsedData.length > 0 ? parsedData : [
          { id: '1', title: 'Feed morning schedule for Stallion Block A', assignee: 'Emma', time: '08:00', priority: 'high', status: 'todo' },
          { id: '4', title: 'Clean stables Block C', assignee: 'Mike', time: '10:30', priority: 'medium', status: 'inprogress' },
          { id: '6', title: 'Morning inspection completed', assignee: 'Emma', priority: 'medium', status: 'done' },
        ];

        const todoTasks = workingData.filter((t: any) => t.status === 'todo');
        const inProgressTasks = workingData.filter((t: any) => t.status === 'inprogress');
        const doneTasks = workingData.filter((t: any) => t.status === 'done');
        
        setColumns([
          { id: 'todo', title: t('dashboard.kanban.col_todo'), tasks: todoTasks },
          { id: 'inprogress', title: t('dashboard.kanban.col_inprogress'), tasks: inProgressTasks },
          { id: 'done', title: t('dashboard.kanban.col_done'), tasks: doneTasks }
        ]);
      }
    } catch (e) {
      console.error('Error fetching tasks', e);
    }
  }

  const handleDrop = async (taskId: string, targetColumnId: string) => {
    // Optimistic UI update
    setColumns((prevColumns) => {
      const newColumns = [...prevColumns];
      let movedTask: Task | null = null;
      let sourceColumnIndex = -1;

      for (let i = 0; i < newColumns.length; i++) {
        const taskIndex = newColumns[i].tasks.findIndex((t) => t.id === taskId);
        if (taskIndex !== -1) {
          sourceColumnIndex = i;
          movedTask = newColumns[i].tasks[taskIndex];
          newColumns[i].tasks.splice(taskIndex, 1);
          break;
        }
      }

      if (movedTask && sourceColumnIndex !== -1) {
        // Prevent moving to the same column causing redundant API call
        if (newColumns[sourceColumnIndex].id === targetColumnId) {
          newColumns[sourceColumnIndex].tasks.push(movedTask);
          return newColumns;
        }

        const targetColumnIndex = newColumns.findIndex((c) => c.id === targetColumnId);
        if (targetColumnIndex !== -1) {
          movedTask.status = targetColumnId;
          newColumns[targetColumnIndex].tasks.push(movedTask);
        }
      }

      return newColumns;
    });

    // Database update
    try {
      const { error } = await supabase.from('tasks').update({ status: targetColumnId }).eq('id', taskId);
      if (error) console.error("Could not update task status", error);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle) return;

    try {
      const { error } = await supabase.from('tasks').insert({
        title: newTaskTitle,
        assigned_to: selectedStaffId || null,
        status: 'todo',
        priority: 'medium'
      });
      if (!error) {
        setShowAddModal(false);
        setNewTaskTitle('');
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-serif font-bold text-slate-900">{t('dashboard.kanban.title')}</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-[#8C7345] text-xs font-medium border border-teal-100 flex items-center gap-1.5"><Sparkles className="w-3 h-3" /> {t('dashboard.kanban.live_data')}</span>
          </div>
          <button onClick={() => setShowAddModal(true)} className="flex items-center gap-1 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 hover:shadow-md transition-all font-medium text-sm">
            <Plus className="w-4 h-4" /> {t('dashboard.kanban.add_task')}
          </button>
        </div>

        {showAddModal && (
          <div className="absolute top-20 right-6 z-10 bg-white p-5 rounded-xl shadow-xl border border-slate-200 w-80 animate-in fade-in">
            <h3 className="font-bold mb-3">{t('dashboard.kanban.modal_title')}</h3>
            <form onSubmit={handleAddTask} className="space-y-3">
              <input type="text" placeholder={t('dashboard.kanban.modal_ph')} required value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} className="w-full p-2 border border-slate-300 rounded-md text-sm" />
              <select value={selectedStaffId} onChange={e => setSelectedStaffId(e.target.value)} className="w-full p-2 border border-slate-300 rounded-md text-sm">
                <option value="">Selecteer Personeel...</option>
                {staff.map(s => (
                  <option key={s.id} value={s.id}>{s.first_name} {s.last_name} ({s.role})</option>
                ))}
              </select>
              <div className="flex gap-2">
                <button type="submit" className="flex-1 bg-[#C2A878] text-white py-2 rounded-md font-bold text-sm">{t('dashboard.kanban.modal_save')}</button>
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 bg-slate-100 text-slate-700 py-2 rounded-md font-bold text-sm">{t('dashboard.kanban.modal_cancel')}</button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-amber-50 border border-amber-200/60 rounded-lg p-3 mb-6">
          <p className="text-sm text-amber-800 flex items-center gap-2">
            <span className="font-semibold">📌 {t('dashboard.kanban.pinned')}</span>
            {t('dashboard.kanban.pinned_msg')}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 overflow-x-auto pb-4">
          {columns.map((column) => (
            <KanbanColumnDropWrapper key={column.id} column={column} onDrop={handleDrop}>
              <KanbanColumn column={column} onDrop={handleDrop} />
            </KanbanColumnDropWrapper>
          ))}
        </div>
      </div>
    </DndProvider>
  );
}
