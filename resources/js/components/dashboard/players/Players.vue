<template>
    <v-container fluid>
        <base-v-component
            heading="Masaza Players" color="light-blue--text text--darken-3"
        />

        <base-material-card
            icon="fas fa-users"
            title="PLAYERS"
            class="px-5 py-3 elevation-4"
        >
           <v-row align="center" justify="center">
               <v-col cols="12">
                   <v-window v-model="step">
                       <v-window-item :value="1">
                            <v-data-table
                                :search="search"
                                item-key="personal_number" :headers="headers"
                                :sort-by="'last_name'"
                                :items="players"
                                :loading="loading"
                                :options.sync="options"
                                :items-per-page="itemsPerPage"
                                class="mr-2"
                                :server-items-length="totalPlayers"
                                large
                                >
                                    <template v-slot:top>
                                        <v-row flat>
                                            <v-col cols="12" md="3" sm="8">
                                                <v-text-field
                                                v-model="search"
                                                append-icon="mdi-magnify"
                                                label="Quick Search"
                                                clearable
                                                ></v-text-field>
                                            </v-col>

                                            <v-spacer></v-spacer>
                                            <v-col cols="12" md="3" sm="8">
                                                <v-btn color="light-blue darken-3" dark class="mb-2"
                                                    text
                                                    @click="createItem()"
                                                >
                                                    <v-icon left>mdi-plus</v-icon> Add Player
                                                </v-btn>
                                            </v-col>

                                        </v-row>
                                    </template>
                                    <template v-slot:item.avatar="{item}">
                                        <v-avatar size="30px">
                                            <img :src="`/files/uploads/players/${item.avatar!==null && item.avatar!==''?item.avatar:'logo-one.jpeg'}`"/>
                                        </v-avatar>
                                    </template>
                                    <template v-slot:item.date_of_birth="{item}">
                                        <span style="color:#1471bd;font-weight:600">{{item.date_of_birth | moment}}</span>
                                    </template>
                                    <template v-slot:item.years_played="{item}">
                                        <v-progress-circular :value='item.years_played | yearPlayered'
                                            color="light-blue" small dense

                                            striped height="6"
                                        >
                                        {{item.years_played}}
                                        </v-progress-circular>
                                    </template>
                                    <template v-slot:item.last_name="{item}">
                                        <span style="text-transform:capitalize">{{item.last_name}}</span>
                                    </template>
                                    <template v-slot:item.first_name="{item}">
                                        <span style="text-transform:capitalize">{{item.first_name}}</span>
                                    </template>
                                    <template v-slot:item.club_id="{item}">
                                        <span v-if="item.club_id!==null || item.club_id!==''" style="text-transform:capitalize">{{item.club!==null? item.club.name : 'No Club'}}</span>
                                    </template>
                                    <template v-slot:item.action="{item}">
                                        <v-icon small fab class="mr-2" color="blue" @click="viewItem(item)">
                                            fa fa-eye
                                        </v-icon>
                                        <v-icon small fab class="mr-2" color="green" @click="editItem(item)">
                                            fa fa-edit
                                        </v-icon>
                                        <v-icon small fab class="mr-2" color="red" @click="deleteItem(item)">
                                            fa fa-trash
                                        </v-icon>
                                    </template>



                                </v-data-table>
                       </v-window-item>
                       <v-window-item :value="2">

                           <v-row align="center" justify="center">
                                <v-flex md9 v-if="selectedEditItem!==null">


                                    <v-form class="light-blue--text text--darken-3">
                                        <v-text-field
                                        class="light-blue--text text--darken-3"
                                        label="First Name"
                                        v-model="selectedEditItem.first_name"
                                        prepend-icon="mdi-account"
                                        ></v-text-field>
                                        <v-text-field
                                        class="light-blue--text text--darken-3"
                                        label="Last Name"
                                        v-model="selectedEditItem.last_name"
                                        prepend-icon="mdi-account"
                                        ></v-text-field>
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
                                                    v-model="selectedEditItem.date_of_birth"
                                                    label="Date Of Birth"
                                                    prepend-icon="mdi-calendar"
                                                    readonly
                                                    v-on="on"
                                                    color="light-blue darken-3"
                                                ></v-text-field>
                                                </template>
                                                <v-date-picker v-model="selectedEditItem.date_of_birth" @input="menuDate = false" color="light-blue darken-3"></v-date-picker>
                                            </v-menu>
                                        </v-col>
                                        <v-col>
                                            <v-autocomplete
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
                                        <v-text-field
                                        class="light-blue--text text--darken-3"
                                        label="Positon"
                                        v-model="selectedEditItem.positions"
                                        prepend-icon="mdi-account"
                                        ></v-text-field>
                                        <v-select
                                        class="light-blue--text text--darken-3"
                                        label="Years Played"
                                        :items="[0,1,2,3,4]"
                                        v-model="selectedEditItem.years_played"
                                        ></v-select>

                                        <v-text-field
                                        class="light-blue--text text--darken-3"
                                        label="Former Club"
                                        v-model="selectedEditItem.former_club"
                                        prepend-icon="mdi-account"
                                        ></v-text-field>

                                        <v-text-field
                                        class="light-blue--text text--darken-3"
                                        label="Phone Number"
                                        v-model="selectedEditItem.phone"
                                        prepend-icon="mdi-phone"
                                        ></v-text-field>

                                        <v-text-field
                                        class="light-blue--text text--darken-3"
                                        label="Biography"
                                        v-model="selectedEditItem.biography"
                                        prepend-icon="mdi-account"
                                        ></v-text-field>

                                        <br/>
                                            <h5> <v-icon class="light-blue--text text--darken-3">mdi-camera</v-icon>{{"    "}}Profile Picture</h5>
                                            <upload-files  :set_no="1"  :file_type="'image'"  :input_multiple="false" :input_name="'avatar[]'" :post_url="'files/upload-file'"></upload-files>
                                            <v-row align="center" justify="center">
                                                <v-flex md4>
                                                    <v-avatar size="100px">
                                                        <img :src="`/files/uploads/players/${selectedEditItem.avatar!==null && selectedEditItem.avatar!==''?selectedEditItem.avatar:'logo-one.jpeg'}`"/>
                                                    </v-avatar>
                                                </v-flex>
                                            </v-row>
                                        <br/>
                                            <h5> <v-icon class="light-blue--text text--darken-3">fas fa-copy</v-icon>{{"    "}}National ID</h5>
                                            <upload-files  :set_no="2"  :input_multiple="false" :input_name="'national_id[]'" :post_url="'files/upload-file'"></upload-files>
                                            <h5> <v-icon class="light-blue--text text--darken-3">fas fa-copy</v-icon>{{"    "}}Certificate</h5>
                                            <upload-files  :set_no="3"  :input_multiple="false" :input_name="'certificate[]'" :post_url="'files/upload-file'"></upload-files>

                                            <v-row align="center" justify="center">
                                                <v-btn color="light-blue darken-3" class="mx-2 btn-block" dark @click="saveItem()">
                                                    Update Player
                                                </v-btn>
                                                <v-btn color="light-black" class="mx-2 btn-block" dark @click="tableView()">
                                                    Cancel
                                                </v-btn>
                                            </v-row>
                                    </v-form>


                                </v-flex>

                                <v-flex md9 v-if="selectedCreateItem!==null">

                                    <v-form class="light-blue--text text--darken-3">
                                        <v-text-field
                                        class="light-blue--text text--darken-3"
                                        label="First Name"
                                        v-model="selectedCreateItem.first_name"
                                        prepend-icon="mdi-account"
                                        ></v-text-field>
                                        <v-text-field
                                        class="light-blue--text text--darken-3"
                                        label="Last Name"
                                        v-model="selectedCreateItem.last_name"
                                        prepend-icon="mdi-account"
                                        ></v-text-field>
                                        
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
                                                    v-model="selectedCreateItem.date_of_birth"
                                                    label="Date Of Birth"
                                                    prepend-icon="mdi-calendar"
                                                    readonly
                                                    v-on="on"
                                                    color="light-blue darken-3"
                                                ></v-text-field>
                                                </template>
                                                <v-date-picker v-model="selectedCreateItem.date_of_birth" @input="menuDate = false" color="light-blue darken-3"></v-date-picker>
                                            </v-menu>
                                        </v-col>
                                        <v-col>
                                            <v-autocomplete
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
                                        <v-text-field
                                        class="light-blue--text text--darken-3"
                                        label="Positon"
                                        v-model="selectedCreateItem.positions"
                                        prepend-icon="mdi-account"
                                        ></v-text-field>

                                        <v-text-field
                                        class="light-blue--text text--darken-3"
                                        label="Former Club"
                                        v-model="selectedCreateItem.former_club"
                                        prepend-icon="mdi-account"
                                        ></v-text-field>

                                        <v-select
                                        class="light-blue--text text--darken-3"
                                        label="Years Played"
                                        :items="[0,1,2,3,4]"
                                        v-model="selectedCreateItem.years_played"
                                        ></v-select>

                                        <v-text-field
                                        class="light-blue--text text--darken-3"
                                        label="Phone Number"
                                        v-model="selectedCreateItem.phone"
                                        prepend-icon="mdi-phone"
                                        ></v-text-field>

                                        <v-text-field
                                        class="light-blue--text text--darken-3"
                                        label="Biography"
                                        v-model="selectedCreateItem.biography"
                                        prepend-icon="mdi-account"
                                        ></v-text-field>

                                        <br/>
                                            <h5> <v-icon class="light-blue--text text--darken-3">mdi-camera</v-icon>{{"    "}}Profile Picture</h5>
                                            <upload-files  :set_no="1"  :file_type="'image'"  :input_multiple="false" :input_name="'avatar[]'" :post_url="'files/upload-file'"></upload-files>
                                            <v-row align="center" justify="center">
                                                <v-flex md4>
                                                    <v-avatar size="100px">
                                                        <img :src="`/files/uploads/players/${selectedCreateItem.avatar!==null && selectedCreateItem.avatar!==''?selectedCreateItem.avatar:'logo-one.jpeg'}`"/>
                                                    </v-avatar>
                                                </v-flex>
                                            </v-row>
                                        <br/>
                                            <h5> <v-icon class="light-blue--text text--darken-3">fas fa-copy</v-icon>{{"    "}}National ID</h5>
                                            <upload-files  :set_no="2"  :input_multiple="false" :input_name="'national_id[]'" :post_url="'files/upload-file'"></upload-files>
                                            <h5> <v-icon class="light-blue--text text--darken-3">fas fa-copy</v-icon>{{"    "}}Certificate</h5>
                                            <upload-files  :set_no="3"  :input_multiple="false" :input_name="'certificate[]'" :post_url="'files/upload-file'"></upload-files>

                                            <v-row align="center" justify="center">
                                                <v-btn color="light-blue darken-3" class="mx-2 btn-block" dark @click="createNewItem()">
                                                    Add Player
                                                </v-btn>
                                                <v-btn color="light-black" class="mx-2 btn-block" dark @click="tableView()">
                                                    Cancel
                                                </v-btn>
                                            </v-row>
                                    </v-form>


                                </v-flex>
                           </v-row>

                       </v-window-item>
                       <v-window-item :value="3">
                           <v-row align="center" justify="center">
                                <v-btn color="light-blue darken-3" class="mx-2 btn-block my-2" dark @click="tableView()">
                                    View All Players
                                </v-btn>
                            </v-row>

                            <v-row>
                                <v-col>
                                   <h3 class="light-blue--text text-darken-3">Player</h3>
                                </v-col>

                            </v-row>
                            <v-row align="center" justify="center">
                                <v-col cols="12" md="8" sm="12" xs="12"  v-if="selectedViewItem!==null" style="min-width:436px">
                                    <base-material-card
                                        class="v-card-profile"
                                        :avatar="`/files/uploads/players/${selectedViewItem.avatar!==null && selectedViewItem.avatar!==''?selectedViewItem.avatar:'logo-one.jpeg'}`"
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
                                                        <img width="100px" class="img-fluid elevation-2" :src="`/files/uploads/clubs/${selectedViewItem.club.logo || 'logo-one.jpeg'}`" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Club Name
                                                    </th>
                                                    <td>{{selectedViewItem.club_id !== null || selectedViewItem.club_id !== '' ?selectedViewItem.club.name:''}}</td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        First Name
                                                    </th>
                                                    <td>{{selectedViewItem.first_name}}</td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Last Name
                                                    </th>
                                                    <td>
                                                         {{selectedViewItem.last_name}}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Personal Number
                                                    </th>
                                                    <td>
                                                         {{selectedViewItem.personal_number}}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Years Played
                                                    </th>
                                                    <td>
                                                         {{selectedViewItem.years_played}}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Biography
                                                    </th>
                                                    <td>
                                                         {{selectedViewItem.biography}}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Date Of Birth
                                                    </th>
                                                    <td>
                                                         {{selectedViewItem.date_of_birth | moment}}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        National ID
                                                    </th>
                                                    <td>
                                                         <a class="row mx-auto" :href="`/files/uploads/players/${selectedViewItem.national_id!==null && selectedViewItem.national_id!==''?selectedViewItem.national_id:'logo-one.jpeg'}`" target="_blanck">
                                                            <v-icon>mdi-download</v-icon>
                                                        </a>
                                                    </td>

                                                </tr>
                                                <tr>
                                                    <th>
                                                        Certificate
                                                    </th>
                                                    <td>
                                                         <a class="row mx-auto" :href="`/files/uploads/players/${selectedViewItem.certificates!==null && selectedViewItem.certificates!==''?selectedViewItem.certificates:'logo-one.jpeg'}`" target="_blanck">
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

                       </v-window-item>
                   </v-window>
                </v-col>

            </v-row>

        </base-material-card>


    </v-container>
</template>
<script>
import moment from 'moment';
import { mapState , mapActions} from 'vuex';
export default {
    name:"clubs",
    data:()=>({
        singleSelect:false,
        step:1,
        search:'',
        loading:false,
        menuDate: false,
        selectedViewItem:null,
        selectedCreateItem:null,
        selectedEditItem:null,
        selectedCreatedItem:null,
        itemsPerPage:10,
        clubSearch:null,
        clubVal:null,
        isclubLoading:false,
        clubSelection:null,
        clubItem:null,
        clubs:[],
        options:{},
        headers:[
            {text:'AVATAR',align:'left',sortable:false,value:'avatar'},
            {text:'LAST NAME',align:'left',value:'last_name'},
            {text:'FIRST NAME',align:'left',value:'first_name'},
            {text:'YEAR PLAYED',align:'left',value:'years_played'},
            {text:'PERSONAL NO',align:'left',value:'personal_number'},
            {text:'POSITIONS',align:'left',value:'positions'},
            {text:'DATE OF BIRTH',align:'left',value:'date_of_birth'},
            {text:'CLUB',align:'left',value:'club_id'},
            {text:' ACTION',align:'right',value:'action',sortable:false},
        ],
    }),

    methods:{
        getPlayersFromApi(){
            this.loading = true;
            return new Promise((resolve,reject)=>{

                const { sortBy, sortDesc, page, itemsPerPage } = this.options;

                let search = this.search;
                let pageNew = page;
                let pagination = {};

                if(!search){
                    search = "";
                    pagination = {
                                        val:search,
                                        page:pageNew,
                                        sortRowsBy:sortBy[0],
                                        rowsPerPage:itemsPerPage,
                                        sortDesc:sortDesc[0],
                                    }

                                this.$store.dispatch('GET_PLAYERS_ACTION',pagination).finally(()=>{
                                    this.loading = false;
                                })
                }

                else if(search.length > 0){
                    if(pageNew > 1){
                            pageNew = this.clubs.length ===0?1:pageNew;
                            this.loading = true;
                            pagination = {
                                        val:search,
                                        page:pageNew,
                                        sortRowsBy:sortBy[0],
                                        rowsPerPage:itemsPerPage,
                                        sortDesc:sortDesc[0],
                                    }

                                this.$store.dispatch('GET_PLAYERS_ACTION',pagination).finally(()=>{
                                    this.loading = false;
                                })

                    }
                    else{
                            pageNew = 1;
                            this.loading = true;
                            pagination = {
                                        val:search,
                                        page:pageNew,
                                        sortRowsBy:sortBy[0],
                                        rowsPerPage:itemsPerPage,
                                        sortDesc:sortDesc[0],
                                    }

                                this.$store.dispatch('GET_PLAYERS_ACTION',pagination).finally(()=>{
                                    this.loading = false;
                                })

                    }
                }
            })
        },
        saveItem(){

            if(this.selectedEditItem !== null){
                let files1 = this.$store.state.set1Files;
                let files2 = this.$store.state.set2Files;
                let files3 = this.$store.state.set3Files;
                let player = new Object();
                player = this.selectedEditItem;

                if(files1.length>0){
                    player.avatar = files1[0];
                }
                if(this.clubItem !== null || this.clubItem !== ''){
                    player.club_id = this.clubItem.id;
                }
                if(files2.length>0){
                    player.national_id = files2[0];
                }
                if(files3.length>0){
                    player.certificates = files3[0];
                }

                this.$store.dispatch('UPDATE_PLAYER_ACTION',player).then().catch(err=>console.error({err})).finally(()=>{
                    this.step = 1;
                    this.getPlayersFromApi();
                    this.selectedViewItem = null;
                    this.selectedEditItem = null;
                    this.selectedCreateItem = null;
                    this.clubVal = null;
                })

            }




        },

        textClub(item){
            this.clubSelection = item;

            return item.name;
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


        tableView(){
            this.step=1;
            this.selectedViewItem = null;
            this.selectedEditItem = null;
            this.selectedCreateItem = null;
        },

        createItem(){
            this.step = 2;
            this.clubVal = null;
            this.selectedCreateItem = {
                phone:null,
                avatar:null,
                certificates:null,
                national_id:null,
                last_name:null,
                first_name:null,
                biography:null,
                former_club:null,
                positions:null,
                date_of_birth:null,
                club_id:null,
                status:null,
                years_played:null,
            };

        },

        
        createNewItem(){
            this.clubVal = null;
            if(this.selectedCreateItem !== null){
                let files1 = this.$store.state.set1Files;
                let files2 = this.$store.state.set2Files;
                let files3 = this.$store.state.set3Files;
                let player = new Object();
                player = this.selectedCreateItem;

                if(files1.length>0){
                    player.avatar = files1[0];
                }
                if(this.clubItem !== null || this.clubItem !== ''){
                    player.club_id = this.clubItem.id;
                }
                if(files2.length>0){
                    player.national_id = files2[0];
                }
                if(files3.length>0){
                    player.certificates = files3[0];
                }

                this.$store.dispatch('ADD_PLAYER_ACTION',player).finally(()=>{
                    this.step = 1;
                    this.getPlayersFromApi();
                    this.selectedViewItem = null;
                    this.selectedEditItem = null;
                    this.selectedCreateItem = null;
                    this.clubVal = null;
                })

            }

        },


        viewItem(item){

            this.step = 3;
            this.selectedViewItem = item;
            this.selectedEditItem = null;

        },
        editItem(item){
            this.step = 2;
            this.selectedEditItem = item;
            if(item.club_id !== null && item.club_id !== ''){
                this.clubVal = item.clubItem;
            }
            this.selectedViewItem = null;
        },
        cancel(){
            this.selectedViewItem = null;
            this.selectedEditItem = null;
            this.selectedCreateItem = null;
        },
        deleteItem(item){
            this.$store.dispatch('DELETE_PLAYER_ACTION',item).finally(()=>{
                this.getPlayersFromApi();
            })

        },



    },

    computed:{
        ...mapState({
            players:state=>state.players,
            page:state=>state.playerPagination.page,
            totalPlayers:state=>state.totalPlayers,
        }),
    },
    beforeCreate(){
    },
    mounted(){
        this.loading = true;
        let search = '';
        let pageNumber = 1;
        let itemsPerPage = 10;
        let sortDesc = false;
        let sortBy = 'first_name';
        let pagination = {
                    val:search,
                    page:pageNumber,
                    sortRowsBy:sortBy,
                    rowsPerPage:itemsPerPage,
                    sortDesc:sortDesc,
                }
        this.$store.dispatch('GET_PLAYERS_ACTION',pagination).finally(()=>{
            this.loading = false
        });
    },
    watch:{
        search(value){
            if(!this.search){
                this.search = "";
            }
            this.loading = true;
            this.getPlayersFromApi();
        },
        options:{
            handler(){
                this.getPlayersFromApi();
            },
            deep:true,
        },

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

    },

    filters: {

            moment: function (date) {

                return  moment(date).format('Do MMM YYYY')

            },
            yearPlayered(years){
                return years*25;
            }

        }



}
</script>
<style>

</style>
