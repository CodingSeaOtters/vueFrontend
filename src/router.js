import { createRouter, createWebHistory } from 'vue-router'
import LogIn from "@/Sites/LogIn.vue";
import Registration from "@/Sites/Registration.vue";
import BoardsView from "@/Sites/BoardsView.vue";
import showNotes from "@/Sites/ShowNotes.vue";

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
        path:"/boards",
        component: BoardsView
    },
    {
        path: "/notes",
        component: showNotes
    },
];

const router = createRouter({
    history:createWebHistory(),
    routes
});

export default router;