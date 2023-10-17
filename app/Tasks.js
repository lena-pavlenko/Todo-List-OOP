import Task from "./Task.js";

class Tasks {
    static #storage = []

    static #getTasks() {
        const tasks = JSON.parse(localStorage.getItem('todoList'))
        if (!tasks) return
        tasks.forEach(task => {
            const newTask = new Task(task.title, task.description, task.id)
            if (task.isDeleted) newTask.isDeleted = true
            if (task.isCompleted) newTask.isCompleted = true
            Tasks.#storage.push(newTask)
        })
    }

    static init(appContainer) {
        Tasks.#getTasks()

        const form = appContainer.querySelector('form[name="add-task"]')
        const tasksContainer = appContainer.querySelector('.tasks-container')

        Tasks.#renderTasks(tasksContainer)

        form.addEventListener('submit', function(e) {
            e.preventDefault()
            const title = form.elements['title'].value
            const description = form.elements['description'].value
            const newTask = Tasks.#createTask(title, description)
            
            Tasks.#storage.push(newTask)
            Tasks.#recordTasks()
            tasksContainer.insertAdjacentHTML('beforeend', Tasks.#renderTemplate(newTask))
        })

        tasksContainer.addEventListener('click', function(e) {
            if (e.target.closest('.uk-button-danger')) {  
                const btn = e.target.closest('.uk-button-danger')
                const parent = btn.closest('.task')
                const dataId = parent.dataset.id
                
                Tasks.#getTaskById(dataId).isDeleted = true
                Tasks.#recordTasks()

                Tasks.#renderTasks(tasksContainer)
            }
        })
    }

    static #createTask(title, desc) {
        const task = new Task(title, desc)
        return task
    }

    static #recordTasks() {
        localStorage.setItem('todoList', JSON.stringify(Tasks.#storage))
    }

    static #renderTemplate(task) {
        const taskTemplate = `
            <div class="task uk-card uk-card-body uk-card-default uk-margin" data-id=${task.id}>
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
        containerTasks.innerHTML = ''
        Tasks.#storage.forEach(task => {
            if (!task.isDeleted) {
                containerTasks.insertAdjacentHTML('beforeend', Tasks.#renderTemplate(task))
            }
        });
    }

    static #removeTask(idTask) {

    }

    static #getTaskById(id) {
        const taskFinded = Tasks.#storage.find(task => task.id == id)

        return taskFinded
    }

}

export default Tasks