
import React from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TaskType, useTaskContext } from '../contexts/TaskContext';
import { cn } from '../lib/utils';

interface TaskCardProps {
  task: TaskType;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const navigate = useNavigate();
  const { isTaskCompleted } = useTaskContext();
  const completed = isTaskCompleted(task.id);

  const handleClick = () => {
    navigate(`/task/${task.id}`);
  };

  return (
    <div
      className={cn(
        "relative border rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg cursor-pointer animate-fade-in",
        completed ? "border-green-500 bg-green-50" : "border-gray-200 bg-white hover:border-primary",
      )}
      onClick={handleClick}
    >
      {completed && (
        <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
          <Check size={16} />
        </div>
      )}
      <div className="p-6">
        <div className="text-4xl mb-2">{task.icon}</div>
        <h3 className="text-lg font-bold mb-2">{task.title}</h3>
        <p className="text-sm text-gray-600 mb-3">{task.description}</p>
      </div>
    </div>
  );
};

export default TaskCard;
