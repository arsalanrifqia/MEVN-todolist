import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";

const routes = [
    { path: "/", component: Login, meta: { requiresGuest: true } },
    { path: "/register", component: Register, meta: { requiresGuest: true } },
    { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Middleware untuk proteksi route
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token"); // Cek token di localStorage

    if (to.meta.requiresAuth && !token) {
        next("/"); // Jika belum login, redirect ke login
    } else if (to.meta.requiresGuest && token) {
        next("/dashboard"); // Jika sudah login, redirect ke dashboard
    } else {
        next(); // Lanjutkan navigasi
    }
});


export default router;
