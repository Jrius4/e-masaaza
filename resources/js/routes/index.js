import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Login from '../views/Login.vue';
import MainLayout from '../components/dashboard/layouts/MainLayout';
import Requests from '../components/dashboard/requests/Requests.vue'
import Players from '../components/dashboard/players/Players.vue'



const router = new VueRouter({
    base:'/',
    mode:'history',
    routes:[
        {
            path:'/',component: Login,name:'login'
        },
        { path:'/portal',component: MainLayout,name:'portal'},
        { path:'/requests',component: Requests,name:'requests'},
        { path:'/players',component: Players,name:'players'},
            
        
            

    ]
});

export default router;
