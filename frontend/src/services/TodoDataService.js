import http from "../http-common.js";

class TodoDateService {
  getAll() {
    return http.get("/tasks/");
  }

  get(id) {
    return http.get(`/tasks/${id}`);
  }

  getAllByAuthor(id) {
    return http.get(`/tasks/author/${id}`);
  }

  create(data) {
    return http.post("/tasks", data);
  }

  update(id, data) {
    return http.patch(`/tasks/${id}`, data);
  }

  updateStatus(id, data) {
    return http.patch(`/tasks/status/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tasks/${id}`);
  }
}

export default new TodoDateService();
