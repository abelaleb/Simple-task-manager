
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
import { Plus, PlusCircle } from "lucide-react";

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

  return (
    <div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
              <Plus size={18} />
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
              <Button onClick={() => handleAddTask()} className="">Add Task</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* <form
        onSubmit={handleAddTask}
        className="flex flex-col justify-center items-center gap-3 mb-8 p-4 border rounded-lg bg-muted/40"
      >
        <Input
          type="text"
          placeholder="Add a new task title..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="flex-grow text-base"
          aria-label="New task title"
        />
        <Select
          value={newTaskPriority}
          onValueChange={(value) =>
            setNewTaskPriority(value as TaskPriorityType)
          }
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Set priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
        <Button
          type="submit"
          variant="default"
          size="lg"
          className="w-full sm:w-auto"
        >
          <PlusCircle className="mr-2 h-5 w-5" /> Add Task
        </Button>
      </form> */}
    </div>
  );
};

export default Form;
