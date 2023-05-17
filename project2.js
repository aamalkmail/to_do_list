function Task(description, dueDate, priority) {
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = false;
}

function ToDoList() {
    this.tasks = [];
}

ToDoList.prototype.addTask = function (description, dueDate, priority) {
    const newTask = new Task(description, dueDate, priority);
    this.tasks.push(newTask);
    console.log("Task added successfully.");
};

ToDoList.prototype.listAllTasks = function () {
    if (this.tasks.length === 0) {
        console.log("No tasks found.");
    } else {
        console.log("All tasks:");
        this.tasks.forEach(function (task) {
            console.log(task.description);
        });
    }
};

ToDoList.prototype.listCompletedTasks = function () {
    const completedTasks = this.tasks.filter(function (task) {
        return task.completed;
    });

    if (completedTasks.length === 0) {
        console.log("No completed tasks found.");
    } else {
        console.log("Completed tasks:");
        completedTasks.forEach(function (task) {
            console.log(task.description);
        });
    }
};

ToDoList.prototype.markTaskAsCompleted = function (description) {
    const updatedTasks = this.tasks.filter(function (task) {
        if (task.description === description) {
            task.completed = true;
        }
        return true;
    });

    if (updatedTasks.length === this.tasks.length) {
        console.log("Task not found.");
    } else {
        this.tasks = updatedTasks;
        console.log("Task marked as completed.");
    }
};

ToDoList.prototype.deleteTask = function (description) {
    const taskIndex = this.tasks.findIndex(function (task) {
        return task.description === description;
    });

    if (taskIndex !== -1) {
        this.tasks.splice(taskIndex, 1);
        console.log("Task deleted successfully.");
    } else {
        console.log("Task not found.");
    }
};

ToDoList.prototype.sortTasksByDueDate = function () {
    this.tasks.sort(function (a, b) {
        return new Date(a.dueDate) - new Date(b.dueDate);
    });

    console.log("Tasks sorted by due date.");
    const descriptions = this.tasks.map(task => task.description);
    console.log(descriptions);
};

ToDoList.prototype.sortTasksByPriority = function () {
    this.tasks.sort(function (a, b) {
        return a.priority - b.priority;
    });

    console.log("Tasks sorted by priority.");
    const descriptions = this.tasks.map(task => task.description);
    console.log(descriptions);

};

ToDoList.prototype.clearAllTasks = function () {
    this.tasks = [];
    console.log("All tasks cleared.");
};

const todoList = new ToDoList();

function displayMenu() {
    console.log("***************************");
    console.log("Welcome to JS TODO-APP");
    console.log("***************************");
    console.log("Select an action:");
    console.log("1) Add a new task");
    console.log("2) List all tasks");
    console.log("3) List completed tasks");
    console.log("4) Mark a task as done");
    console.log("5) Delete a task");
    console.log("6) Sort tasks by due date");
    console.log("7) Sort tasks by priority");
    console.log("8) Clear all tasks");
    console.log("9) Exit");
    console.log("***************************");
}

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function handleUserInput(choice) {
    switch (choice) {
        case '1':
            rl.question("Enter task description: ", function (description) {
                rl.question("Enter due date(month-day): ", function (dueDate) {
                    rl.question("Enter priority (1-5): ", function (priority) {
                        todoList.addTask(description, dueDate, priority);
                        displayMenu();
                        rl.prompt();
                    });
                });
            });
            break;

        case '2':
            todoList.listAllTasks();
            displayMenu();
            rl.prompt();
            break;

        case '3':
            todoList.listCompletedTasks();
            displayMenu();
            rl.prompt();
            break;

        case '4':
            rl.question("Enter task description to mark as completed: ", function (description) {
                todoList.markTaskAsCompleted(description);
                displayMenu();
                rl.prompt();
            });
            break;

        case '5':
            rl.question("Enter task description to delete: ", function (description) {
                todoList.deleteTask(description);
                displayMenu();
                rl.prompt();
            });
            break;

        case '6':
            todoList.sortTasksByDueDate();
            displayMenu();
            rl.prompt();
            break;

        case '7':
            todoList.sortTasksByPriority();
            displayMenu();
            rl.prompt();
            break;

        case '8':
            todoList.clearAllTasks();
            displayMenu();
            rl.prompt();
            break;

        case '9':
            rl.close();
            break;

        default:
            console.log("Invalid choice. Please try again!");
            displayMenu();
            rl.prompt();
            break;
    }
}

displayMenu();
rl.prompt();

rl.on('line', function (choice) {
    handleUserInput(choice);
}).on('close', function () {
    console.log("Exiting the application.Wish you a good experience Goodbye!");
    process.exit(0);
});
