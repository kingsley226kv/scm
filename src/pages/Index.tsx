
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import TaskCard from '../components/TaskCard';
import Header from '../components/Header';
import { useTaskContext } from '../contexts/TaskContext';
import { toast } from 'sonner';
const Index = () => {
  const navigate = useNavigate();
  const {
    tasks,
    completedTasks,
    allTasksCompleted,
    resetTasks
  } = useTaskContext();
  useEffect(() => {
    if (completedTasks.length > 0) {
      toast(`Completed ${completedTasks.length}/${tasks.length} tasks`, {
        description: "Keep going to complete all challenges!"
      });
    }
  }, [completedTasks.length, tasks.length]);
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all task progress?')) {
      resetTasks();
      toast.success('All task progress has been reset');
    }
  };
  return <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="container mx-auto p-4 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Setia City Mall Mother's Day E-Treasure Hunt</h1>
            <p className="text-gray-600">Explore the mall, complete fun tasks</p>
          </div>

          {allTasksCompleted && <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6 text-center animate-fade-in">
              <h2 className="text-2xl font-bold text-green-700 mb-3"> You've completed all tasks!</h2>
              <p className="mb-4">You've successfully completed all challenges. Click next for your final task.</p>
              <Button onClick={() => navigate('/reward')} className="bg-green-600 hover:bg-green-700 py-[30px] px-[50px] text-3xl font-extrabold">NEXT</Button>
            </div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {tasks.map(task => <TaskCard key={task.id} task={task} />)}
          </div>

          {completedTasks.length > 0 && <div className="text-center mt-8">
              <Button variant="outline" onClick={handleReset} className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
                Reset All Progress
              </Button>
            </div>}
        </div>
      </div>
    </div>;
};
export default Index;
