import { ITaskProps } from '../types/ITaskProps';

const taskReducer = (state: any, { type, payload }: any) => {
  switch (type) {
    case 'add-task':
      return {
        tasks: [...state.tasks, payload],
      };
    case 'delete-task':
      return {
        ...state,
        tasks: state.tasks.filter((task: ITaskProps) => task.id != payload),
      };
    case 'toogle-task':
      return {
        ...state,
        tasks: state.tasks.map((task: ITaskProps) =>
          task.id === payload
            ? {
                ...task,
                isCompleted: !task.isCompleted,
              }
            : task
        ),
      };
    default:
      state;
  }
};

export default taskReducer;
