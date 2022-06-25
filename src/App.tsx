import { ToastContainer } from 'react-toastify';
import { CreateNewTask, Header, TaskList } from './components';
import { TaskProvider } from './Context/TasksContext';

import './styles/global.css';
import 'react-toastify/dist/ReactToastify.min.css';

export function App() {
  return (
    <>
      <TaskProvider>
        <Header />
        <CreateNewTask />
        <TaskList />
        <ToastContainer />
      </TaskProvider>
    </>
  );
}
