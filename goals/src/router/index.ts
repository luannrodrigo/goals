import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignInView from '../views/SignInView.vue'
import SignUpView from '../views/SignUpView.vue'
import RegisterGoalView from '../views/RegisterGoalView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignInView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView,
    },
    {
      path: '/register-goal',
      name: 'register-goal',
      component: RegisterGoalView,
    },
    {
      path: '/goal-counter/:id',
      name: 'goal-counter',
      component: () => import('@/views/GoalCounterView.vue'),
    },
  ],
})

export default router
