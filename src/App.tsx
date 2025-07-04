import { useState } from "react";
import { Trash2, Circle, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Toaster, toast } from "sonner";
import Header from "./components/layout/Header";
import type Task from "./types";
import Form from "./components/Form";

import { motion, AnimatePresence } from "framer-motion";
type TaskPriorityType = Task["priority"];

const initialTasks: Task[] = [
  {
    id: crypto.randomUUID(),
    title: "Finish project proposal",
    completed: false,
    priority: "high",
    createdAt: new Date("2025-06-01T09:00:00Z"),
  },
  {
    id: crypto.randomUUID(),
    title: "Buy groceries for the week",
    completed: false,
    priority: "medium",
    createdAt: new Date("2025-06-03T14:30:00Z"),
  },
  {
    id: crypto.randomUUID(),
    title: 'Read "Atomic Habits" - Chapter 3',
    completed: true,
    priority: "low",
    createdAt: new Date("2025-05-28T10:00:00Z"),
  },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const [mounted, setMounted] = useState(false);

  const handleToggleComplete = (taskId: string) => {
    const taskToToggle = tasks.find((task) => task.id === taskId);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
    if (taskToToggle) {
      toast.info(
        `Task "${taskToToggle.title}" marked as ${
          !taskToToggle.completed ? "complete" : "incomplete"
        }.`
      );
    }
  };

  const handleDeleteTask = (taskId: string) => {
    const taskToDelete = tasks.find((task) => task.id === taskId);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    if (taskToDelete) {
      toast.warning(`Task "${taskToDelete.title}" deleted.`);
    }
  };

  const getPriorityIcon = (priority: TaskPriorityType) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />;
      case "medium":
        return <Circle className="h-4 w-4 text-yellow-500 mr-1" />;
      case "low":
        return <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />;
      default:
        return null;
    }
  };

  const getPriorityClass = (priority: TaskPriorityType): string => {
    switch (priority) {
      case "high":
        return "border-l-4 border-red-500";
      case "medium":
        return "border-l-4 border-yellow-500";
      case "low":
        return "border-l-4 border-green-500";
      default:
        return "border-l-4 border-gray-300";
    }
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // const taskVariants = {
  //   hidden: {
  //     opacity: 0,
  //     x: -50,
  //     scale: 0.8,
  //   },
  //   visible: {
  //     opacity: 1,
  //     x: 0,
  //     scale: 1,
  //     transition: {
  //       duration: 0.4,
  //       ease: "easeOut",
  //     },
  //   },
  //   exit: {
  //     opacity: 0,
  //     x: 50,
  //     scale: 0.8,
  //     transition: {
  //       duration: 0.3,
  //       ease: "easeIn",
  //     },
  //   },
  // };

  // const checkboxVariants = {
  //   unchecked: { scale: 1 },
  //   checked: {
  //     scale: [1, 1.2, 1],
  //     transition: { duration: 0.3 },
  //   },
  // };

  // const statsVariants = {
  //   hidden: { opacity: 0, y: 20 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       delay: 0.5,
  //       duration: 0.4,
  //     },
  //   },
  // };

  // if (!mounted) {
  //   return null;
  // }

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="pt-[72px] flex flex-col w-full min-h-screen overflow-hidden dark:bg-gradient-to-br bg-[#e1c1eb] dark:from-[#1a1a2e] dark:via-[#231b32] dark:to-[#1f1f2f]"
      >
        <Header />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col justify-center items-center md:p-8 p-4 "
        >
          <div className="flex">
            <Form tasks={tasks} setTasks={setTasks} />
          </div>
          <main className=" mx-auto p-2">
            <Card className="bg-card text-card-foreground shadow-xl">
              <CardContent className="pt-6">
                {tasks.length === 0 ? (
                  <p className="text-center text-muted-foreground py-10 text-lg">
                    No tasks yet. Add one above to get started! :)
                  </p>
                ) : (
                  <div className="space-y-2">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className={`flex items-center justify-between p-4 rounded-lg shadow-sm border
                                ${getPriorityClass(task.priority)}
                                ${
                                  task.completed
                                    ? "bg-gray-100/70 dark:bg-gray-900/40 opacity-70"
                                    : "bg-card"
                                }`}
                      >
                        <div className="flex items-center space-x-4 flex-grow">
                          <Checkbox
                            id={`task-checkbox-${task.id}`}
                            checked={task.completed}
                            onCheckedChange={() =>
                              handleToggleComplete(task.id)
                            }
                            aria-labelledby={`task-label-${task.id}`}
                            className="transform scale-110 cursor-pointer"
                          />
                          <div className="flex-grow">
                            <Label
                              htmlFor={`task-checkbox-${task.id}`}
                              id={`task-label-${task.id}`}
                              className={`text-lg font-medium cursor-pointer ${
                                task.completed
                                  ? "line-through text-muted-foreground"
                                  : "text-foreground"
                              }`}
                            >
                              {task.title}
                            </Label>
                            <div className="text-xs text-muted-foreground flex items-center mt-1">
                              {getPriorityIcon(task.priority)}
                              Priority:{" "}
                              {task.priority.charAt(0).toUpperCase() +
                                task.priority.slice(1)}
                              {task.createdAt && (
                                <span className="ml-2">
                                  {" "}
                                  | Created:{" "}
                                  {new Date(
                                    task.createdAt
                                  ).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteTask(task.id)}
                          aria-label={`Delete task titled ${task.title}`}
                          className="cursor-pointer text-red-500 hover:text-red-700 dark:hover:text-red-400 ml-2 flex-shrink-0"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>

              {tasks.length > 0 && (
                <CardFooter className="text-sm text-muted-foreground pt-6 border-t mt-6 flex justify-between items-center">
                  <p>
                    You have{" "}
                    <span className="font-semibold text-foreground">
                      {tasks.filter((task) => !task.completed).length}
                    </span>{" "}
                    pending task(s).
                  </p>
                  <p>
                    Total tasks:{" "}
                    <span className="font-semibold text-foreground">
                      {tasks.length}
                    </span>
                  </p>
                </CardFooter>
              )}
            </Card>
          </main>
        </motion.div>

        <Toaster richColors position="top-right" />
      </motion.div>
    </>
  );
}

export default App;
