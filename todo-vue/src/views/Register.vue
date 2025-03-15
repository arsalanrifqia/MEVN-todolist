<template>
  <div class="register-container">
    <div class="register-card">
      <h2>🔐 Daftar Akun</h2>
      <form @submit.prevent="register">
        <div class="input-group">
          <label>Nama</label>
          <input v-model="name" type="text" placeholder="Masukkan nama" required class="input-field" />
        </div>
        <div class="input-group">
          <label>Email</label>
          <input v-model="email" type="email" placeholder="Masukkan email" required class="input-field" />
        </div>
        <div class="input-group">
          <label>Password</label>
          <input v-model="password" type="password" placeholder="Masukkan password" required class="input-field" />
        </div>
        <button type="submit" class="register-btn">✨ Daftar</button>
        <p v-if="error" class="error-message">{{ error }}</p>
        <p v-if="success" class="success-message">{{ success }}</p>
      </form>
      <p class="login-link">Sudah punya akun? <router-link to="/">Masuk</router-link></p>
    </div>
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

        this.success = "✅ Pendaftaran berhasil! Silakan masuk.";
        this.error = null;
      } catch (err) {
        this.error = "❌ " + (err.response?.data?.message || "Pendaftaran gagal.");
        this.success = null;
      }
    },
  },
};
</script>

<style>
/* Container utama */
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f3f4f6, #e0e7ff);
}

/* Card untuk form */
.register-card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 350px;
  transition: transform 0.2s;
}

.register-card:hover {
  transform: scale(1.02);
}

/* Heading */
h2 {
  margin-bottom: 15px;
  color: #333;
  font-size: 22px;
  font-weight: bold;
}

/* Grup input agar lebih rapi */
.input-group {
  text-align: left;
  margin-bottom: 15px;
}

.input-group label {
  font-size: 14px;
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
  color: #555;
}

/* Input field */
.input-field {
  width: 92%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: 0.3s;
  background: #f9f9f9;
}

.input-field:focus {
  border-color: #6366f1;
  background: white;
  box-shadow: 0 0 5px rgba(99, 102, 241, 0.5);
}

/* Tombol register */
.register-btn {
  background: #6366f1;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  transition: 0.3s;
}

.register-btn:hover {
  background: #4f46e5;
}

/* Pesan error dan sukses */
.error-message {
  color: #d32f2f;
  margin-top: 10px;
  font-weight: bold;
}

.success-message {
  color: #388e3c;
  margin-top: 10px;
  font-weight: bold;
}

/* Link login */
.login-link {
  margin-top: 15px;
  font-size: 14px;
  color: #555;
}
</style>
