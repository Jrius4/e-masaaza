import Vue from 'vue';
import Vuex from 'vuex'
import Axios from 'axios'

import clubsModule from './clubs';

Vue.use(Vuex)

const store = new Vuex.Store({
    modules:{
        clubsModule:clubsModule
    },
    state:{
        token:localStorage.getItem('access_token') || null,
        user:null,
        barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
        barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
        drawer: null,
        

        //clubs
        teams:[],
        // end clubs

    },
    getters:{
        loggedIn(state){
            return state.token !== null;
        }
    },
    mutations:{
        SET_BAR_IMAGE (state, payload) {
            state.barImage = payload
        },
        SET_DRAWER (state, payload) {
            state.drawer = payload
        },
        retrieveToken(state,token){
            state.token = token
        },
        getUser(state,user){
            state.user = user
        },
        destoryToken(state){
            state.token = null
            state.user = null
        },

        // clubs

        getClubsMutation(currentState,clubs){
            currentState.teams = clubs
        }

        // end clubs

    },
    actions:{
        retrieveTokenAction(context,credentials){
            return new Promise((resolve,reject)=>{
                Axios.post('/api/login',{
                    email:credentials.email,
                    password:credentials.password,
                }).then(response=>{
                    const token = response.data.success.access_token
                    localStorage.setItem('access_token',token)
                    context.commit('retrieveToken',token)

                    resolve(response)
                }).catch(error=>
                    {
                        reject(error)
                    }
                )
            })
        },
        getUserAction(context){
            if(context.getters.loggedIn){
                return new Promise((resolve,reject)=>{
                    Axios.get('/api/user',{
                        headers:{Authorization: "Bearer "+context.state.token}
                    }).then(response=>{
                        const user = response.data;
                    context.commit('getUser',user)

                    resolve(response)
                }).catch(error=>
                    {
                        reject(error)
                    }
                )
                })
            }
        },
        destoryTokenAction(context){
            if(context.getters.loggedIn){
                return new Promise((resolve,reject)=>{
                    Axios.post('/api/logout','',{
                        headers:{Authorization:"Bearer "+context.state.token}
                    }).then(response=>{
                        // console.log(response)
                        localStorage.removeItem('access_token')
                        context.commit('destoryToken')
                        resolve(response)
                    }).catch(error=>{
                        localStorage.removeItem('access_token')
                        context.commit('destoryToken')
                        reject(error)
                    })
                })
            }
        },

        // clubs

        getClubsActions(context){

        }

        // end clubs
    }
})

export default store;
