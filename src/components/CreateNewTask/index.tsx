import { PlusCircle } from 'phosphor-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import useTask from '../../Context/TasksContext';

import styles from './CreateNewTask.module.css';

export function CreateNewTask() {
  const [task, setTask] = useState({
    id: '',
    name: '',
    isCompleted: false,
  });

  const { addTask } = useTask();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setTask({ ...task, name: e.target.value });
  }

  function handleCreateNewTask(e: FormEvent) {
    e.preventDefault();

    if (task.name === '') {
      toast.error('Erro, campo vazio!', { theme: 'dark' });
      return;
    }

    addTask(task);
    toast.success('Nova tarefa adicionada!', { theme: 'dark' });

    setTask({
      id: '',
      name: '',
      isCompleted: false,
    });
  }

  return (
    <>
      <form className={styles.content} onSubmit={handleCreateNewTask}>
        <input
          type='text'
          placeholder='Adicione uma nova tarefa'
          name='task'
          value={task.name}
          onChange={handleChange}
          data-testid='input-add-task'
        />
        <button type='submit'>
          Criar <PlusCircle size={20} />
        </button>
      </form>
    </>
  );
}
