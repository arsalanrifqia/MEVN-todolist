<template>
  <div>
    <h2>Dashboard</h2>
    <p>Selamat datang di dashboard!</p>
    <button @click="logout">Logout</button>
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
