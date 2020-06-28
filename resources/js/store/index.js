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
        hasRole:false,
        selectedPerson:null,

        //clubs
        clubs:[],
        clubPagination:{
            page:1,
            rowsPerPage:10
        },
        totalClubs:0,
        clubSortRowsBy:'id',
        // end clubs,

        //players
        players:[],
        playerPagination:{
            page:1,
            rowsPerPage:10
        },
        playerSortRowsBy:'id',
        totalPlayers:0,
        // end players,

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

        //persons
        persons:[],
        personPagination:{
            page:1,
            rowsPerPage:10
        },
        personSortRowsBy:'id',
        totalPersons:0,
        // end persons,

    },
    getters:{
        loggedIn(state){
            return state.token !== null;
        },
        user(currentState){
            return currentState.user || null;
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
        GET_CLUBS(currentState,payload){
            currentState.clubs = payload.data;
            currentState.clubPagination.page = parseInt(payload.current_page);
            currentState.clubPagination.rowsPerPage =parseInt(payload.per_page);
            currentState.totalClubs = parseInt(payload.total);
        },

        GET_PLAYERS(currentState,payload){
            currentState.players = payload.data;
            currentState.playerPagination.page = parseInt(payload.current_page);
            currentState.playerPagination.rowsPerPage =parseInt(payload.per_page);
            currentState.totalPlayers = parseInt(payload.total);
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

        },
        SET_FILES(currentState){
            currentState.set1Files = [];
            currentState.set2Files = [];
            currentState.set3Files = [];
            currentState.set4Files = [];
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

        },
        // files end

        //persons
        SET_PERSON(currentState){
            currentState.selectedPerson = {
                name:'',
                username:'',
                avatar:'',
                national_id:'',
                certificates:'',
                positions:'',
                biography:'',
                join_date:'',
                biography:'',
                email:'',
                club_id:'',
            };
        },
        GET_PERSONS(currentState,payload){
            currentState.persons = payload.data;
            currentState.personPagination.page = parseInt(payload.current_page);
            currentState.personPagination.rowsPerPage =parseInt(payload.per_page);
            currentState.totalPersons = parseInt(payload.total);
        },

        GET_EDITOR_PERSONS(currentState,payload){
            currentState.selectedPerson = payload;
            // context.commit('GET_EDITOR_PERSONS');
        },
        RETURN_TO_PERSONS_TABLE(currentState){
            currentState.selectedPerson = null;
        },
        GET_PERSON(currentState,payload)
        {
            currentState.selectedPerson = payload;
        }
        //end persons

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

                    resolve(response);

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
        //clubs

        async GET_CLUBS_ACTION(context,sortBy){
            if(context.getters.loggedIn){
               if(sortBy.val !== null) return new Promise((resolve,reject)=>{

                let page_number = sortBy.page || context.state.clubPagination.page;
                let rowsPerPage = sortBy.rowsPerPage || context.state.clubPagination.rowsPerPage;
                let sortRowsBy =  sortBy.sortRowsBy || context.state.clubSortRowsBy;
                let sortDesc = sortBy.sortDesc|| false;

                    Axios.get(`/api/clubs?page=${page_number}&rowsPerPage=${rowsPerPage}`,{
                        headers:{
                            Authorization: "Bearer "+context.state.token
                        },
                        params:{
                            query:sortBy.val,
                            sortRowsBy:sortRowsBy,
                            sortDesc:sortDesc
                        }
                    }).then(response=>{
                        let clubs = response.data.clubs;
                        context.commit('GET_CLUBS',clubs);
                        resolve(clubs)
                    }).catch(err=>{
                        console.log(err);
                        reject(err)
                    })
                });
            }
        },
        async ADD_CLUB_ACTION(context,payload){

            let formData = new FormData();
            formData.append('logo', payload.logo);
            formData.append('name', payload.name);

            return new Promise((resolve,reject)=>{
                Axios.post(`/api/clubs`,formData,
                {
                    headers:{
                        'Content-Type': "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2),
                        Authorization: "Bearer "+context.state.token
                    }
                }
                ).then(response =>{
                    let success = response.data
                    context.commit('SET_FILES')
                    resolve(success)
                })
                .catch(err=>{
                    console.log(err)
                    reject(err)
                })
            });
        },
        async UPDATE_CLUB_ACTION(context,payload){
            let club_id = payload.id

            let formData = new FormData();
            formData.append('logo', payload.logo);
            formData.append('name', payload.name);

            return new Promise((resolve,reject)=>{
                Axios.post(`/api/clubs/${club_id}`,formData,
                {
                    headers:{
                        'Content-Type': "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2),
                        Authorization: "Bearer "+context.state.token,
                    }
                }
                ).then(response =>{
                    let success = response.data.success
                    context.commit('SET_FILES')
                    resolve(success)
                })
                .catch(err=>{
                    console.log(err)
                    reject(err)
                })
            });
        },
        async DELETE_CLUB_ACTION(context,payload){
            let club_id = payload.id;

            return new Promise((resolve,reject)=>{
                Axios.delete(`/api/clubs/${club_id}`,
                {
                    headers:{
                        Authorization: "Bearer "+context.state.token
                    }
                }
                ).then(response =>{
                    let success = response.data
                    resolve(success)
                })
                .catch(err=>{
                    console.log(err)
                    reject(err)
                })
            });
        },
        //clubsend
        //players
        async GET_PLAYERS_ACTION(context,sortBy){

            if(context.getters.loggedIn){
               if(sortBy.val !== null) return new Promise((resolve,reject)=>{

                let page_number = sortBy.page || context.state.playerPagination.page;
                let rowsPerPage = sortBy.rowsPerPage || context.state.playerPagination.rowsPerPage;
                let sortRowsBy =  sortBy.sortRowsBy || context.state.playerSortRowsBy;
                let sortDesc = sortBy.sortDesc|| false;

                    Axios.get(`/api/players?page=${page_number}&rowsPerPage=${rowsPerPage}`,{
                        headers:{
                            Authorization: "Bearer "+context.state.token
                        },
                        params:{
                            query:sortBy.val,
                            sortRowsBy:sortRowsBy,
                            sortDesc:sortDesc
                        }
                    }).then(response=>{
                        let players = response.data.players;

                        context.commit('GET_PLAYERS',players);
                        resolve(players)
                    }).catch(err=>{
                        console.log(err);
                        reject(err)
                    })
                });
            }
        },


        async ADD_PLAYER_ACTION(context,payload){

            let formData = new FormData();
            formData.append('avatar', payload.avatar);
            formData.append('first_name', payload.first_name);
            formData.append('last_name', payload.last_name);
            formData.append('national_id', payload.national_id);
            formData.append('certificates', payload.certificates);
            formData.append('status', payload.status);
            formData.append('positions', payload.positions);
            formData.append('former_club', payload.former_club);
            formData.append('years_played', payload.years_played);
            formData.append('biography', payload.biography);
            formData.append('club_id', payload.club_id);
            formData.append('phone', payload.phone);
            formData.append('date_of_birth', payload.date_of_birth);

            return new Promise((resolve,reject)=>{
                Axios.post(`/api/players`,formData,
                {
                    headers:{
                        'Content-Type': "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2),
                        Authorization: "Bearer "+context.state.token
                    }
                }
                ).then(response =>{
                    let success = response.data
                    context.commit('SET_FILES')
                    resolve(success)
                })
                .catch(err=>{
                    console.log(err)
                    reject(err)
                })
            });
        },

        async UPDATE_PLAYER_ACTION(context,payload){
            let player_id = payload.id;

            let formData = new FormData();
            formData.append('avatar', payload.avatar);
            formData.append('first_name', payload.first_name);
            formData.append('last_name', payload.last_name);
            formData.append('personal_number', payload.personal_number);
            formData.append('national_id', payload.national_id);
            formData.append('certificates', payload.certificates);
            formData.append('status', payload.status);
            formData.append('positions', payload.positions);
            formData.append('former_club', payload.former_club);
            formData.append('years_played', payload.years_played);
            formData.append('biography', payload.biography);
            formData.append('club_id', payload.club_id);
            formData.append('phone', payload.phone);
            formData.append('date_of_birth', payload.date_of_birth);

            return new Promise((resolve,reject)=>{
                Axios.post(`/api/players/${player_id}`,formData,
                {
                    headers:{
                        'Content-Type': "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2),
                        Authorization: "Bearer "+context.state.token,
                    }
                }).then(response =>{
                    let success = response.data;
                    context.commit('SET_FILES');
                    resolve(success)
                })
                .catch(err=>{
                    console.log(err)
                    reject(err)
                });
            });
        },
        async DELETE_PLAYER_ACTION(context,payload){
            let player_id = payload.id;

            return new Promise((resolve,reject)=>{
                Axios.delete(`/api/players/${player_id}`,
                {
                    headers:{
                        Authorization: "Bearer "+context.state.token
                    }
                }
                ).then(response =>{
                    let success = response.data
                    resolve(success)
                })
                .catch(err=>{
                    console.log(err)
                    reject(err)
                })
            });
        },
        //player new
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

        },

        // end clubs
        //persons

        async GET_PERSONS_ACTION(context,sortBy){
            return new Promise((resolve,reject)=>{
                if(context.getters.loggedIn){

                let page_number = sortBy.page || context.state.personPagination.page;
                let rowsPerPage = sortBy.rowsPerPage || context.state.personPagination.rowsPerPage;
                let sortRowsBy =  sortBy.sortRowsBy || context.state.personSortRowsBy;
                let sortDesc = sortBy.sortDesc|| false;

                    Axios.get(`/api/persons?page=${page_number}&rowsPerPage=${rowsPerPage}`,{
                        headers:{
                            Authorization: "Bearer "+context.state.token
                        },
                        params:{
                            query:sortBy.val,
                            sortRowsBy:sortRowsBy,
                            sortDesc:sortDesc
                        }
                    }).then(response=>{
                        let persons = response.data.persons;
                        context.commit('GET_PERSONS',persons);
                        resolve(persons)
                    }).catch(err=>{
                        console.log(err);
                        reject(err)
                    })

                }
                else{
                    reject('Not Authentication')
                }
            })
        },
        async GET_PERSON_ACTION(context,userID)
        {
           
            return new Promise((resolve,reject)=>{
                Axios.get(`/api/persons/${userID}`,{
                    headers:{
                        Authorization: "Bearer "+context.state.token
                    },
                }).then(res=>{

                   let data = res.data.person;
                   context.commit('GET_PERSON',data);
                   resolve(data);
                }).catch(err=>{
                    console.log(err);
                    reject(err);
                })
            });
        },

        async CHECK_USERNAME_ACTION(context,payload){
            return new Promise((resolve,reject)=>{
                Axios.get('/api/search-user',{
                    headers:{
                        Authorization: "Bearer "+context.state.token,
                    },
                    params:{
                        username:payload.username,
                        person_number:payload.person_number,
                    }
                }).then(res=>{
                    resolve(res.data);
                }).catch(err=>{
                    console.log(err);
                    resolve(res.err);
                })
            })
        },

        async CHECK_PASSWORD_ACTION(context,payload){
            
            return new Promise((resolve,reject)=>{
                Axios.get('/api/password-user',{
                    headers:{
                        Authorization: "Bearer "+context.state.token,
                    },
                    params:{
                        password_confirmation:payload.password_confirmation,
                        password:payload.password,
                        person_number:payload.person_number,
                    }
                }).then(res=>{
                    resolve(res.data);
                }).catch(err=>{
                    console.log(err);
                    resolve(res.err);
                })
            })
        },

         async SET_PERSON_ACTION(context){
             context.commit('SET_PERSON');
         },

        async UPDATE_PERSON_ACTION(context,payload){
            
            const person_id = payload.personID;
            const roles = payload.roles;
            const password = payload.password;
            const password_confirmation = payload.password_confirmation;
            const personData = payload.person;


            const formData = new FormData();
            formData.append('avatar', personData.avatar|| '');
            formData.append('name', personData.name|| '');
            formData.append('username', personData.username|| '');
            formData.append('national_id', personData.national_id|| '');
            formData.append('certificates', personData.certificates|| '');
            formData.append('positions', personData.positions|| '');
            formData.append('email', personData.email|| '');
            formData.append('biography', personData.biography|| '');
            formData.append('club_id', personData.club_id|| '');
            formData.append('phone', personData.phone|| '');
            formData.append('join_date', personData.join_date|| '');
            formData.append('roles', roles|| '');
            formData.append('password', password|| '');
            formData.append('password_confirmation', password_confirmation|| '');
           

            return new Promise((resolve,reject)=>{
                Axios.post(`/api/persons/${person_id}`,formData,
                {
                    headers:{
                        'Content-Type': "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2),
                        Authorization: "Bearer "+context.state.token,
                    }
                }).then(response =>{
                    let success = response.data;
                   
                    if(success.errorMessages){
                        resolve(success);
                    }
                    else{
                        context.commit('SET_FILES');
                        resolve(success);
                    }
                    
                })
                .catch(err=>{
                    console.log(err)
                    reject(err)
                });
            });
        },

        
        async ADD_PERSON_ACTION(context,payload){
           
            const roles = payload.roles;
            const password = payload.password;
            const password_confirmation = payload.password_confirmation;
            const personData = payload.person;


            const formData = new FormData();
            formData.append('avatar', personData.avatar|| '');
            formData.append('name', personData.name|| '');
            formData.append('username', personData.username|| '');
            formData.append('national_id', personData.national_id|| '');
            formData.append('certificates', personData.certificates|| '');
            formData.append('positions', personData.positions|| '');
            formData.append('email', personData.email|| '');
            formData.append('biography', personData.biography|| '');
            formData.append('club_id', personData.club_id|| '');
            formData.append('phone', personData.phone|| '');
            formData.append('join_date', personData.join_date|| '');
            formData.append('roles', roles|| '');
            formData.append('password', password|| '');
            formData.append('password_confirmation', password_confirmation|| '');

            return new Promise((resolve,reject)=>{
                Axios.post(`/api/persons`,formData,
                {
                    headers:{
                        'Content-Type': "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2),
                        Authorization: "Bearer "+context.state.token,
                    }
                }).then(response =>{
                    let success = response.data;
                    
                    if(success.errorMessages){
                        resolve(success);
                    }
                    else{
                        context.commit('SET_FILES');
                        context.commit('SET_PERSON');
                        resolve(success);
                    }
                    
                })
                .catch(err=>{
                    console.log(err)
                    reject(err)
                });
            });
        },

        GET_EDITOR_PERSONS_ACTION(context,payload){
            
            context.commit('GET_EDITOR_PERSONS',payload);
        },
        RETURN_TO_PERSONS_TABLE_ACTION(context){
            context.commit('RETURN_TO_PERSONS_TABLE');
        },
        //person end
    }
})

export default store;
