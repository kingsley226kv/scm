
import React, { createContext, useState, useContext, useEffect } from 'react';

export type TaskType = {
  id: number;
  type: 'quiz' | 'game';
  title: string;
  description: string;
  location: string;
  icon: string;
  videoUrl: string;
};

type TaskContextType = {
  tasks: TaskType[];
  completedTasks: number[];
  completeTask: (taskId: number) => void;
  resetTasks: () => void;
  isTaskCompleted: (taskId: number) => boolean;
  allTasksCompleted: boolean;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Updated all videos to use the Famous Amos video
const videoUrl = "https://jjvvrbkicbqetopyyhky.supabase.co/storage/v1/object/sign/video/famous%20amos.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2Y2MmJjYzZjLWExNjMtNDNkMC1iYThkLWMyZmJiMGY1NmRiNCJ9.eyJ1cmwiOiJ2aWRlby9mYW1vdXMgYW1vcy5tcDQiLCJpYXQiOjE3NDU5MjIwODksImV4cCI6MTc0NjUyNjg4OX0.JfATUvnP4guMpl0gO9r-3aWYbd9xI6pOMkprs5snfPo";

// Updated task data with different locations
const taskData: TaskType[] = [
  {
    id: 1,
    type: 'quiz',
    title: 'Mall History Quiz',
    description: 'Test your knowledge about our mall\'s history and facts',
    location: 'Information Center',
    icon: '🏬',
    videoUrl: videoUrl,
  },
  {
    id: 2,
    type: 'game',
    title: 'Item Finder Challenge',
    description: 'Find all the listed items as quickly as possible',
    location: 'Central Court',
    icon: '🛍️',
    videoUrl: videoUrl,
  },
  {
    id: 3,
    type: 'game',
    title: 'Memory Match Game',
    description: 'Match all the brand logos in this memory challenge',
    location: 'Brand Gallery',
    icon: '🔍',
    videoUrl: videoUrl,
  },
  {
    id: 4,
    type: 'quiz',
    title: 'Brand Knowledge Quiz',
    description: 'Test your knowledge about brands in our mall',
    location: 'Fashion Zone',
    icon: '📝',
    videoUrl: videoUrl,
  },
  {
    id: 5,
    type: 'game',
    title: 'Virtual Shopping Challenge',
    description: 'Complete a shopping challenge with a limited budget',
    location: 'Retail District',
    icon: '🎮',
    videoUrl: videoUrl,
  },
];

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [completedTasks, setCompletedTasks] = useState<number[]>(() => {
    const saved = localStorage.getItem('completedTasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [tasks] = useState<TaskType[]>(taskData);

  const completeTask = (taskId: number) => {
    if (!completedTasks.includes(taskId)) {
      setCompletedTasks([...completedTasks, taskId]);
    }
  };

  const resetTasks = () => {
    setCompletedTasks([]);
  };

  const isTaskCompleted = (taskId: number) => {
    return completedTasks.includes(taskId);
  };

  const allTasksCompleted = completedTasks.length === tasks.length;

  useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [completedTasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        completedTasks,
        completeTask,
        resetTasks,
        isTaskCompleted,
        allTasksCompleted,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
