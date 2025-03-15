<template>
  <div class="register-container">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <input v-model="name" type="text" placeholder="Name" required />
      <input v-model="email" type="text" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
    </form>
    <p>Sudah punya akun? <router-link to="/">Login</router-link></p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      error: null,
      success: null,
    };
  },
  methods: {
    async register() {
      try {
        const res = await axios.post("/register", {
          name: this.name,
          email: this.email,
          password: this.password,
        });

        this.success = res.data.message;
        this.error = null;
      } catch (err) {
        this.error = err.response?.data?.message || "Registration failed";
        this.success = null;
      }
    },
  },
};
</script>

<style>
.register-container {
  text-align: center;
  padding: 20px;
}
.error {
  color: red;
}
.success {
  color: green;
}
</style>
