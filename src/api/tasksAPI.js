const URL = "http://localhost:3002/tasks"

const headers = {
  "Content-Type": "application/json",
}

const tasksApi = {
  getAll: () => fetch(URL).then((res) => res.json()),
  getById: (id) => fetch(`${ URL }/${ id }`).then((res) => res.json()),
  add: (task) => {
    return fetch(URL, {
      method: "POST",
      headers,
      body: JSON.stringify(task),
    }).then((res) => res.json())
  },
  deleteAll: (tasks) => Promise.all(tasks.map(({ id }) => tasksApi.delete(id))),
  delete: (id) => fetch(`${ URL }/${ id }`, { method: "DELETE" }),
  toggleComplete: (id, isDone) =>
    fetch(`${ URL }/${ id }`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ isDone })
    }),
}

export default tasksApi