import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import LoginRegister from '../views/LoginRegister.vue';
import MainLayout from '../components/dashboard/layouts/MainLayout';
import Requests from '../components/dashboard/requests/Requests.vue'
import Players from '../components/dashboard/players/Players.vue'
import RegisterPersonel from '../components/dashboard/personels/RegisterPersonel.vue'
import PersonelProfile from '../components/dashboard/personels/PersonelProfile.vue'
import Personels from '../components/dashboard/personels/Personels.vue'

// import goTo from 'vuetify/es5/services/goto';



const router = new VueRouter({
    // scrollBehavior:(to,from,savedPosition)=>{
    //     let scrollTo = 0;
    //     if(to.hash){
    //         scrollTo=to.hash
    //     }else if(savedPosition){
    //         scrollTo = savedPosition.y
    //     }
    //     return goto(scrollTo);
    // },
    base:'/',
    mode:'history',
    routes:[
        {
            path:'/',component: LoginRegister,name:'login'
        },
        { path:'/portal',component: MainLayout,name:'portal'},
        { path:'/requests',component: Requests,name:'requests'},
        { path:'/players',component: Players,name:'players'},
        { path:'/personels',component: Personels,name:'personels',
        children:[
            { path:'',component: PersonelProfile,name:'personel-profile'},
            { path:'/edit-personal-information',component: RegisterPersonel,name:'edit-personal-information'},
        ]},




    ]
});

export default router;
