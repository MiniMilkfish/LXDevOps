import { createRouter, createWebHashHistory } from "vue-router"

const router = createRouter({
	// hash模式：createWebHashHistory，history模式：createWebHistory
	history: createWebHashHistory(),
	routes: [
		{ path: "/:pathMatch(.*)*", name: "master", component: () => import('../components/vContentContainer.vue') }
	]
});

export default router;
