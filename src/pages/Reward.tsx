
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useTaskContext } from '../contexts/TaskContext';
import Header from '../components/Header';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";

const Reward = () => {
  const {
    allTasksCompleted,
    tasks,
    completedTasks
  } = useTaskContext();
  if (!allTasksCompleted) {
    return <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="container mx-auto p-4 flex-1">
          <div className="max-w-md mx-auto text-center mt-10">
            <h2 className="text-2xl font-bold mb-4">You haven't completed all tasks yet</h2>
            <p className="mb-6 text-gray-600">
              Please complete all 5 tasks to claim your reward!
            </p>
            <Link to="/">
              <Button>Return to Task List</Button>
            </Link>
          </div>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="container mx-auto p-4 flex-1">
        <div className="max-w-md mx-auto">
          <div className="mb-4">
            <Link to="/" className="inline-flex items-center text-gray-600 hover:text-primary">
              <ArrowLeft size={16} className="mr-1" />
              <span>Back to Home</span>
            </Link>
          </div>
          
          <div className="bg-gradient-to-b from-primary to-secondary text-white rounded-lg shadow-lg p-6 mb-6 animate-fade-in">
            <div className="text-center">
              <div className="text-6xl mb-4">🏆</div>
              <h2 className="font-bold mb-2 text-2xl">#setiacitymall #mother'sday #scmmother'sdayetreasurehunt</h2>
              <p className="mb-4 opacity-90">
            </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-bold mb-3">Final Task</h3>
            <p className="text-zinc-950 text-left">Head back to stage and take a Selfie at the Backdrop.
Upload selfie to Facebook with above hashtags and show to crew for password.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-bold mb-3">Password</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Task</TableHead>
                  <TableHead>Password</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Final</TableCell>
                  <TableCell>HAPPYMOTHERSDAY</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          
        </div>
      </div>
    </div>;
};
export default Reward;
