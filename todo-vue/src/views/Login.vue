<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" required class="input-field" />
        <input v-model="password" type="password" placeholder="Password" required class="input-field" />
        <button type="submit" class="login-btn">Login</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
      <p class="register-link">Belum punya akun? <router-link to="/register">Register</router-link></p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
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

        localStorage.setItem("token", res.data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
        this.$router.push("/dashboard");
      } catch (err) {
        this.error = err.response?.data?.message || "Login failed";
      }
    },
  },
};
</script>

<style>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-box {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 350px;
}

h2 {
  margin-bottom: 20px;
  color: #333;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

.login-btn {
  width: 100%;
  padding: 10px;
  background: #2575fc;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
}

.login-btn:hover {
  background: #1a5bb8;
}

.error {
  color: red;
  margin-top: 10px;
}

.register-link {
  margin-top: 15px;
  font-size: 14px;
}

.register-link a {
  color: #2575fc;
  text-decoration: none;
  font-weight: bold;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
