<template>
  <v-app
    class="mx-auto overflow-hidden"
  >
    <v-app-bar
      color="light-blue darken-4"
      dark
    >
      <v-app-bar-nav-icon v-if="loggedIn" @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Masaza Cup</v-toolbar-title>

      <v-spacer></v-spacer>



      <v-btn icon  v-if="loggedIn">
          <v-icon>mdi-account</v-icon>
        <!-- <v-badge color="error" overlap>
            <template slot="badge">400</template>
            <v-icon color="tertiary">mdi-bell</v-icon>
        </v-badge> -->
      </v-btn>

      <v-toolbar-title  v-if="user">{{user.name}}</v-toolbar-title>

      <v-btn icon  v-if="loggedIn">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer  v-if="loggedIn"
      v-model="drawer"
      absolute
      temporary
      class="light-blue darken-4"
      dark
    >
      <v-list
        nav
        dense
      >

        <v-list-item-group
          active-class="light-blue--text text--lighten-4"
          style="color:red;"
        >
          <v-list-item router to="/portal">
                <v-list-item-action>
                    <v-icon>mdi-home</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Home</v-list-item-title>
                </v-list-item-content>
            </v-list-item>



            <v-list-item v-if="roleCheck('committee_secretary') || roleCheck('club_secretary')" router to="/requests">

                    <v-list-item-action>
                        <v-badge color="error" overlap>
                            <template slot="badge">400</template>
                            <v-icon color="tertiary">fas fa-clipboard-list</v-icon>
                        </v-badge>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Requests</v-list-item-title>
                    </v-list-item-content>


            </v-list-item>
            <v-list-item v-if="roleCheck('committee_secretary')" :to="{name:'persons'}" router>
                <v-list-item-action>
                    <v-icon small>fas fa-users</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Persons</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <!-- <v-list-item v-if="roleCheck('committee_secretary')" router>
                <v-list-item-action>
                    <v-icon small>fas fa-briefcase</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Roles</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item router v-if="roleCheck('committee_secretary')" >
                <v-list-item-action>
                    <v-icon medium left>mdi-soccer-field</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Pitches</v-list-item-title>
                </v-list-item-content>
            </v-list-item> -->
            <v-list-item v-if="roleCheck('committee_secretary')" to="/players" router>
                <v-list-item-action>
                    <v-icon small>mdi-account-group</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Players</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item router :to="{name:'personel-profile'}">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>

            <v-list-item style="margin:50px 0;">

            </v-list-item>





        </v-list-item-group>
        </v-list>



            <v-layout row style="">
            <v-flex md-10 sm-10>
                <v-list>
                <v-list-item dense>
                    <v-list-item-avatar class="ml-2">
                        <v-img src="/images/AdminLTELogo.png"></v-img>
                    </v-list-item-avatar>
                    <!-- <v-list-item-action class="ml-8">
                        <v-badge color="error" overlap>
                            <template slot="badge">400</template>
                            <v-icon color="tertiary">mdi-bell</v-icon>
                        </v-badge>
                    </v-list-item-action> -->
                </v-list-item>
                </v-list>
            </v-flex>
            <v-flex md-2>
                <v-tooltip top>
                    <template v-slot:activator="{on}">
                        <v-btn text icon v-on="on" v-on:click="logoutFunc" class="mt-2">
                            <v-icon dark="" right>fas fa-sign-out-alt</v-icon>
                        </v-btn>
                    </template>
                    <span>Exit</span>
                </v-tooltip>
            </v-flex>
            <v-flex md-12 sm-10>

                <v-card color="light-blue darken-4">
                    <v-list>
                        <v-list-item dense>
                            <v-list-item-action>
                                <v-btn class="mx-2" fab dark small color="red">
                                    <v-icon dark>mdi-soccer</v-icon>
                                </v-btn>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title style="font-weight:900">LEEROSPORTS</v-list-item-title>
                            </v-list-item-content>
                            <v-icon dark class="mr-2">fas fa-chevron-down</v-icon>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
    </v-navigation-drawer>
    <v-content style="min-height:100vh;">
        <router-view></router-view>
    </v-content>
  </v-app>
</template>


<script>
import {mapGetters,mapState} from 'vuex';
  export default {
    data: () => ({
      drawer: false,
    }),

    methods:{
        logoutFunc(){
           this.$router.push({name:'logout'});
        },
        roleCheck(value){
            let user = this.user;
            let hasRole = null;
            if(user!==null){
                let roles = user.roles;

                roles.forEach(element =>{
                    if(element.name === value){
                        hasRole = true;
                    }
                    else if(element.name === value){
                        hasRole = true;
                    }
                    else{
                        hasRole = false;
                    }
                });
                return hasRole;
            }
            else{
                return false;
            }
        }
    },
    computed:{
        ...mapGetters([
            'loggedIn',
        //     'user'
        ]),
        ...mapState({
            user:state=>state.user
        }),
    
    },
    beforeCreate(){
        this.$store.dispatch('getUserAction');
    },
    
    watch:{
        // $route(to,from,query){
        //     let that = this;
        //     this.user = that.user;
        //     console.log({to,from,query,user:that.user})
        // },
        // roleCheck(value){
        //     console.log(value)
        // }
        
    }
  }
</script>
