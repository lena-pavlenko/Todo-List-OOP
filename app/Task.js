class Task {
    isCompleted = false
    isDeleted = false

    constructor(title, description, id = Date.now()) {
        this.title = title
        this.description = description
        this.id = id
    }
}

export default Task