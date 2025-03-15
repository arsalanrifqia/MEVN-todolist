<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="text" placeholder="Emal" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
    <p>Belum punya akun? <router-link to="/register">Register</router-link></p>

  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async login() {
      try {
        const res = await axios.post("/login", {
          email: this.email,
          password: this.password,
        });


        localStorage.setItem("token", res.data.token); // Simpan token
        axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`; // Set header global
        this.$router.push("/dashboard"); // Redirect ke dashboard
      } catch (err) {
        this.error = err.response?.data?.message || "Login failed";
      }
    },
  },
};
</script>
