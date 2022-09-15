import { createRouter,createWebHistory,RouteRecordRaw } from 'vue-router';
import Layout from '@/views/mast/index.vue'
import Login from '@/views/login/index.vue'
import Webgl from '@/views/webgl/index.vue'
import { getToken }  from '@/request/authority'
import { ElMessage } from "element-plus";
const routes:Array<RouteRecordRaw> = [
  {
    path:'/',
    component:Layout,
    redirect:'/webgl',
    children:[
      {
        path:'/dashboard',
        component: () => import('@/views/mast/dashboard/index.vue'),
        name:'dashboard',
        meta:{
          title:'首页',
          icon:'#icondashboard'
        }

      }
    ]
  },
  {
    path:'/login',
    component:Login,
    name:'login',
  },
  {
    path:'/webgl',
    component:Webgl,
    name:'webgl',
  },
  {
    path:'/system',
    component:Layout,
    name:'system',
    meta:{
      title:'系统管理',
      icon:'Menu',
      roles:['sys:manage'],
      parentId:0
    },
    children:[
     {
      path:'/department',
      component: () => import('@/views/system/Department/Department.vue'),
      name:'department',
      meta:{
        title:'机构管理',
        icon:'Menu',
        roles:['sys:dept']
      }
     },
      {
        path:'/userList',
        component: () => import('@/views/system/User/UserList.vue'),
        name:'userList',
        meta:{
          title:'用户管理',
          icon:'Menu',
          roles:['sys:user']
        }
      },
      {
        path:'/roleList',
        component: () => import('@/views/system/Role/RoleList.vue'),
        name:'roleList',
        meta:{
          title:'角色管理',
          icon:'Menu',
          roles:['sys:role']
        }
      },
      {
        path:'/menuList',
        component: () => import('@/views/system/Menu/MenuList.vue'),
        name:'menuList',
        meta:{
          title:'权限管理',
          icon:'Menu',
          roles:['sys:menu']
        }
      }
    ]
  },
  {
    path:'/goods',
    component:Layout,
    name:'goods',
    meta:{
      title:'商品管理',
      icon:'Menu',
      roles:['sys:goods']
    },
    children:[
      {
        path:'/goodCategory',
        component: () => import('@/views/goods/goodsCategory/GoodsCategory.vue'),
        name:'goodCategory',
        meta:{
          title:'商品分类',
          icon:'Menu',
          roles:['sys:goodsCategory']
        }

      }
    ]
  },
  {
    path:'/systemConfig',
    component:Layout,
    name:'systemConfig',
    meta:{
      title:'系统工具',
      icon:'Menu',
      roles:['sys:systemConfig']
    },
    children:[
      {
        path:'/document',
        component: () => import('@/views/system/config/SystemDocument.vue'),
        name:'http://localhost:8089/swagger-ui/index.html',
        meta:{
          title:'接口文档',
          icon:'Menu',
          roles:['sys:document']
        }

      }
    ]
  }
]

const router = createRouter({
  history:createWebHistory(),
  routes
})
/**
 * 全局前置路由守卫，每一次路由跳转前都进入这个 beforeEach 函数
 */
 router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
      // 登录或者注册才可以往下进行
      next();
  } else {
      // 获取 token
      // const token = localStorage.getItem('Authorization'); 
      // // token 不存在
      // if (getToken() === null || getToken() === '') {
      //     ElMessage.error('您还没有登录，请先登录');
      //     next('/login');
      // } else {
      //     next();
      // }

      next();
  }
});
export default router