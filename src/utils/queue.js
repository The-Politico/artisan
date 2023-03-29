import { v4 as uuidv4 } from 'uuid';

/**
 * Constructor that creates a task queue which runs the same callback on
 * a set of paramters one at a time
 *
 * @param {Function} callback - The callback function to be executed
 *  for each task in the queue.
 *
 * @returns {Object} The queuing interface
 *
 * @example
 * const cb = async ({id}) => { ... }
 * const queue = createQueue(cb);
 * queue.add({ id: 1 });
 * queue.add({ id: 2 });
 */
export default function createQueue(callback) {
  const tasks = new Map();
  let executing;

  const executeTask = async (id) => {
    try {
      await callback(tasks.get(id));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
    tasks.delete(id);
  };

  const startExecution = async () => {
    if (tasks.size > 0) {
      executing = true;
      const nextTask = tasks.keys().next().value;
      await executeTask(nextTask);
      setTimeout(startExecution, 0);
    } else {
      executing = false;
    }
  };

  const addTask = (args) => {
    const id = uuidv4();

    tasks.set(id, args);

    if (!executing) {
      startExecution();
    }
  };

  return {
    add: addTask,
  };
}
