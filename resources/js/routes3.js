import Login from './components/Login.vue';
import Logout from './components/Logout.vue';
import Home from './components/Home.vue';
import Dashboard from './components/Dashboard.vue';
import AdminLayout from './views/Layout/AdminLayout.vue';
import GuestLayout from './views/Layout/GuestLayout.vue';
import ViewRequests from "./components/secretary/ViewRequests";
import VueRouter from 'vue-router';
import Vue from 'vue';
Vue.use(VueRouter)

const router = new VueRouter( {
    mode:'history',
    linkActiveClass:'is-active',
    routes:[
        {
            path:'/',
            component:GuestLayout,
            name:'index',
            children:[
                {
                    path:'',
                    component:Home,
                    name:'home',
                },
                {
                    path:'/login',
                    component:Login,
                    name:'login',
                },
            ]
        },

        {
            path:'/dashboard',
            component:AdminLayout,
            name:'portal',
            children:[
                {
                    path:'',
                    component:Dashboard,
                    name:'dashboard',
                    meta:{
                        requiresAuth:true,
                    }
                },
                {path:'requests',component:ViewRequests},
                {
                    path:'/logout',
                    component:Logout,
                    name:'logout',
                    meta:{
                        requiresAuth:true,
                    }
                },
            ]
        },
    ]
})

export default router;
