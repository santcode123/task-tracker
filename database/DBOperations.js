import fs from 'fs';
import path from 'path';

class DBOperations {
    #dbPath;

    constructor(dbPath) {
        this.dbPath = dbPath;

        if (!fs.existsSync(this.dbPath)) {
            fs.promises.writeFile(this.dbPath, JSON.stringify({ tasks: [] }, null, 2), 'utf-8'); // Initialize with an empty object
        }
    }

    get dbPath() {
        return this.#dbPath;
    }

    set dbPath(value) {
        if (typeof value !== 'string' || !value.trim()) {
            throw new Error("Invalid database path provided.");
        }
        this.#dbPath = value;
    }

    async addDocument(document) {

        if (!this.dbPath) {
            throw new Error("Database connection is not established.");
        }

        try {
            const dbPath = this.dbPath;
            let oldData = await fs.promises.readFile(dbPath, 'utf-8');

            oldData = JSON.parse(oldData);

            if (!oldData) {
                throw new Error("Database file is empty or does not contain valid JSON.");
            }
            const len = oldData.tasks?.length || 0;
            const lastId = len > 0 ? oldData.tasks[len - 1].id : 0;
            oldData?.tasks?.push({ ...document, id: lastId + 1 });
            await fs.promises.writeFile(dbPath, JSON.stringify(oldData, null, 2), 'utf-8'); //  {id, description, status}

            return lastId + 1; // Return the ID of the newly added document
        } catch (error) {
            console.error("Error adding document:", error);
            throw error;
        }

    }

    async getDocument() {
        if (!this.dbPath) {
            throw new Error("Database connection is not established.");
        }

        try {
            const dbPath = this.dbPath;

            if (!fs.existsSync(dbPath)) {
                throw new Error("Database file does not exist.");
            }

            const data = await fs.promises.readFile(dbPath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error("Error retrieving document:", error);
            throw error;
        }
    }

    async deleteDocument(id) {
        if (!this.dbPath) {
            throw new Error("Database connection is not established.");
        }

        try {
            const dbPath = this.dbPath;
            let oldData = await fs.promises.readFile(dbPath, 'utf-8');

            oldData = JSON.parse(oldData);

            if (!oldData || !Array.isArray(oldData.tasks)) {
                throw new Error("Database file is empty or does not contain valid JSON.");
            }

            oldData.tasks = oldData.tasks.filter(task => Number(task.id) !== Number(id));
            await fs.promises.writeFile(dbPath, JSON.stringify(oldData, null, 2), 'utf-8');

            return oldData.tasks.length; // Return the new length of the tasks array
        } catch (error) {
            console.error("Error deleting document:", error);
            throw error;
        }
    }

    async updateDocument(id, updatedDocument) {
        if (!this.dbPath) {
            throw new Error("Database connection is not established.");
        }

        try {
            const dbPath = this.dbPath;
            let oldData = await fs.promises.readFile(dbPath, 'utf-8');

            oldData = JSON.parse(oldData);

            if (!oldData || !Array.isArray(oldData.tasks)) {
                throw new Error("Database file is empty or does not contain valid JSON.");
            }

            const taskIndex = oldData.tasks.findIndex(task => task.id === Number(id));
            if (taskIndex === -1) {
                throw new Error(`Task with ID ${id} not found.`);
            }

            oldData.tasks[taskIndex] = { ...oldData.tasks[taskIndex], ...updatedDocument };
            await fs.promises.writeFile(dbPath, JSON.stringify(oldData, null, 2), 'utf-8');

            return oldData.tasks[taskIndex]; // Return the updated task
        } catch (error) {
            console.error("Error updating document:", error);
            throw error;
        }
    }
}

export { DBOperations };