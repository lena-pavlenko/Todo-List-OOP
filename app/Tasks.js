import Task from "./Task.js";
import TaskStorage from "./TaskStorage.js";

class Tasks {
    static #storage = []

    static #getTasks() {
        Tasks.#storage = TaskStorage.initStorage()
    }

    static init(appContainer) {
        const form = appContainer.querySelector('form[name="add-task"]')
        const tasksContainer = appContainer.querySelector('.tasks-container')

        Tasks.#getTasks()
        Tasks.#renderTasks(tasksContainer)

        form.addEventListener('submit', function(e) {
            e.preventDefault()
            const title = form.elements['title'].value
            const description = form.elements['description'].value
            const newTask = Tasks.#createTask(title, description)
            
            Tasks.#storage.push(newTask)
            TaskStorage.addStorage(Tasks.#storage)
            tasksContainer.insertAdjacentHTML('beforeend', Tasks.#renderTemplate(newTask))

            form.reset()
        })

        tasksContainer.addEventListener('click', function(e) {
            if (e.target.closest('.uk-button')) {
                const btn = e.target.closest('.uk-button')
                const parent = btn.closest('.task')
                const dataId = parent.dataset.id

                if (btn.classList.contains('uk-button-danger')) {
                    Tasks.#removeTask(dataId)
                }
    
                if (btn.classList.contains('uk-button-primary')) {
                    Tasks.#completeTask(dataId)
                }

                TaskStorage.addStorage(Tasks.#storage)
                Tasks.#renderTasks(tasksContainer)
            }
        })
    }

    static #createTask(title, desc) {
        const task = new Task(title, desc)
        return task
    }

    static #removeTask(idTask) {
        Tasks.#getTaskById(idTask).delete()
    }

    static #completeTask(idTask) {
        Tasks.#getTaskById(idTask).complete()
    }

    static #renderTemplate(task) {
        const taskTemplate = `
            <div class="task uk-card uk-card-body uk-card-default uk-margin ${task.isCompleted ? 'completed' : ''}" data-id=${task.id}>
                <h3 class="uk-card-title">${task.title}</h3>
                <p>${task.description}</p>
                <div class="uk-flex uk-flex-wrap">
                    <button class="uk-button uk-button-danger">Удалить</button>
                    <button class="uk-button uk-button-primary">Завершить</button>
                </div>
            </div>
        `

        return taskTemplate
    }

    static #renderTasks(containerTasks) {
        if (!Tasks.#storage) return
        containerTasks.innerHTML = ''
        Tasks.#storage.forEach(task => {
            if (!task.isDeleted) {
                containerTasks.insertAdjacentHTML('beforeend', Tasks.#renderTemplate(task))
            }
        });
    }

    static #getTaskById(id) {
        const taskFinded = Tasks.#storage.find(task => task.id == id)

        return taskFinded
    }
}

export default Tasks