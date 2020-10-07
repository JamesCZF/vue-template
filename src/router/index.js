import { createRouter, createWebHashHistory } from 'vue-router';

const Index = () => import('@/views/Index')
const Home = () => import('@/views/Home')
const About = () => import('@/views/About')
const MyBlog = () => import('@/views/blog/MyBlog')

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        {
          path: '/home',
          component: Home,
        },
        {
          path: '/blog',
          component: MyBlog,
        },
        {
          path: '/about',
          component: About,
        }
      ]
    }
  ]
});

export default router;