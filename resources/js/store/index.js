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
        // end clubs,

        //files
        set1Files:[],        
        set1Rules:[],
        set1FileType:[],
        set1RuleStatus:[],
        set2Files:[],        
        set2RuleStatus:[],
        set2FileType:[],
        set2Rules:[],
        set3Files:[],        
        set3RuleStatus:[],
        set3FileType:[],
        set3RuleStatus:[],
        set4Files:[],        
        set4Rules:[],
        set4FileType:[],
        set4RuleStatus:[],
        //endfiles

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
        },

        // end clubs
        // files
        UPLOADED_FILE(currentState,payload){
            let set_number = payload.set_number;
            if(set_number !==null){
                if(set_number === 1){
                    currentState.set1Files = payload.files;
                    currentState.set1Rules = payload.rules;
                    currentState.set1RuleStatus = payload.rulesStatus;
                    
                }
                else if(set_number === 2){
                    currentState.set2Files = payload.files;
                    currentState.set2Rules = payload.rules;
                    currentState.set2RuleStatus = payload.rulesStatus;
                    
                }
                else if(set_number === 3){
                    console.log({payload})
                    currentState.set3Files = payload.files;
                    currentState.set3Rules = payload.rules;
                    currentState.set3RuleStatus = payload.rulesStatus;
                    
                }
                else if(set_number === 4){
                    currentState.set4Files = payload.files;
                    currentState.set4Rules = payload.rules;
                    currentState.set4RuleStatus = payload.rulesStatus;
                    
                }
            }
            else{
            }
            console.log(payload)
        },
        DELETE_UPLOADED_FILE(currentState,payload){
            let set_number = payload.set_number;
            if(set_number !==null){
                if(set_number === 1){
                    currentState.set1Files.splice(payload.key,1);
                    currentState.set1Rules.splice(payload.key,1);
                    currentState.set1RuleStatus = payload.rulesStatus;
                    
                }
                else if(set_number === 2){
                    currentState.set2Files.splice(payload.key,1);
                    currentState.set2Rules.splice(payload.key,1);
                    currentState.set2RuleStatus.splice(payload.key,1);
                    
                }
                else if(set_number === 3){
                    currentState.set3Files.splice(payload.key,1);
                    currentState.set3Rules.splice(payload.key,1);
                    currentState.set3RuleStatus.splice(payload.key,1);
                    
                }
                else if(set_number === 4){
                    currentState.set4Files.splice(payload.key,1);
                    currentState.set4Rules.splice(payload.key,1);
                    currentState.set4RuleStatus.splice(payload.key,1);
                   
                }
            }
            else{
                
            }
            console.log(payload)
        },
        // files end

    },
    actions:{
        retrieveTokenAction(context,credentials){
            return new Promise((resolve,reject)=>{
                Axios.post('/api/login',{
                    username:credentials.username,
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
        //files actions
        async UPLOADED_FILE_ACTION(context,payload){
            context.commit('UPLOADED_FILE',payload)
            
        },
        async DELETE_UPLOADED_FILE_ACTION(context,payload) {
            context.commit('DELETE_UPLOADED_FILE',payload)
        },
        //files actionsend
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
