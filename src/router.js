import { createRouter, createWebHistory } from 'vue-router'
import LogIn from "@/components/LogIn.vue";
import Registration from "@/components/Registration.vue";
import BoardsView from "@/components/BoardsView.vue";

const routes = [
    {
        path:'/',
        component: LogIn,
    },
    {
        path: '/registration',
        component: Registration,
    },
    {
        path:"/boards/:id",
        component: BoardsView
    }
];

const router = createRouter({
    history:createWebHistory(),
    routes
});

export default router;