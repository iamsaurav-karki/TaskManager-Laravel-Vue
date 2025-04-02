import { createRouter, createWebHistory } from 'vue-router';
import TodoList from '../views/TodoList.vue';
import TodoForm from '../views/TodoForm.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: TodoList
  },
  {
    path: '/create',
    name: 'create',
    component: TodoForm
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: TodoForm,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

export default router;
