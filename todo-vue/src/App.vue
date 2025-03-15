<template>
  <div id="app">
    <nav>
      <router-link v-if="!isLoggedIn" to="/">Login</router-link>
      <router-link v-if="!isLoggedIn" to="/register">Register</router-link>
      <router-link v-if="isLoggedIn" to="/dashboard">Dashboard</router-link>
      <router-link to="/todo">📝 To-Do List</router-link>
      <button v-if="isLoggedIn" @click="logout">Logout</button>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem("token"); // Cek apakah token ada
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("token"); // Hapus token
      this.$router.push("/"); // Redirect ke login
    },
  },
};
</script>

<style>
nav {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
}
</style>
