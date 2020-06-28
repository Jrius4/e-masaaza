<template>
<v-content>
    <v-row v-if="loadingView" align="center" justify="center">
        <v-col cols="12" sm="8" md="8">
            <loading-state/>
        </v-col>
    </v-row>
    <v-container   v-else-if="loadingView === false && selectedPerson !== null">
        <v-row align="center" justify="center">
            <v-btn color="light-blue darken-3" class="mx-2 btn-block my-2" dark @click="tableView()">
                View All Persons
            </v-btn>
        </v-row>
        <v-row>
            <v-col>
                <h3 class="light-blue--text text-darken-3 my-4">Person</h3>
            </v-col>
        </v-row>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="12" md="8">
                <base-material-card
                    class="v-card-profile"
                    :avatar="`/files/uploads/persons/${selectedPerson.avatar!==null && selectedPerson.avatar!==''?selectedPerson.avatar:'logo-one.jpeg'}`"
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
                                        <div v-if="selectedPerson.club_id">
                                            <img width="100px" class="img-fluid elevation-2" :src="`/files/uploads/clubs/${selectedPerson.club.logo ? selectedPerson.club.logo : 'logo-one.jpeg'}`" />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        Club Name
                                    </th>
                                    <td>{{selectedPerson.club ?selectedPerson.club.name:''}}</td>
                                </tr>
                                <tr>
                                    <th>
                                        Name
                                    </th>
                                    <td>{{selectedPerson.name}}</td>
                                </tr>
                                <tr>
                                    <th>
                                        Username
                                    </th>
                                    <td>{{selectedPerson.username}}</td>
                                </tr>
                                <tr>
                                    <th>
                                        Roles
                                    </th>
                                    <td>
                                        <p>
                                            <span v-for="(role,index) in selectedPerson.roles" :key="index">{{role.display_name}}</span>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        Personal Number
                                    </th>
                                    <td>
                                            {{selectedPerson.personal_number}}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        Biography
                                    </th>
                                    <td>
                                            {{selectedPerson.biography}}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        National ID
                                    </th>
                                    <td>
                                            <a class="row mx-auto" :href="`/files/uploads/persons/${selectedPerson.national_id!==null && selectedPerson.national_id!==''?selectedPerson.national_id:'logo-one.jpeg'}`" target="_blanck">
                                            <v-icon>mdi-download</v-icon>
                                        </a>
                                    </td>

                                </tr>
                                <tr>
                                    <th>
                                        Certificate
                                    </th>
                                    <td>
                                            <a class="row mx-auto" :href="`/files/uploads/persons/${selectedPerson.certificates!==null && selectedPerson.certificates!==''?selectedPerson.certificates:'logo-one.jpeg'}`" target="_blanck">
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
import {mapState} from 'vuex';
export default {
    props:['id'],
    data:()=>({
        loadingView:false,
        // selectedPerson:null,
    }),
    computed:{
        
        ...mapState({
            selectedPerson:state=>state.selectedPerson,
        })
    },
    methods:{
        getUser(){
            let userID = this.id;
            this.loadingView = true;
            const that = this;
            this.$store.dispatch('GET_PERSON_ACTION',userID).finally(()=>{
                that.loadingView = false;
            });

        },
        
        tableView(){
            let selectedUser = null;

            this.loadingView = true;
            

            this.$store.dispatch('RETURN_TO_PERSONS_TABLE_ACTION').finally(()=>{
                this.loadingView = false;
                this.$router.push({name:'persons'});
            });
        }
    },
    mounted(){
        this.getUser();
    }
}
</script>