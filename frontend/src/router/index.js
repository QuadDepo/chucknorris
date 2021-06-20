import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home";
import Favorites from "../views/Favourites";

const routes = [
  { name: "Home", path: "/", component: Home },
  { name: "Favourites", path: "/favourites", component: Favorites },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router;
