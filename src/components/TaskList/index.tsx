import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Trash } from 'phosphor-react';
import useTask from '../../Context/TasksContext';
import list from '../../assets/list.svg';
import styles from './TaskList.module.css';

export function TaskList() {
  const { tasks, deleteTask, toogleTask, tasksCompleted, handleOnDragEnd } =
    useTask();

  return (
    <>
      <div className={styles.content}>
        <header>
          <p className={styles.createdTasks}>
            <strong>Tafefas criadas</strong> <span>{tasks.length}</span>
          </p>
          <p className={styles.completedTasks}>
            <strong>Concluídas</strong>
            <span>
              {tasksCompleted} de {tasks.length}
            </span>
          </p>
        </header>

        {tasks.length > 0 ? (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId='wrapper'>
              {(droppableProvided) => (
                <ul
                  className='wrapper'
                  {...droppableProvided.droppableProps}
                  ref={droppableProvided.innerRef}
                >
                  <>
                    {tasks.map((task, index) => {
                      return (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              className={styles.task}
                              key={index}
                              onClick={() => toogleTask(task.id)}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <label
                                htmlFor='task'
                                style={{
                                  textDecoration: task.isCompleted
                                    ? 'line-through'
                                    : 'none',
                                }}
                              >
                                <input
                                  type='checkbox'
                                  id='task'
                                  checked={task.isCompleted ? true : false}
                                  disabled
                                />

                                <div className={styles.checkboxDiv}></div>
                                {task.name}
                              </label>
                              <span className={styles.iconTrash}>
                                <Trash
                                  className={styles.iconTrash}
                                  size={20}
                                  onClick={() => deleteTask(task.id)}
                                />
                              </span>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {{ ...droppableProvided.placeholder }}
                  </>
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <div className={styles.emptyListTasks}>
            <img src={list} alt='ícone de lista' />
            <h2>Você ainda não tem tarefas cadastradas</h2>
            <br />
            <span>Crie tarefas e organize seus itens a fazer</span>
          </div>
        )}
      </div>
    </>
  );
}
