import Task from "./Task.js"

class TaskStorage {

    static addStorage(tasks) {
        localStorage.setItem('todoList', JSON.stringify(tasks))
    }

    static initStorage() {
        const tasks = JSON.parse(localStorage.getItem('todoList'))
        const tasksObj = []
        if (!tasks) return tasksObj
        tasks.forEach(task => {
            const newTask = new Task(task.title, task.description, task.id, task.isCompleted, task.isDeleted)
            tasksObj.push(newTask)
        })
        return tasksObj
    }
}

export default TaskStorage