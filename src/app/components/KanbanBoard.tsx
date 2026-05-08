import { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { GripVertical, Clock, User, Sparkles } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Task {
  id: string;
  title: string;
  assignee: string;
  time?: string;
  priority?: 'high' | 'medium' | 'low';
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
      ref={drag}
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
          <span>{task.assignee}</span>
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
  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    drop: (item: { id: string }) => onDrop(item.id, column.id),
  });

  return (
    <div ref={drop} className="flex-1 min-w-0">
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 h-full">
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

export function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'todo',
      title: 'To Do',
      tasks: [
        { id: '1', title: 'Feed morning schedule for Stallion Block A', assignee: 'Emma', time: '08:00', priority: 'high' },
        { id: '2', title: 'Check water systems in Paddock B', assignee: 'Luke', time: '09:00', priority: 'medium' },
        { id: '3', title: 'Prepare grooming equipment for afternoon session', assignee: 'Sarah', priority: 'low' },
      ],
    },
    {
      id: 'inprogress',
      title: 'In Progress',
      tasks: [
        { id: '4', title: 'Clean stables Block C', assignee: 'Mike', time: '10:30', priority: 'medium' },
        { id: '5', title: 'Administer medication to Equinox', assignee: 'Dr. Adams', time: '11:00', priority: 'high' },
      ],
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [
        { id: '6', title: 'Morning inspection completed', assignee: 'Emma', priority: 'medium' },
        { id: '7', title: 'Feed inventory restocked', assignee: 'Luke', priority: 'low' },
        { id: '8', title: 'Vet report filed for Eclipse', assignee: 'Dr. Adams', priority: 'high' },
      ],
    },
  ]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const { data, error } = await supabase.from('tasks').select('*');
        if (!error && data && data.length > 0) {
          // Format data into columns based on status
          const todoTasks = data.filter((t: any) => t.status === 'todo');
          const inProgressTasks = data.filter((t: any) => t.status === 'inprogress');
          const doneTasks = data.filter((t: any) => t.status === 'done');
          
          setColumns([
            { id: 'todo', title: 'To Do', tasks: todoTasks },
            { id: 'inprogress', title: 'In Progress', tasks: inProgressTasks },
            { id: 'done', title: 'Done', tasks: doneTasks }
          ]);
        }
      } catch (e) {
        console.error('Error fetching tasks, falling back to dummy data');
      }
    }
    fetchTasks();
  }, []);

  const handleDrop = (taskId: string, targetColumnId: string) => {
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

      if (movedTask) {
        const targetColumnIndex = newColumns.findIndex((c) => c.id === targetColumnId);
        if (targetColumnIndex !== -1) {
          newColumns[targetColumnIndex].tasks.push(movedTask);
        }
      }

      return newColumns;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-serif font-bold text-slate-900">Stable Workflow</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 text-xs font-medium border border-teal-100 flex items-center gap-1.5"><Sparkles className="w-3 h-3" /> Live Data</span>
          </div>
          <button className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 hover:shadow-md transition-all font-medium text-sm">
            Add Task
          </button>
        </div>

        <div className="bg-amber-50 border border-amber-200/60 rounded-lg p-3 mb-6">
          <p className="text-sm text-amber-800 flex items-center gap-2">
            <span className="font-semibold">📌 Pinned:</span>
            Morning feed schedule starts at 07:00 - All grooms report to main stable
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 overflow-x-auto pb-4">
          {columns.map((column) => (
            <div key={column.id} className="min-w-full md:min-w-[300px]">
              <KanbanColumn column={column} onDrop={handleDrop} />
            </div>
          ))}
        </div>
      </div>
    </DndProvider>
  );
}
