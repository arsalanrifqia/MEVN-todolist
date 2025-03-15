<template>
  <div id="app">
    <!-- Navbar hanya muncul jika user sudah login -->
    <nav v-if="isLoggedIn">
      <div class="logo"></div>
      <div class="nav-links">
        <router-link to="/dashboard">📊 Dashboard</router-link>
        <router-link to="/todo">✅ To-Do List</router-link>
      </div>
      <button @click="logout" class="logout-btn">Logout</button>
    </nav>

    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: !!localStorage.getItem("token"), // Cek apakah sudah login
    };
  },
  watch: {
    // Pantau perubahan di localStorage agar navbar berubah otomatis
    "$route"() {
      this.isLoggedIn = !!localStorage.getItem("token");
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.isLoggedIn = false;
      this.$router.push("/");
    },
  },
};
</script>

<style>
/* Navbar */
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 15px 15px;
}

.nav-links {
  display: flex;
  gap: 15px;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 8px 15px;
  border-radius: 5px;
  transition: background 0.3s, transform 0.2s;
}

nav a:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

/* Tombol Logout */
.logout-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s, transform 0.2s;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.4);
  transform: scale(1.05);
}

main {
  padding: 20px;
}
</style>
