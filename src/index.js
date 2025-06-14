import { CLIInterface } from './CLIInterface.js';

const operationName = process.argv[2];
const params1 = process.argv[3];
const params2 = process.argv[4];


const cliInterface = new CLIInterface();
switch (operationName) {
    case 'add':


        cliInterface.addTask(params1);
        // Here you would call the function to add a document
        // For example: await dbOperations.addDocument({ param1: params1, param2: params2 });
        break;
    case 'list':
        if (params1) {
            cliInterface.getTasksBasedOnStatus(params1);
        } else {
            cliInterface.listTasks();
        }

        // Here you would call the function to get a document
        // For example: const document = await dbOperations.getDocument(params1);
        break;
    case 'delete':
        cliInterface.deleteTask(params1);
        // Here you would call the function to delete a document
        // For example: await dbOperations.deleteDocument(params1);
        break;
    case 'update':
        cliInterface.updateTask(params1, params2);
        // Here you would call the function to update a document
        // For example: await dbOperations.updateDocument(params1, params2);
        break;
    case 'mark-in-progress':
        cliInterface.markInProgress(params1);
        // Here you would call the function to mark a task as in progress
        // For example: await dbOperations.markInProgress(params1);
        break;
    case 'mark-done':
        cliInterface.markTaskDone(params1);
        // Here you would call the function to mark a task as done
        // For example: await dbOperations.markTaskDone(params1);
        break;
    default:
        console.error('Unknown operation. Please use "add" or "get".');
}