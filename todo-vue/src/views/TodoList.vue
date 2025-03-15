<template>
  <div class="todo-container">
    <h2>✅ To-Do List</h2>

    <form @submit.prevent="addTask" class="todo-form">
      <input v-model="newTask.title" placeholder="Judul tugas" required />
      <input v-model="newTask.description" placeholder="Deskripsi tugas" />
      <select v-model="newTask.status">
        <option value="todo">📝 To Do</option>
        <option value="in progress">🚀 In Progress</option>
        <option value="completed">✅ Completed</option>
      </select>
      <input type="date" v-model="newTask.due_date" />

      <button type="submit" class="add-btn">➕ Tambah</button>
    </form>

    <ul class="task-list">
      <li v-for="task in tasks" :key="task._id" class="task-card">
        <h3>{{ task.title }}</h3>
        <p class="task-desc">{{ task.description || "Tidak ada deskripsi" }}</p>
        <p>Status: <strong>{{ formatStatus(task.status) }}</strong></p>
        <p>Deadline: {{ formatDate(task.due_date) }}</p>

        <div class="task-actions">
          <button @click="updateTaskStatus(task)" class="status-btn">🔄 Ubah Status</button>
          <button @click="deleteTask(task._id)" class="delete-btn">🗑 Hapus</button>
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
        this.tasks = res.data;
      } catch (err) {
        console.error("Gagal mengambil tugas:", err);
      }
    },
    async addTask() {
      try {
        const res = await axios.post("/api/tasks", this.newTask, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        this.tasks.push(res.data);
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
</style>
