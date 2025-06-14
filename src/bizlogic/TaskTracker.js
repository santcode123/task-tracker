import { DBOperations } from "../../database/DBOperations.js";

class TaskTracker {
    db = null; // Placeholder for database connection
    tasksCount = 0; // In-memory task storage, replace with database operations in real implementation

    constructor() {
        this.db = new DBOperations('tasks.json'); // Initialize DBOperations with a file path

    }

    async addTask(taskDescription) {
        const task = {
            description: taskDescription,
            status: 'todo'
        };
        return this.db.addDocument(task); // Save task to the database

    }

    async getTasks() {
        return this.db.getDocument(); // Retrieve tasks from the database

    }

    async deleteTask(taskId) {
        // Placeholder for delete logic, implement as needed
        return this.db.deleteDocument(taskId); // Delete task from the database
    }

    async updateTask(taskId, updatedTask) {
        // Placeholder for update logic, implement as needed
        return this.db.updateDocument(taskId, updatedTask); // Update task in the database
    }

    async changeStatus(taskId, status) {
        // Placeholder for marking task as in progress, implement as needed
        const documentObj = await this.getTasks();
        const tasks = documentObj.tasks || [];
        const task = tasks.find(t => Number(t.id) === Number(taskId));
        if (task) {
            task.status = status;
            return this.updateTask(taskId, task); // Update task status in the database
        } else {
            throw new Error(`Task with ID ${taskId} not found.`);
        }
    }

    async getTasksBasedonStatus(status) {
        const documentObj = await this.getTasks();
        const tasks = documentObj.tasks || [];
        return tasks.filter(task => task.status === status); // Filter tasks based on status
    }


}

export { TaskTracker };