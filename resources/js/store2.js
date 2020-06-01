import Vue from 'vue';
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        token:localStorage.getItem('access_token') || null,
        user:null
    },
    getters:{
        loggedIn(state){
            return state.token !== null;
        }
    },
    mutations:{
        retrieveToken(state,token){
            state.token = token
        },
        getUser(state,user){
            state.user = user
        },
        destoryToken(state){
            state.token = null
            state.user = null
        }
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
        }
    }
})

export default store;
