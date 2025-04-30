import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useTaskContext } from '../contexts/TaskContext';
import Header from '../components/Header';
import PasswordEntry from '../components/PasswordEntry';
import MallMap from '../components/MallMap';
import QuizGame from '../components/QuizGame';
import MemoryGame from '../components/MemoryGame';
import ItemFinderGame from '../components/ItemFinderGame';
import VirtualShoppingGame from '../components/VirtualShoppingGame';
import TaskVideo from '../components/TaskVideo';
import { toast } from 'sonner';

enum TaskState {
  INTRO,
  PASSWORD_ENTRY,
  GAME,
  COMPLETED,
}

const TaskDetail = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const { tasks, completeTask, isTaskCompleted } = useTaskContext();
  
  const [taskState, setTaskState] = useState<TaskState>(TaskState.INTRO);
  const [task, setTask] = useState(tasks.find((t) => t.id === Number(taskId)));
  const [videoCompleted, setVideoCompleted] = useState(false);
  
  useEffect(() => {
    const foundTask = tasks.find((t) => t.id === Number(taskId));
    if (!foundTask) {
      toast.error('Task not found');
      navigate('/');
      return;
    }
    setTask(foundTask);
    
    if (isTaskCompleted(foundTask.id)) {
      setTaskState(TaskState.COMPLETED);
    }
  }, [taskId, tasks, navigate, isTaskCompleted]);
  
  if (!task) return null;

  const handleStartTask = () => {
    setTaskState(TaskState.PASSWORD_ENTRY);
  };

  const handleVideoComplete = () => {
    setVideoCompleted(true);
  };

  const handlePasswordSuccess = () => {
    setTaskState(TaskState.GAME);
  };

  const handleTaskComplete = () => {
    completeTask(task.id);
    setTaskState(TaskState.COMPLETED);
    toast.success('Congratulations! Task completed');
  };

  const handleReturnHome = () => {
    navigate('/');
  };

  const renderTaskContent = () => {
    switch (taskState) {
      case TaskState.INTRO:
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">{task.title}</h2>
              <p className="text-gray-600 mb-6">{task.description}</p>
              
              <TaskVideo 
                videoUrl={task.videoUrl} 
                onVideoComplete={handleVideoComplete} 
              />
              
              {videoCompleted && (
                <Button onClick={handleStartTask} className="w-full mt-6">
                  Start Task
                </Button>
              )}
            </div>
          </div>
        );
      
      case TaskState.PASSWORD_ENTRY:
        return (
          <div className="space-y-6">
            <MallMap location={task.location} />
            <PasswordEntry 
              correctPassword={getPasswordByTaskId(task.id)} 
              onCorrectPassword={handlePasswordSuccess} 
            />
          </div>
        );
      
      case TaskState.GAME:
        switch (task.id) {
          case 1:
            return <QuizGame taskId={1} onComplete={handleTaskComplete} />;
          case 2:
            return <ItemFinderGame onComplete={handleTaskComplete} />;
          case 3:
            return <MemoryGame onComplete={handleTaskComplete} />;
          case 4:
            return <QuizGame taskId={4} onComplete={handleTaskComplete} />;
          case 5:
            return <VirtualShoppingGame onComplete={handleTaskComplete} />;
          default:
            return <div>Loading task content...</div>;
        }
      
      case TaskState.COMPLETED:
        return (
          <div className="bg-green-50 p-6 rounded-lg shadow-md text-center border border-green-200">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-green-700 mb-2">Task Completed!</h3>
            <p className="mb-6">
              Congratulations! You've successfully completed the <strong>{task.title}</strong> task!
            </p>
            <Button onClick={handleReturnHome} className="w-full">
              Return to Home
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="container mx-auto p-4 flex-1">
        <div className="max-w-md mx-auto">
          <div className="mb-4">
            <Link to="/" className="inline-flex items-center text-gray-600 hover:text-primary">
              <ArrowLeft size={16} className="mr-1" />
              <span>Back to Task List</span>
            </Link>
          </div>
          
          {renderTaskContent()}
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;

const getPasswordByTaskId = (taskId: number): string => {
  const passwords: { [key: number]: string } = {
    1: '1111',
    2: '2222',
    3: '3333',
    4: '4444',
    5: '5555'
  };
  return passwords[taskId] || '';
};
