import { createRouter, createWebHistory } from 'vue-router'
import LogIn from "@/components/LogIn.vue";
import Registration from "@/components/Registration.vue";

const routes = [
    {
        path:'/',
        component: LogIn,
    },
    {
        path: '/registration',
        component: Registration,
    }
];

const router = createRouter({
    history:createWebHistory(),
    routes
});

export default router;