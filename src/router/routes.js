const Home = () => import(/* webpackChunkName: "group-foo" */ 'views/home')
const User = () => import(/* webpackChunkName: "group-foo" */ 'views/user')
const Shop = () => import(/* webpackChunkName: "group-foo" */ 'views/shop')
const Type = () => import(/* webpackChunkName: "group-foo" */ 'views/type')

const Food = () => import(/* webpackChunkName: "group-foo" */ 'views/food')
const ShopAdd = () => import(/* webpackChunkName: "group-foo" */ 'views/shop_add')
const FoodAdd = () => import(/* webpackChunkName: "group-foo" */ 'views/food_add')
const Set = () => import(/* webpackChunkName: "group-foo" */ 'views/set')
const Explain = () => import(/* webpackChunkName: "group-foo" */ 'views/explain')
const Login = () => import(/* webpackChunkName: "group-foo" */ 'views/login')
const Register = () => import(/* webpackChunkName: "group-foo" */ 'views/register')
const Chart = () => import(/* webpackChunkName: "group-foo" */ 'views/chart')
const Edit = () => import(/* webpackChunkName: "group-foo" */ 'views/edit')
const Error = () => import(/* webpackChunkName: "group-foo" */ 'views/error')
// const ShopModify = () => import(/* webpackChunkName: "group-foo" */ 'views/shop_modify')
import ShopModify from 'views/shop_modify'


export default [
    {
        path:'/',
        redirect:'/type'
    },
    {
        path: '/type',
        component: Type
    },
    {
        path:'/home',
        component:Home
    },
    {
        path:'/user',
        component:User
    },
    {
        path:'/shop',
        component:Shop
    },
    {
        path: '/store',
        component: () => import('@/views/type/store')
      },
    {
      path: '/leaveBank',
      component: () => import('@/views/shop/leaveBank')
    },
    // {
    //     path:'/food',
    //     component:Food
    // },
    // {
    //     path:'/foodAdd',
    //     component:FoodAdd
    // },
    // {
    //     path:'/shopAdd',
    //     component:ShopAdd
    // },
    // {
    //     path:'/shop_modify',
    //     component:ShopModify,
    //     name:"shop_modify",
    //     meta: {
    //         name: 'ShopModify'
    //     } 
    // },
    // {
    //     path:'/set',
    //     component:Set
    // },
    // {
    //     path:'/explain',
    //     component:Explain
    // },
    // {
    //     path:'/login',
    //     component:Login
    // },
    // {
    //     path:'/register',
    //     component:Register
    // },
    // {
    //     path:'/chart',
    //     component:Chart
    // },
    // {
    //     path:'/edit',
    //     component:Edit
    // },
    {
        path:'*',
        component:Error
    }

]