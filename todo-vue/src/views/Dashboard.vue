<template>
  <div class="dashboard-container">
    <h2>📊 Dashboard</h2>
    <p>Selamat datang di Dashboard!</p>
    <button @click="logout" class="logout-btn">🚪 Logout</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    logout() {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      this.$router.push("/");
    },
  },
};
</script>

<style>
/* Container */
.dashboard-container {
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

/* Logout Button */
.logout-btn {
  background: #ff4d4d;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
  margin-top: 15px;
}

.logout-btn:hover {
  background: #e63939;
  transform: scale(1.05);
}
</style>
