import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "./ui/dialog";
import type Task from "@/types";
import {
  type FormEvent,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

interface FormProps {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

const Form = ({ tasks, setTasks }: FormProps) => {
  type TaskPriorityType = Task["priority"];

  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [newTaskPriority, setNewTaskPriority] =
    useState<TaskPriorityType>("medium");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleAddTask = (event?: FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();
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
    setTasks((prevTasks) => [newTask, ...prevTasks]);
    setNewTaskTitle("");
    setNewTaskPriority("medium");
    setIsDialogOpen(false);
    toast.success("Task added successfully!");
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
  return (
    <div>
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg  "
      >
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className=" w-full bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
              <motion.div
                animate={{ rotate: isDialogOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Plus size={18} />
              </motion.div>
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Add a new task title..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
              />
              <Select
                value={newTaskPriority}
                onValueChange={(value) =>
                  setNewTaskPriority(value as TaskPriorityType)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={() => handleAddTask()}
                className="cursor-pointer"
              >
                Add Task
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
};

export default Form;
