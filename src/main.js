import { createApp } from "vue";
import { store } from "./store";
import "./assets/scss/main.scss";
import api from "./api";
import App from "./App.vue";

const app = createApp(App);

app.use(store);
app.provide("api", api);
app.mount("#app");
