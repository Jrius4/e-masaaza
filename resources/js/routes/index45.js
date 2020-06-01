import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from "../views/Login.vue";
import AppLayout from '../components/dashboard/layouts/AppLayout.vue';
import Roles from '../components/dashboard/roles/Roles.vue';
import HomeView from '../components/dashboard/boxes/HomeView.vue';
// import CreateRole from '../components/dashboard/roles/CreateRole.vue';
// import EditRole from '../components/dashboard/roles/EditRole.vue';
// import Role from '../components/dashboard/roles/Role.vue';

// import Persons from '../components/dashboard/persons/Persons.vue';
// import CreatePerson from '../components/dashboard/persons/CreatePerson.vue';
// import EditPerson from '../components/dashboard/persons/EditPerson.vue';
// import Person from '../components/dashboard/persons/Person.vue';

// import Teams from '../components/dashboard/teams/Teams.vue';
// import CreateTeam from '../components/dashboard/teams/CreateTeam.vue';
// import EditTeam from '../components/dashboard/teams/EditTeam.vue';
// import Team from '../components/dashboard/teams/Team.vue';

// import Players from '../components/dashboard/players/Players.vue';
// import CreatePlayer from '../components/dashboard/players/CreatePlayer.vue';
// import EditPlayer from '../components/dashboard/players/EditPlayer.vue';
// import Player from '../components/dashboard/players/Player.vue';

// import Requests from '../components/dashboard/requests/Requests.vue';
// import CreateRequest from '../components/dashboard/requests/CreateRequest.vue';
// import EditRequest from '../components/dashboard/requests/EditRequest.vue';
// import Request from '../components/dashboard/requests/Request.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    // base: '/',
    mode: 'history',
    routes: [
        { path: '/', component: Login,name:'login' },
        {
            path: '/portal',
            component: AppLayout,
            name:'portal',
        children:[
            {
                path:'',
                component:HomeView,
            },
            {
                path:'/roles',
                component:Roles,
                name:'roles',
                children:[
                    // {
                    //     path:'/create',
                    //     component:CreateRole,
                    //     name:'create-role',
                    // },
                    // {
                    //     path:'/:id/edit',
                    //     component:EditRole,
                    //     name:'edit-roles',
                    // },
                    // {
                    //     path:'/:id',
                    //     component:Role,
                    //     name:'role',
                    // },
                ]
            },

            /*
                {
                    path:'/persons',
                    component:Persons,
                    name:'persons',
                    children:[
                        {
                            path:'/create',
                            component:CreatePerson,
                            name:'create-person',
                        },
                        {
                            path:'/:id/edit',
                            component:EditPerson,
                            name:'edit-person',
                        },
                        {
                            path:'/:id',
                            component:Person,
                            name:'person',
                        },
                    ]
                },

                {
                    path:'/teams',
                    component:Teams,
                    name:'teams',
                    children:[
                        {
                            path:'/create',
                            component:CreateTeam,
                            name:'create-team',
                        },
                        {
                            path:'/:id/edit',
                            component:EditTeam,
                            name:'edit-team',
                        },
                        {
                            path:'/:id',
                            component:Team,
                            name:'team',
                        },
                    ]
                },

                {
                    path:'/players',
                    component:Players,
                    name:'players',
                    children:[
                        {
                            path:'/create',
                            component:CreatePlayer,
                            name:'create-player',
                        },
                        {
                            path:'/:id/edit',
                            component:EditPlayer,
                            name:'edit-player',
                        },
                        {
                            path:'/:id',
                            component:Player,
                            name:'player',
                        },
                    ]
                },

                {
                    path:'/requests',
                    component:Requests,
                    name:'requests',
                    children:[
                        {
                            path:'/create',
                            component:CreateRequest,
                            name:'create-team',
                        },
                        {
                            path:'/:id/edit',
                            component:EditRequest,
                            name:'edit-team',
                        },
                        {
                            path:'/:id',
                            component:Request,
                            name:'request',
                        },
                    ]
                },

            */


        ]
    }
    ]
});

export default router;
