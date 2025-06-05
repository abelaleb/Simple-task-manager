import { useState, type FormEvent } from 'react';
import { PlusCircle, Trash2, Circle, CheckCircle2, AlertTriangle } from 'lucide-react'; // Icons
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster, toast } from 'sonner';

import type Task from './types'; 

type TaskPriorityType = Task['priority'];

const initialTasks: Task[] = [
  {
    id: crypto.randomUUID(),
    title: 'Finish project proposal',
    completed: false,
    priority: 'high', 
    createdAt: new Date('2025-06-01T09:00:00Z'),
  },
  {
    id: crypto.randomUUID(),
    title: 'Buy groceries for the week',
    completed: false,
    priority: 'medium', 
    createdAt: new Date('2025-06-03T14:30:00Z'),
  },
  {
    id: crypto.randomUUID(),
    title: 'Read "Atomic Habits" - Chapter 3',
    completed: true,
    priority: 'low',   
    createdAt: new Date('2025-05-28T10:00:00Z'),
  },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [newTaskPriority, setNewTaskPriority] = useState<TaskPriorityType>('medium');

  const handleAddTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newTaskTitle.trim()) {
      toast.error("Task title cannot be empty!");
      return;
    }
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: newTaskTitle.trim(),
      completed: false,
      priority: newTaskPriority, 
      createdAt: new Date(),
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
    setNewTaskTitle('');
    setNewTaskPriority('medium'); 
    toast.success("Task added successfully!");
  };

  const handleToggleComplete = (taskId: string) => {
    const taskToToggle = tasks.find(task => task.id === taskId);
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
    if (taskToToggle) {
        toast.info(`Task "${taskToToggle.title}" marked as ${!taskToToggle.completed ? 'complete' : 'incomplete'}.`);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    const taskToDelete = tasks.find(task => task.id === taskId);
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    if (taskToDelete) {
        toast.warning(`Task "${taskToDelete.title}" deleted.`);
    }
  };

  const getPriorityIcon = (priority: TaskPriorityType) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />;
      case 'medium':
        return <Circle className="h-4 w-4 text-yellow-500 mr-1" />;
      case 'low':
        return <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />;
      default:
        return null;
    } 
  };

  const getPriorityClass = (priority: TaskPriorityType): string => {
    switch (priority) {
      case 'high':
        return "border-l-4 border-red-500";
      case 'medium':
        return "border-l-4 border-yellow-500";
      case 'low':
        return "border-l-4 border-green-500";
      default:
        return "border-l-4 border-gray-300";
    }
  };

  return (
    <>
      <div className="container mx-auto bg-red-300 p-4 sm:p-6 md:p-8 max-w-3xl">
        <Card className="bg-white dark:bg-gray-900 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-800 dark:text-white">
              🎯 My Task Manager
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row gap-3 mb-8 p-4 border dark:border-gray-700 rounded-lg bg-slate-50 dark:bg-slate-800/30">
              <Input
                type="text"
                placeholder="Add a new task title..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="flex-grow dark:bg-gray-800 dark:text-white dark:border-gray-700 text-base"
                aria-label="New task title"
              />
              <Select
                value={newTaskPriority}
                onValueChange={(value: string) => setNewTaskPriority(value as TaskPriorityType)}
              >
                <SelectTrigger className="w-full sm:w-[180px] dark:bg-gray-800 dark:text-white dark:border-gray-700">
                  <SelectValue placeholder="Set priority" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:text-white">
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              <Button type="submit" variant="default" size="lg" className="w-full sm:w-auto">
                <PlusCircle className="mr-2 h-5 w-5" /> Add Task
              </Button>
            </form>

            {tasks.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 py-10 text-lg">
                No tasks yet. Add one above to get started! 🎉
              </p>
            ) : (
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center justify-between p-4 rounded-lg shadow-sm border
                                ${getPriorityClass(task.priority)}
                                ${task.completed ? 'bg-green-100/70 dark:bg-green-900/40 opacity-70' : 'bg-white dark:bg-gray-800/60'}`}
                  >
                    <div className="flex items-center space-x-4 flex-grow">
                      <Checkbox
                        id={`task-checkbox-${task.id}`}
                        checked={task.completed}
                        onCheckedChange={() => handleToggleComplete(task.id)}
                        aria-labelledby={`task-label-${task.id}`}
                        className="transform scale-110"
                      />
                      <div className="flex-grow">
                        <Label
                          htmlFor={`task-checkbox-${task.id}`}
                          id={`task-label-${task.id}`}
                          className={`text-lg font-medium cursor-pointer ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'}`}
                        >
                          {task.title}
                        </Label>
                        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
                          {getPriorityIcon(task.priority)}
                          Priority: {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                          {task.createdAt && (
                            <span className="ml-2"> | Created: {new Date(task.createdAt).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteTask(task.id)}
                      aria-label={`Delete task titled ${task.title}`}
                      className="text-red-500 hover:text-red-700 dark:hover:text-red-400 ml-2 flex-shrink-0"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>

          {tasks.length > 0 && (
             <CardFooter className="text-sm text-gray-600 dark:text-gray-400 pt-6 border-t dark:border-gray-700 mt-6 flex justify-between items-center">
                <p>You have <span className="font-semibold">{tasks.filter(task => !task.completed).length}</span> pending task(s).</p>
                <p>Total tasks: <span className="font-semibold">{tasks.length}</span></p>
             </CardFooter>
          )}
        </Card>
      </div>
      <Toaster richColors position="top-right" />
    </>
  );
}

export default App;