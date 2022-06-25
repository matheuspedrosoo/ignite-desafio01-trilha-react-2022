import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { ITaskProps } from '../types/ITaskProps';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import taskReducer from './taskReducer';

interface TasksContextProps {
  tasks: ITaskProps[];
  addTask: (task: ITaskProps) => void;
  deleteTask: (id: string) => void;
  toogleTask: (id: string) => void;
  tasksCompleted: number;
  handleOnDragEnd: any;
  dataTasks: ITaskProps[];
}

const initialState = {
  tasks: [],
};

export const TaskContext = createContext({} as TasksContextProps);

interface ChildrenProps {
  children: ReactNode;
}

export const TaskProvider = ({ children }: ChildrenProps) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [dataTasks, setDataTasks] = useState(state.tasks);

  const addTask = (task: ITaskProps) => {
    dispatch({
      type: 'add-task',
      payload: { ...task, id: uuidv4(), isCompleted: false },
    });
  };

  const deleteTask = (id: string) => {
    dispatch({
      type: 'delete-task',
      payload: id,
    });
    toast.success('Tarefa excluída!', { theme: 'dark' });
  };

  const toogleTask = (id: string) => {
    dispatch({
      type: 'toogle-task',
      payload: id,
    });
  };

  const tasksIsDone = state.tasks.filter(
    (task: ITaskProps) => task.isCompleted === true
  );

  function handleOnDragEnd(task: any) {
    if (!task.destination) return;
    const items = Array.from(dataTasks);
    const [reorderedItem] = items.splice(task.source.index, 1);
    items.splice(task.destination.index, 0, reorderedItem);

    setDataTasks(items);
  }

  useEffect(() => {
    if (state.tasks) {
      setDataTasks(state.tasks);
    }
  }, [state.tasks]);

  const value = {
    tasks: dataTasks,
    addTask,
    deleteTask,
    toogleTask,
    tasksCompleted: tasksIsDone.length,
    handleOnDragEnd,
    dataTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

const useTask = () => {
  const context = useContext(TaskContext);

  if (context === undefined) {
    throw new Error('useTask must be used within TaskContext');
  }
  return context;
};

export default useTask;
