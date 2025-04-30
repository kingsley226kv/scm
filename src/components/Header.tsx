import React from 'react';
import { Trophy } from 'lucide-react';
import { useTaskContext } from '../contexts/TaskContext';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const {
    completedTasks,
    tasks
  } = useTaskContext();
  const navigate = useNavigate();
  return <header className="bg-gradient-to-r from-primary to-secondary text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold" onClick={() => navigate('/')}>Setia City Mall Mother's Day E-Treasure Hunt</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Trophy size={24} className="text-yellow-300" />
          <span className="font-bold">
            {completedTasks.length}/{tasks.length}
          </span>
        </div>
      </div>
    </header>;
};
export default Header;