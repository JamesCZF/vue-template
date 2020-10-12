import { createRouter, createWebHashHistory } from 'vue-router';

const Index = () => import('@/views/Index');
const Home = () => import('@/views/Home');
const Login = () => import('@/views/Login');

const MyBlog = () => import('@/views/blog/MyBlog');
const HandleBlog = () => import('@/views/blog/HandleBlog');
const BlogDetail = () => import('@/views/blog/BlogDetail');

const ManageCenter = () => import('@/views/manage-center/Index');
const Profile = () => import('@/views/manage-center/Profile');
const BlogManage = () => import('@/views/manage-center/BlogManage');

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
          path: '/login',
          component: Login,
        },
        {
          path: '/blog',
          component: MyBlog,
        },
        {
          path: '/handleblog',
          component: HandleBlog
        },
        {
          path: '/blog/detail',
          component: BlogDetail,
        },
        {
          path: '/manage-center',
          component: ManageCenter,
          children: [
            {
              path: '/profile',
              component: Profile,
            },
            {
              path: '/blog-manage',
              component: BlogManage,
            },
          ]
        }
      ]
    }
  ]
});

export default router;