<template>
  <div class="todo-container">
    <h2>To-Do List</h2>

    <form @submit.prevent="addTask">
      <input v-model="newTask.title" placeholder="Judul tugas" required />
      <input v-model="newTask.description" placeholder="Deskripsi tugas" />
      <select v-model="newTask.status">
        <option value="todo">To Do</option>
        <option value="in progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <input type="date" v-model="newTask.due_date" />

      <button type="submit">Tambah</button>
    </form>

    <ul>
      <li v-for="task in tasks" :key="task._id">
        <h3>{{ task.title }}</h3>
        <p>{{ task.description }}</p>
        <p>Status: <strong>{{ task.status }}</strong></p>
        <p>Deadline: {{ formatDate(task.due_date) }}</p>

        <button @click="updateTaskStatus(task)">🔄 Ubah Status</button>
        <button @click="deleteTask(task._id)">🗑 Hapus</button>
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
          task.status === "todo" ? "in progress" : task.status === "in progress" ? "completed" : "todo";
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
  },
  mounted() {
    this.fetchTasks();
  },
};
</script>

<style>
.todo-container {
  text-align: center;
  padding: 20px;
  max-width: 500px;
  margin: auto;
}
button {
  margin: 5px;
  cursor: pointer;
}
</style>
