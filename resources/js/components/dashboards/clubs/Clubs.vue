<template>
    <v-container fluid>
        <base-v-component
            heading="Masaza Clubs" color="light-blue--text text--darken-3"
        />

        <base-material-card
            icon="mdi-clipboard-text"
            title="Clubs"
            class="px-5 py-3 elevation-4"
        >
           <v-row align="center" justify="center">
               <v-col cols="12">
                   <v-window v-model="step">
                       <v-window-item :value="1">
                            <v-data-table
                                :search="search"
                                item-key="name" :headers="headers"
                                :sort-by="'name'"
                                :items="clubs"
                                :loading="loading"
                                :options.sync="options"
                                :items-per-page="itemsPerPage"
                                class="mr-2"
                                :server-items-length="totalClubs"
                                dense
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
                                            <v-col cols="12" md="3" sm="8" v-if="totalClubs<18">
                                                <v-btn color="light-blue darken-3" dark class="mb-2"
                                                    text
                                                    @click="createItem()"
                                                >
                                                    <v-icon left>mdi-plus</v-icon> Add Club
                                                </v-btn>
                                            </v-col>
                                            
                                        </v-row>
                                    </template>
                                    <template v-slot:item.logo="{item}">
                                        <v-avatar size="30px">
                                            <img :src="`/files/uploads/clubs/${item.logo!==null && item.logo!==''?item.logo:'logo-one.jpeg'}`"/>
                                        </v-avatar>
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
                                        label="Team Name"
                                        v-model="selectedEditItem.name"
                                        prepend-icon="mdi-soccer-field"
                                        ></v-text-field>
                                        <br/>
                                            <h5> <v-icon class="light-blue--text text--darken-3">mdi-camera</v-icon> Team Logo</h5>
                                            <upload-files  :set_no="1"  :file_type="'image'"  :input_multiple="false" :input_name="'clubs[]'" :post_url="'files/upload-file'"></upload-files>
                                            <v-row align="center" justify="center">
                                                <v-flex md4>
                                                    <v-avatar size="100px">
                                                        <img :src="`/files/uploads/clubs/${selectedEditItem.logo!==null && selectedEditItem.logo!==''?selectedEditItem.logo:'logo-one.jpeg'}`"/>
                                                    </v-avatar>
                                                </v-flex>
                                            </v-row>
                                            <v-row align="center" justify="center">
                                                <v-btn color="light-blue darken-3" class="mx-2 btn-block" dark @click="saveItem()">
                                                    Update Club
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
                                        label="Team Name"
                                        v-model="selectedCreateItem.name"
                                        prepend-icon="mdi-soccer-field"
                                        ></v-text-field>
                                        <br/>
                                            <h5> <v-icon class="light-blue--text text--darken-3">mdi-camera</v-icon> Team Logo</h5>
                                            <upload-files  :set_no="1"  :file_type="'image'"  :input_multiple="false" :input_name="'logo'" :post_url="'files/upload-file'"></upload-files>

                                            <v-row align="center" justify="center">
                                                <v-btn color="light-blue darken-3" class="mx-2 btn-block" dark @click="createNewItem()">
                                                    Create Club
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
                                    View All Teams
                                </v-btn>
                            </v-row>

                            <v-row>
                                <v-col>
                                   <h3 class="light-blue--text text-darken-3">Team</h3> 
                                </v-col>
                                
                            </v-row>
                            <v-row align="center" justify="center">
                                <v-col cols="12" md="4"  v-if="selectedViewItem!==null">
                                    <base-material-card
                                        class="v-card-profile"
                                        :avatar="`/files/uploads/clubs/${selectedViewItem.logo!==null && selectedViewItem.logo!==''?selectedViewItem.logo:'logo-one.jpeg'}`"
                                        align="center"
                                        justify="center"
                                    >
                                    <v-card-text>
                                        <h4 class="display-2 font-weight-light mb-3 light-blue--text text--darken-3">
                                            {{selectedViewItem.name}}
                                        </h4>
                                        <p>{{selectedViewItem.slogan}}</p>
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
import ClubsTable from "./ClubsTable.vue";
import ClubEditor from "./ClubEditor.vue";
import { mapState , mapActions} from 'vuex';
export default {
    name:"clubs",

    components:{ClubsTable,ClubEditor},
    data:()=>({
        singleSelect:false,
        step:1,
        search:'',
        loading:false,
        selectedViewItem:null,
        selectedCreateItem:null,
        selectedEditItem:null,
        selectedCreatedItem:null,
        itemsPerPage:10,
        options:{},
        headers:[
            {text:'CLUB',align:'left',sortable:false,value:'logo'},
            {text:'NAME',align:'left',value:'name'},
            {text:' ACTION',align:'right',value:'action',sortable:false},
        ],
    }),

    methods:{
        getClubsFromApi(){
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

                                this.$store.dispatch('GET_CLUBS_ACTION',pagination).finally(()=>{
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

                                this.$store.dispatch('GET_CLUBS_ACTION',pagination).finally(()=>{
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

                                this.$store.dispatch('GET_CLUBS_ACTION',pagination).finally(()=>{
                                    this.loading = false;
                                })

                    }
                }
            })
        },
        saveItem(){

            if(this.selectedEditItem !== null){
                let files = this.$store.state.set1Files;
                let file = files[0];
               let club = {
                        id:this.selectedEditItem.id,
                        name:this.selectedEditItem.name,
                        logo:file,
                    }

                console.log({club})
                this.$store.dispatch('UPDATE_CLUB_ACTION',club).finally(()=>{
                    this.step = 1;
                    this.getClubsFromApi();
                    this.selectedViewItem = null;
                    this.selectedEditItem = null;
                    this.selectedCreateItem = null;
                })

            }

            
            

        },
        tableView(){
            this.step=1;
            this.selectedViewItem = null;
            this.selectedEditItem = null;
            this.selectedCreateItem = null;
        },

        createItem(){
            this.step = 2;
            this.selectedCreateItem = {
                name:null,
                logo:null,
                slogan:null,
            };
            
        },
        createNewItem(){
            if(this.selectedCreateItem !== null){
                let files = this.$store.state.set1Files;
                let file = files[0];
                console.log({file})
               let club = {
                        name:this.selectedCreateItem.name,
                        logo:file,
                    }

                this.$store.dispatch('ADD_CLUB_ACTION',club).finally(()=>{
                    this.step = 1;
                    this.getClubsFromApi();
                    this.selectedViewItem = null;
                    this.selectedEditItem = null;
                    this.selectedCreateItem = null;
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
            this.selectedViewItem = null;
        },
        cancel(){
            this.selectedViewItem = null;
            this.selectedEditItem = null;
            this.selectedCreateItem = null;
        },
        deleteItem(item){
            this.$store.dispatch('DELETE_CLUB_ACTION',item).finally(()=>{
                this.getClubsFromApi();
            })
            
        }


    },

    computed:{
        ...mapState({
            clubComponentSelected:state=>state.clubsModule.clubComponentSelected,
            clubs:state=>state.clubs,
            page:state=>state.clubPagination.page,
            totalClubs:state=>state.totalClubs,
        }),

        selectedClubComponet(){
            switch(this.clubComponentSelected){
                case 'table':
                    return ClubsTable;
                case 'editor':
                    return ClubEditor;
            }
        }

    },
    beforeCreate(){
        console.log('clubs');
    },
    mounted(){
        this.loading = true;
        let search = '';
        let pageNumber = 1;
        let itemsPerPage = 10;
        let sortDesc = false;
        let sortBy = 'name';
        let pagination = {
                    val:search,
                    page:pageNumber,
                    sortRowsBy:sortBy,
                    rowsPerPage:itemsPerPage,
                    sortDesc:sortDesc,
                }
        this.$store.dispatch('GET_CLUBS_ACTION',pagination).finally(()=>{
            this.loading = false
        });
    },
    watch:{
        search(value){
            if(!this.search){
                this.search = "";
            }
            this.loading = true;
            this.getClubsFromApi();
        },
        options:{
            handler(){
                this.getClubsFromApi();
            },
            deep:true,
        }
    }

}
</script>
<style>

</style>
