import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

const token = localStorage.getItem("token");
if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

const app = createApp(App);
app.use(router);
app.mount("#app");
