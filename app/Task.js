class Task {

    constructor(title, description, id = Date.now(), isCompleted = false, isDeleted = false) {
        this.title = title
        this.description = description
        this.id = id
        this.isCompleted = isCompleted
        this.isDeleted = isDeleted
    }

    complete() {
        this.isCompleted = true
    }

    delete() {
        this.isDeleted = true
    }
}

export default Task