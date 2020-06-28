<template>
<v-content>
    <v-row v-if="loadingView" align="center" justify="center">
        <v-col cols="12" sm="8" md="8">
            <loading-state/>
        </v-col>
    </v-row>
    <v-container   v-else-if="loadingView === false && user !== null">
        <v-row>
            <v-col>
                <h3 class="light-blue--text text-darken-3 my-4">Profile</h3>
            </v-col>
        </v-row>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="12" md="8">
                <base-material-card
                    class="v-card-profile"
                    :avatar="`/files/uploads/persons/${user.avatar!==null && user.avatar!==''?user.avatar:'logo-one.jpeg'}`"
                    align="center"
                    justify="center"
                >
                    <v-card-text>
                        <table class="table table-sm col-12  font-weight-light mb-3 light-blue--text text--darken-3" style="font-size:medium;">
                            <tbody>
                                <tr>
                                    <th>
                                        Club
                                    </th>

                                    <td>
                                        <div v-if="user.club_id">
                                            <img width="100px" class="img-fluid elevation-2" :src="`/files/uploads/clubs/${user.club.logo ? user.club.logo : 'logo-one.jpeg'}`" />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        Club Name
                                    </th>
                                    <td>{{user.club ?user.club.name:''}}</td>
                                </tr>
                                <tr>
                                    <th>
                                        Name
                                    </th>
                                    <td>{{user.name}}</td>
                                </tr>
                                <tr>
                                    <th>
                                        Username
                                    </th>
                                    <td>{{user.username}}</td>
                                </tr>
                                <tr>
                                    <th>
                                        Roles
                                    </th>
                                    <td>
                                        <p>
                                            <span v-for="(role,index) in user.roles" :key="index">{{role.display_name}}</span>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        Personal Number
                                    </th>
                                    <td>
                                            {{user.personal_number}}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        Biography
                                    </th>
                                    <td>
                                            {{user.biography}}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        National ID
                                    </th>
                                    <td>
                                            <a class="row mx-auto" :href="`/files/uploads/persons/${user.national_id!==null && user.national_id!==''?user.national_id:'logo-one.jpeg'}`" target="_blanck">
                                            <v-icon>mdi-download</v-icon>
                                        </a>
                                    </td>

                                </tr>
                                <tr>
                                    <th>
                                        Certificate
                                    </th>
                                    <td>
                                            <a class="row mx-auto" :href="`/files/uploads/persons/${user.certificates!==null && user.certificates!==''?user.certificates:'logo-one.jpeg'}`" target="_blanck">
                                            <v-icon>mdi-download</v-icon>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </v-card-text>
                </base-material-card>
            </v-col>
        </v-row>
    </v-container>
    
</v-content>
</template>
<script>
import {mapState,mapGetters} from 'vuex';
export default {
    data:()=>({
        loadingView:false,
        // user:null,
        // user:null,
    }),
    computed:{
        ...mapGetters([
            'loggedIn',
        //     'user'
        ]),
        ...mapState({
            // user:state=>state.user,
            user:state=>state.user,
        })
    },
    methods:{
        getUser(){
            // this.user = this.user;
            // let userID = (this.user?this.user.id:'');

            // this.loadingView = true;
            // const that = this;
            // this.$store.dispatch('GET_PERSON_ACTION',userID).finally(()=>{
            //     that.loadingView = false;
            // });

        },
        
    },
    beforeCreate(){
         this.$store.dispatch('getUserAction');
       
    },
    mounted(){
        this.getUser();
    }
}
</script>