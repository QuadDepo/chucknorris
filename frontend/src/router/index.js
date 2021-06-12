import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home";
import Favorites from "../views/Favourites";

const routes = [
  { path: "/", component: Home },
  { path: "/favourites", component: Favorites },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router;
