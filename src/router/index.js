import { createWebHistory, createRouter } from "vue-router";
import ContactBook from '@/views/ContactBook.vue';

const routes = [
    {
        path: "/",
        name: "contactbook",
        component: ContactBook
    },
    {
        path: "/contact",
        name: "contact.add",
        component: () => import('@/views/ContactAdd.vue')
    },
    {
        path: "/contact/:id",
        name: "contact.edit",
        component: () => import('@/views/ContactEdit.vue'),
        props: true
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notfound',
        component: () => import('@/views/NotFound.vue')
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;