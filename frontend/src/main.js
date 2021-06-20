import { createApp } from "vue";
import Notifications from "@kyvg/vue3-notification";
import router from "./router";
import store from "./core/store";
import App from "./App";

import "./assets/scss/main.scss";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(Notifications);
app.mount("#app");
