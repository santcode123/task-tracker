import { TaskTracker } from './bizlogic/TaskTracker.js';

class CLIInterface {

    addTask(description) {
        if (!description) {
            console.error("Task description is required.");
            return;
        }

        const taskTracker = new TaskTracker();

        taskTracker.addTask(description)
            .then((taskId) => {
                console.log(`Task added successfully with ID: ${taskId}`);
            })
            .catch((error) => {
                console.error("Error adding task:", error);
            });

        // Here you would call the function to add a task
        // For example: await taskTracker.addTask(description);
    }

    listTasks() {
        const taskTracker = new TaskTracker();

        taskTracker.getTasks()
            .then((tasks) => {
                console.log("Tasks:", tasks);
            })
            .catch((error) => {
                console.error("Error retrieving tasks:", error);
            });
    }
    deleteTask(taskId) {
        const taskTracker = new TaskTracker();

        taskTracker.deleteTask(taskId)
            .then(() => {
                console.log(`Task with ID ${taskId} deleted successfully.`);
            })
            .catch((error) => {
                console.error("Error deleting task:", error);
            });
    }

    updateTask(taskId, updatedTask) {
        const taskTracker = new TaskTracker();
        const updatedTaskObj = { description: updatedTask };

        taskTracker.updateTask(taskId, updatedTaskObj)
            .then(() => {
                console.log(`Task with ID ${taskId} updated successfully.`);
            })
            .catch((error) => {
                console.error("Error updating task:", error);
            });
    }

    markInProgress(taskId) {
        const taskTracker = new TaskTracker();

        taskTracker.changeStatus(taskId, 'in-progress')
            .then(() => {
                console.log(`Task with ID ${taskId} marked as in progress.`);
            })
            .catch((error) => {
                console.error("Error marking task as in progress:", error);
            });
    }

    markTaskDone(taskId) {
        const taskTracker = new TaskTracker();

        taskTracker.changeStatus(taskId, 'done')
            .then(() => {
                console.log(`Task with ID ${taskId} marked as done.`);
            })
            .catch((error) => {
                console.error("Error marking task as done:", error);
            });
    }

    getTasksBasedOnStatus(status) {
        const taskTracker = new TaskTracker();

        taskTracker.getTasksBasedonStatus(status)
            .then((tasks) => {
                console.log(`Tasks with status "${status}":`, tasks);
            })
            .catch((error) => {
                console.error(`Error retrieving tasks with status "${status}":`, error);
            });
    }

}

export { CLIInterface };