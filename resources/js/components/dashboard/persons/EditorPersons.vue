<template>
<v-content>
    <v-row v-if="loadingView" align="center" justify="center">
        <v-col cols="12" sm="8" md="8">
            <loading-state/>
        </v-col>
    </v-row>
  <v-container v-else-if="loadingView === false && selectedPerson !== null">
    <v-row align="center" justify="center">
        <v-col cols="12">
            <h3>Persons Editor</h3>
            <div v-if="formErrors.length" class="alert alert-danger text-center col-12" role="alert">
                <div v-for="(error,index) in formErrors" :key="index"><p v-for="(err,i) in Object.values(error)" :key="`key-${i}`"><span v-for="(e,d) in err" :key="d">{{e}},</span></p><hr/></div>
            </div>
            <v-form class="light-blue--text text--darken-3">

                <v-text-field
                class="light-blue--text text--darken-3"
                label="Name"
                v-model="selectedPerson.name"
                prepend-icon="mdi-account"
                ></v-text-field>
                <v-text-field
                class="light-blue--text text--darken-3"
                label="Username"
                v-model="username"
                prepend-icon="mdi-account"
                :rules="usernameError"
                ></v-text-field>

                <v-text-field
                class="light-blue--text text--darken-3"
                :label="id?'Change Password':'Password'"
                v-model="password"
                prepend-icon="mdi-lock"
                type="password"
                :rules="passwordError"
                ></v-text-field>

                <v-text-field
                class="light-blue--text text--darken-3"
                :label="id?'Password Change Confirmation':'Password Confirmation'"
                v-model="password_confirmation"
                prepend-icon="mdi-lock-plus"
                type="password"
                :rules="passwordError"
                ></v-text-field>

                <v-col>
                    <v-autocomplete
                        :disabled="!roleCheck('committee_secretary')"
                        id="club"
                        v-model="clubVal"
                        label="Assign Club"
                        :items="clubs"
                        :search-input.sync="clubSearch"
                        :item-text="textClub"
                        :loading="isclubLoading"
                        autocomplete
                        append-icon="mdi-database-search"
                        :menu-props="{ bottom: true, offsetY: true }"
                        hint="Please Search Club"
                        chips attach clearable
                        v-on:change="handleClubSearch()"
                    >
                        <template v-slot:selection="data">
                            <v-chip
                            v-bind="data.attrs"
                            :input-value="data.selected"
                            close
                            @click="data.select"
                            @click:close="remove(data.item)"
                            >
                            <v-avatar left>
                                <v-img :src="`/files/uploads/clubs/${data.item.logo!== null && data.item.logo!== '' ?data.item.logo:'logo-one.jpeg'}`"></v-img>
                            </v-avatar>
                            {{ data.item.name }}
                            </v-chip>
                        </template>
                        <template v-slot:item='{item}'>
                            <v-row align="center" justify="center">
                                <v-col cols="12" sm="3">
                                    <img width="35" height="35" class="img-circle" :src="`/files/uploads/clubs/${item.logo!== null && item.logo!== '' ?item.logo:'logo-one.jpeg'}`"/>
                                </v-col>
                                <!-- <v-spacer></v-spacer> -->
                                <v-col cols="12" sm="6" class="mx-1">
                                    <h6 v-html='`${item.name}`'/>
                                </v-col>
                            </v-row>

                        </template>
                    </v-autocomplete>
                </v-col>
                <v-col>
                    <v-select
                    :disabled="!roleCheck('committee_secretary')"
                    class="light-blue--text text--darken-3"
                    label="Role"
                    :item-text="textRole"
                    :item-value="valueRole"
                    :items="[{id:1,name:'Committee Secretary'},{id:2,name:'Club Secretary'}]"
                    v-model="roles"
                    multiple
                    ></v-select>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                    <v-menu
                        v-model="menuDate"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                        <v-text-field
                            :disabled="!roleCheck('committee_secretary')"
                            v-model="selectedPerson.join_date"
                            label="Join Date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-on="on"
                            color="light-blue darken-3"
                        ></v-text-field>
                        </template>
                        <v-date-picker v-model="selectedPerson.join_date" @input="menuDate = false" color="light-blue darken-3"></v-date-picker>
                    </v-menu>
                </v-col>

                <v-text-field
                :disabled="!roleCheck('committee_secretary')"
                class="light-blue--text text--darken-3"
                label="Positon"
                v-model="selectedPerson.positions"
                prepend-icon="mdi-account"
                ></v-text-field>

                <v-text-field
                class="light-blue--text text--darken-3"
                label="Email"
                v-model="selectedPerson.email"
                prepend-icon="mdi-mail"
                ></v-text-field>

                <v-text-field
                class="light-blue--text text--darken-3"
                label="Phone Number"
                v-model="selectedPerson.phone"
                prepend-icon="mdi-phone"
                ></v-text-field>

                <v-textarea
                    cols="6"
                    label="Biography"
                    class="light-blue--text text--darken-3"
                    rows="5"
                    prepend-icon="mdi-account"
                    v-model="selectedPerson.biography"
                ></v-textarea>

                <br/>
                    <h5> <v-icon class="light-blue--text text--darken-3">mdi-camera</v-icon>{{"    "}}Profile Picture</h5>
                    <upload-files  :set_no="1"  :file_type="'image'"  :input_multiple="false" :input_name="'avatar[]'" :post_url="'files/upload-file'"></upload-files>
                    <v-row align="center" justify="center">
                        <v-flex md4>
                            <v-avatar size="100px">
                                <img :src="`/files/uploads/persons/${selectedPerson.avatar!==null && selectedPerson.avatar!==''?selectedPerson.avatar:'logo-one.jpeg'}`"/>
                            </v-avatar>
                        </v-flex>
                    </v-row>
                <br/>
                    <h5> <v-icon class="light-blue--text text--darken-3">fas fa-copy</v-icon>{{"    "}}National ID</h5>
                    <upload-files  :set_no="2"  :input_multiple="false" :input_name="'national_id[]'" :post_url="'files/upload-file'"></upload-files>
                    <h5> <v-icon class="light-blue--text text--darken-3">fas fa-copy</v-icon>{{"    "}}Certificate</h5>
                    <upload-files  :set_no="3"  :input_multiple="false" :input_name="'certificate[]'" :post_url="'files/upload-file'"></upload-files>

                    <v-row align="center" justify="center">
                        <v-btn color="light-blue darken-3" class="mx-2 btn-block" dark @click="savePerson()">
                            {{id?'Update':'Add'}} Person
                        </v-btn>
                        <v-btn color="light-black" class="mx-2 btn-block" dark @click="tableView()">
                            Cancel
                        </v-btn>
                    </v-row>
            </v-form>
        </v-col>
    </v-row>
</v-container>
</v-content>
</template>

<script>
import {mapState,mapGetters} from 'vuex';

export default {
    props:['id'],
    name:'EditorPerson',
    data:()=>({
        clubSearch:'',
        clubVal:'',
        isclubLoading:false,
        loadingView:true,
        menuDate:false,
        clubSelection:null,
        roles:null,
        roleSelection:[],
        clubs:[],
        clubItem:null,
        username:'',
        formErrors:[],
        usernameError:[],
        passwordError:[],
        password:'',
        password_confirmation:'',

    }),
    computed:{
        ...mapGetters([
            'loggedIn',
        //     'user'
        ]),
        ...mapState({
            selectedPerson:state=>state.selectedPerson,
            user:state=>state.user,
        }),
        
    },
    methods:{
        getUser(){
            const userID = this.id;
            this.loadingView = true;
            const that = this;
            if(userID){
                this.$store.dispatch('GET_PERSON_ACTION',userID).finally(()=>{
                    that.loadingView = false;
                    this.username = this.selectedPerson.username
                });
            }
            else{

                const userData = {
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
               }
               const that = this;
                this.$store.dispatch('SET_PERSON_ACTION').finally(()=>{
                    that.loadingView = false;
                })
                
               
            }
            

            

        },

         textClub(item){
            this.clubSelection = item;

            return item.name;
        },
        textRole(item){
            this.roleSelection = item;

            return item.name;
        },
        valueRole(item){
            // this.roleSelection = item;

            return item.id;
        },

        handleClubSearch(){

           if(this.clubSelection !== null ) this.clubItem = {
                id:this.clubSelection.id,
                name:this.clubSelection.name,
                logo:this.clubSelection.logo,
                slogan:this.clubSelection.slogan,
            };


        },
        remove (item) {
            this.clubSelection = null;
            this.clubItem = {
                id:"",
                name:"",
                logo:"",
            };
            this.clubs = [];
        },

        savePerson(){

            if(this.selectedPerson !== null){
                let files1 = this.$store.state.set1Files;
                let files2 = this.$store.state.set2Files;
                let files3 = this.$store.state.set3Files;
                let person = new Object();
                this.selectedPerson.username = this.username;
                person = this.selectedPerson;
            
                if(files1.length>0){
                    person.avatar = files1[0];
                }
                if(this.clubItem){
                    person.club_id = this.clubItem.id;
                }
                if(files2.length>0){
                    person.national_id = files2[0];
                }
                if(files3.length>0){
                    person.certificates = files3[0];
                }

                
                
                let roleData = '';
                if(this.roles!== null){
                    let roles = this.roles;
                    roleData = roles.join(",")
                }

               let personData = {
                   personID : this.id,
                   person,
                   password_confirmation:this.password_confirmation,
                   password:this.password,
                   roles:roleData,
               }
               let personID = this.id
              

                   if(personID){
                       this.loadingView = true;
                       this.formErrors = [];
                        this.$store.dispatch('UPDATE_PERSON_ACTION',personData)
                        .then(res=>{

                            if(res.errorMessages){
                                this.loadingView = false;
                                this.formErrors = [res.errorMessages]
                            }
                            else{
                                this.loadingView = false;
                                this.$router.push({name:'persons'});
                            }
                        })
                        
                    }
                    else{
                        this.loadingView = true;
                       this.formErrors = [];
                        this.$store.dispatch('ADD_PERSON_ACTION',personData)
                        .then(res=>{

                            if(res.errorMessages){
                                this.loadingView = false;
                                this.formErrors = [res.errorMessages]
                            }
                            else{
                                this.loadingView = false;
                                this.$router.push({name:'persons'});
                            }
                        })
                    }

            

                

           

                

            }

        },

        tableView(){
            let selectedUser = null;

            this.loadingView = true;
            

            this.$store.dispatch('RETURN_TO_PERSONS_TABLE_ACTION').finally(()=>{
                this.loadingView = false;
                this.$router.push({name:'persons'});
            });
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
    beforeCreate(){
        this.$store.dispatch('getUserAction');
    },
    mounted(){

        this.getUser();
        

        // this.$store.dispatch('GET_EDITOR_PERSONS_ACTION',);
    },
    watch:{

        clubSearch(val){
            if(!val){
                val = null;
            }
            else if(val!== null){
                this.clubSearch = val;

                this.isclubLoading = true;
            // Lazily load input items

           let pagination = {
                        val:this.clubSearch,
                        page:1,
                        sortRowsBy:'name',
                        rowsPerPage:6,
                        sortDesc:false,
                    }

                this.$store.dispatch('GET_CLUBS_ACTION',pagination).then(data=>{
                    let fetchedClubs = data.data;
                    this.clubs = fetchedClubs;
                }).catch(err=>console.log(err)).finally(()=>{
                    this.isclubLoading = false;
                })
            }
        },

        
        username(val){
            let searchUsername = this.selectedPerson.username;
            let personID = this.id;
            
            if(personID){
                
                if(this.username !== this.selectedPerson.username ){
                    this.usernameError = [];
                    this.$store.dispatch('CHECK_USERNAME_ACTION',{personID,username:val}).then(res=>{
                        if(res){
                            
                            this.usernameError = [...res.errorMessages.username];
                            
                        }
                        else{
                            this.usernameError = [];
                        }
                    });

                }
            }

            else{
                if(this.username !== this.selectedPerson.username ){
                    this.usernameError = [];
                    this.$store.dispatch('CHECK_USERNAME_ACTION',{personID,username:val}).then(res=>{
                        if(res){
                            
                            this.usernameError = [...res.errorMessages.username];
                            
                        }
                        else{
                            this.usernameError = [];
                        }
                    });

                }
            }
        },
        password(val){
            
            let userPassword = this.selectedPerson.password;
            let personID = this.id;
             if(personID){
                this.passwordError = [];
                if(this.password !== '' && this.password_confirmation !== '' ){
                    this.$store.dispatch('CHECK_PASSWORD_ACTION',{personID,password:this.password,password_confirmation:this.password_confirmation}).then(res=>{
                        if(res){
                            this.passwordError = [...res.errorMessages.password];
                            
                        }
                        else{
                            this.passwordError = [];
                        }
                    });

                }
                else if(this.password !== '' && this.password_confirmation === '' ){
                    this.passwordError.push('confirm password');
                }
            }
            else{
                this.passwordError = [];
                if(this.password !== '' && this.password_confirmation !== '' ){
                    
                    this.$store.dispatch('CHECK_PASSWORD_ACTION',{personID,password:this.password,password_confirmation:this.password_confirmation}).then(res=>{
                        if(res){
                            this.passwordError = [...res.errorMessages.password];
                            
                        }
                        else{
                            this.passwordError = [];
                        }
                        
                    });
                   

                }
                else if(this.password !== '' && this.password_confirmation === '' ){
                    this.passwordError.push('confirm password');
                }
            }
           

        },
        password_confirmation(val){
           
            let userPassword = this.selectedPerson.password;
            let personID = this.id;
            if(personID){
                this.passwordError = [];
                if(this.password !== '' && this.password_confirmation !== '' ){
                    this.$store.dispatch('CHECK_PASSWORD_ACTION',{personID,password:this.password,password_confirmation:this.password_confirmation}).then(res=>{
                        if(res){
                            this.passwordError = [...res.errorMessages.password];
                            
                        }
                        else{
                            this.passwordError = [];
                        }
                    });

                }
                else if(this.password !== '' && this.password_confirmation === '' ){
                    this.passwordError.push('confirm password');
                }
            }
            else{
                this.passwordError = [];
                if(this.password !== '' && this.password_confirmation !== '' ){
                    
                    this.$store.dispatch('CHECK_PASSWORD_ACTION',{personID,password:this.password,password_confirmation:this.password_confirmation}).then(res=>{
                        if(res){
                            this.passwordError = [...res.errorMessages.password];
                            
                        }
                        else{
                            this.passwordError = [];
                        }
                        
                    });
                   

                }
                else if(this.password === '' && this.password_confirmation !== '' ){
                    this.passwordError.push('password required');
                }
            }
           


        },



    }
}
</script>

<style>

</style>
