<template>
  <div class="todo-container">
    <h2>To-Do</h2>

    <form @submit.prevent="addTask" class="todo-form">
      <input v-model="newTask.title" placeholder="Title" required />
      <input v-model="newTask.description" placeholder="Description" />
      <select v-model="newTask.status">
        <option value="todo">📝 To Do</option>
        <option value="in progress">🚀 In Progress</option>
        <option value="completed">✅ Completed</option>
      </select>
      <input type="date" v-model="newTask.due_date" />

      <button type="submit" class="add-btn">➕ Create</button>
    </form>

    <ul class="task-list">
      <li v-for="task in tasks" :key="task._id" class="task-card">
        <div v-if="!task.editing" class="task-table">
          <table>
            <tr>
              <th>Title</th>
              <td>{{ task.title }}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{{ task.description || "no description" }}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td><strong>{{ formatStatus(task.status) }}</strong></td>
            </tr>
            <tr>
              <th>Deadline</th>
              <td>{{ formatDate(task.due_date) }}</td>
            </tr>


          </table>
          <td colspan="2" class="task-actions">
            <button @click="updateTaskStatus(task)" class="status-btn">🔄 Change Status</button>
            <button @click="editTask(task)" class="edit-btn">✏️ Edit</button>
            <button @click="deleteTask(task._id)" class="delete-btn">🗑 Delete</button>
          </td>
        </div>

        <div v-else>
          <form @submit.prevent="saveTask(task)" class="edit-form">
            <input v-model="task.title" placeholder="Title Task" required class="edit-input" />
            <input v-model="task.description" placeholder="Description Task" class="edit-input" />
            <select v-model="task.status" class="edit-select">
              <option value="todo">📝 To Do</option>
              <option value="in progress">🚀 In Progress</option>
              <option value="completed">✅ Completed</option>
            </select>
            <input type="date" v-model="task.due_date" class="edit-input" />

            <div class="edit-actions">
              <button type="submit" class="save-btn">💾 Save</button>
              <button @click="cancelEdit(task)" class="cancel-btn">❌ Cancel</button>
            </div>
          </form>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      newTask: {
        title: "",
        description: "",
        status: "todo",
        due_date: "",
      },
      tasks: [],
    };
  },
  methods: {
    async fetchTasks() {
      try {
        const res = await axios.get("/api/tasks", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        this.tasks = res.data.map(task => ({ ...task, editing: false }));
      } catch (err) {
        console.error("Gagal mengambil tugas:", err);
      }
    },
    async addTask() {
      try {
        const res = await axios.post("/api/tasks", this.newTask, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        this.tasks.push({ ...res.data, editing: false });
        this.newTask = { title: "", description: "", status: "todo", due_date: "" };
      } catch (err) {
        console.error("Gagal menambah tugas:", err);
      }
    },
    async updateTaskStatus(task) {
      const newStatus =
          task.status === "todo"
              ? "in progress"
              : task.status === "in progress"
                  ? "completed"
                  : "todo";
      try {
        await axios.put(`/api/tasks/${task._id}`, { status: newStatus }, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        task.status = newStatus;
      } catch (err) {
        console.error("Gagal mengubah status tugas:", err);
      }
    },
    async deleteTask(id) {
      try {
        await axios.delete(`/api/tasks/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        this.tasks = this.tasks.filter(task => task._id !== id);
      } catch (err) {
        console.error("Gagal menghapus tugas:", err);
      }
    },
    editTask(task) {
      task.editing = true;
    },
    async saveTask(task) {
      try {
        await axios.put(`/api/tasks/${task._id}`, {
          title: task.title,
          description: task.description,
          status: task.status,
          due_date: task.due_date,
        }, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        task.editing = false;
      } catch (err) {
        console.error("Gagal menyimpan perubahan:", err);
      }
    },
    cancelEdit(task) {
      task.editing = false;
    },
    formatDate(date) {
      return date ? new Date(date).toLocaleDateString() : "Tidak ada tanggal";
    },
    formatStatus(status) {
      return status === "todo"
          ? "📝 To Do"
          : status === "in progress"
              ? "🚀 In Progress"
              : "✅ Completed";
    },
  },
  mounted() {
    this.fetchTasks();
  },
};
</script>

<style>
.task-table {
  width: 100%;
  margin-bottom: 20px;
  border-collapse: collapse;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.task-table table {
  width: 100%;
  border-collapse: collapse;
}

.task-table th,
.task-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.task-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #333;
  width: 30%;
}

.task-table td {
  color: #555;
}

.task-table tr:hover {
  background-color: #f1f1f1;
}

/* Styling untuk tombol aksi */
.task-actions {
  text-align: center;
  padding: 15px;
  background-color: #f8f9fa;
}

.task-actions button {
  margin: 0 5px;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

.task-actions button:hover {
  transform: scale(1.05);
}

.status-btn {
  background: #17a2b8;
  color: white;
}

.status-btn:hover {
  background: #138496;
}

.edit-btn {
  background: #ffc107;
  color: white;
}

.edit-btn:hover {
  background: #e0a800;
}

.delete-btn {
  background: #ff4d4d;
  color: white;
}

.delete-btn:hover {
  background: #e63939;
}
/* Container */
.todo-container {
  text-align: center;
  padding: 20px;
  max-width: 600px;
  margin: auto;
  background: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  animation: fadeIn 0.5s ease-in-out;
}

/* Animasi */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Form */
.todo-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.todo-form input,
.todo-form select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
}

/* Tombol Tambah */
.add-btn {
  background: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

.add-btn:hover {
  background: #0056b3;
  transform: scale(1.05);
}

/* Daftar Tugas */
.task-list {
  list-style: none;
  padding: 0;
}

.task-card {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.task-card:hover {
  transform: scale(1.02);
}

.task-desc {
  color: #666;
  font-size: 14px;
}

/* Tombol */
.task-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.status-btn {
  background: #17a2b8;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

.status-btn:hover {
  background: #138496;
  transform: scale(1.05);
}

.edit-btn {
  background: #ffc107;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

.edit-btn:hover {
  background: #e0a800;
  transform: scale(1.05);
}

.delete-btn {
  background: #ff4d4d;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

.delete-btn:hover {
  background: #e63939;
  transform: scale(1.05);
}

/* Form Edit */
.edit-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.edit-input,
.edit-select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
}

.edit-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.save-btn {
  background: #28a745;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

.save-btn:hover {
  background: #218838;
  transform: scale(1.05);
}

.cancel-btn {
  background: #6c757d;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

.cancel-btn:hover {
  background: #5a6268;
  transform: scale(1.05);
}
</style>