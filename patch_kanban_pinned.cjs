const fs = require('fs');

let content = fs.readFileSync('src/app/components/KanbanBoard.tsx', 'utf8');

// Add pinned state
content = content.replace(
  /const \[newTaskTitle, setNewTaskTitle\] = useState\(''\);/g,
  `const [newTaskTitle, setNewTaskTitle] = useState('');
  const [pinnedText, setPinnedText] = useState("Morning feed schedule starts at 07:00 - All grooms report to main stable");
  `
);

// Update pinned HTML
const oldPinned = `<div className="bg-amber-50 border border-amber-200/60 rounded-lg p-3 mb-6">
          <p className="text-sm text-amber-800 flex items-center gap-2">
            <span className="font-semibold">📌 {t('dashboard.kanban.pinned')}</span>
            {t('dashboard.kanban.pinned_msg')}
          </p>
        </div>`;

const newPinned = `<div className="bg-amber-50 border border-amber-200/60 rounded-lg p-3 mb-6 hover:border-amber-300 transition-colors">
          <div className="text-sm text-amber-800 flex items-center gap-2">
            <span className="font-semibold flex-shrink-0">📌 {t('dashboard.kanban.pinned')}</span>
            <input 
              type="text" 
              value={pinnedText} 
              onChange={e => setPinnedText(e.target.value)} 
              className="bg-transparent border-b border-transparent hover:border-amber-300 focus:border-amber-500 outline-none w-full text-amber-900 transition-colors" 
              placeholder="Typ een vastgepind bericht..."
            />
          </div>
        </div>`;

content = content.replace(oldPinned, newPinned);

fs.writeFileSync('src/app/components/KanbanBoard.tsx', content);
