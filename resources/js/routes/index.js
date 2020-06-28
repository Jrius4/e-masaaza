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
import PersonsMain from '../components/dashboard/persons/PersonsMain.vue'
import Persons from '../components/dashboard/persons/Persons.vue'
import Person from '../components/dashboard/persons/Person.vue'
import EditorPersons from '../components/dashboard/persons/EditorPersons.vue'
import Logout from '../components/Logout.vue';
import Missing from '../views/errors/Missing.vue';

import Dashboard from '../components/dashboards/dashboard.vue';
import Clubs from '../components/dashboards/clubs/Clubs.vue';



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
    base:process.env.BASE_URL,
    mode:'history',
    linkActiveClass:'is-active',
    routes:[
        // {
        //     path:'/',component: LoginRegister,name:'login',
        //     meta:{
        //         requiresAuth:false,
        //     }
        // },
        {
            path:'/',component:MainLayout,name:'main',
            children:[
                {
                    path:'',component: LoginRegister,name:'login',
                    meta:{
                        requiresAuth:false,
                    }
                },

                {
                    path:'logout',
                    component:Logout,
                    name:'logout',
                    meta:{
                        requiresAuth:true,
                    }
                },
                { path:'portal',component: Dashboard,name:'portal',
                    meta:{
                        requiresAuth:true,
                    }
                },
                {
                    path:'clubs',component: Clubs,name:'clubs',
                    meta:{
                       requiresAuth:true,
                   }
               },
               {
                path:'requests',component: Requests,name:'requests',
                    meta:{
                        requiresAuth:true,
                    }
                },
                {
                    path:'players',component: Players,name:'players',
                    meta:{
                        requiresAuth:true,
                    }
                },
                {
                    path:'persons',component: PersonsMain,name:'persons-main',
                    children:[
                        {
                            path:'',component: Persons,name:'persons',
                        },
                        {
                            path:'create',component: EditorPersons,name:'persons-create',
                        },
                        {
                            path:':id/edit',component: EditorPersons,name:'persons-edit',
                            props:true
                        },
                        {
                            path:':id/view',component: Person,name:'persons-view',
                            props:true
                        },
                    ],
                    meta:{
                        requiresAuth:true,
                    }
                },
                {
                    path:'personels',component: Personels,name:'personels',
                    children:[
                        { path:'',component: PersonelProfile,name:'personel-profile'},
                        { path:':id/edit-personal-information',component: RegisterPersonel,name:'edit-personal-information',props:true},
                    ],
                    meta:{
                        requiresAuth:true,
                    }

                },
                
                {
                    path:'*',
                    component:Missing,
                    name:'missing',
                },
            ]
        },
    ]
});

export default router;
