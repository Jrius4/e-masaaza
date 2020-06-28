<template>
<v-container>
    <v-row align="center" justify="center">
        <v-col v-if="loadingView" cols="12" sm="8" md="8">
            <loading-state/>
        </v-col>
        <v-col v-else cols="12">
            <h3>Persons List</h3>
            <v-data-table
                :search="search"
                item-key="personal_number" :headers="headers"
                :sort-by="'name'"
                :items="persons"
                :loading="loading"
                :options.sync="options"
                :items-per-page="itemsPerPage"
                class="mr-2"
                :server-items-length="totalPersons"
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
                    <img :src="`/files/uploads/persons/${item.avatar!==null && item.avatar!==''?item.avatar:'logo-one.jpeg'}`"/>
                </v-avatar>
            </template>
            <template v-slot:item.club_id="{item}">
                <span v-if="item.club_id!==null || item.club_id!==''" style="text-transform:capitalize">{{item.club!==null? item.club.name : 'No Club'}}</span>
            </template>
            <template v-slot:item.roles="{item}">
                <p>
                    <span v-for="(role,index) in item.roles" :key="index">{{role.display_name}}</span>
                </p>
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

            <router-link :to="{name:'persons'}">List</router-link>
            <router-link :to="{name:'persons-edit',params:{id:'2'}}">Editor</router-link>
        </v-col>
    </v-row>
</v-container>

</template>

<script>
import {mapState} from 'vuex'
export default {
    name:'Persons',
    data:()=>({
        options:{},
        loadingView:false,
        headers:[
            {text:'AVATAR',align:'left',sortable:false,value:'avatar'},
            {text:'NAME',align:'left',value:'name'},
            {text:'PERSONAL NO',align:'left',value:'personal_number'},
            {text:'ROLE',align:'left',sortable:false,value:'roles'},
            {text:'CLUB',align:'left',value:'club_id'},
            {text:' ACTION',align:'right',value:'action',sortable:false},
        ],
        
        search:'',
        loading:false,
        loadingView:false,
        itemsPerPage:10,
        search:'',
    }),
    methods:{
        getPersonsFromApi(){
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

                                this.$store.dispatch('GET_PERSONS_ACTION',pagination).finally(()=>{
                                    this.loading = false;
                                })
                }

                else if(search.length > 0){
                    if(pageNew > 1){
                            pageNew = this.persons.length ===0?1:pageNew;
                            this.loading = true;
                            pagination = {
                                        val:search,
                                        page:pageNew,
                                        sortRowsBy:sortBy[0],
                                        rowsPerPage:itemsPerPage,
                                        sortDesc:sortDesc[0],
                                    }

                                this.$store.dispatch('GET_PERSONS_ACTION',pagination).finally(()=>{
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

                                this.$store.dispatch('GET_PERSONS_ACTION',pagination).finally(()=>{
                                    this.loading = false;
                                })

                    }
                }
            })
        },
        createItem(){
                // this.$router.push({name:'persons-create'});
            let selectUser = {
                name:'',
                avatar:'',
                club:'',
                personal_number:'',
                role:'',
            }

            this.loadingView = true;

            this.$store.dispatch('GET_EDITOR_PERSONS_ACTION',selectUser).finally(()=>{
                this.loadingView = false;
                this.$router.push({name:'persons-create'});
            });
        },
        viewItem(item){
            let selectedUser = item;

            this.loadingView = true;

            this.$store.dispatch('GET_PERSON_ACTION',selectedUser.id).finally(()=>{
                this.loadingView = false;
                // this.$router.push({name:'persons'});
                this.$router.push({name:'persons-view',params:{id:selectedUser.id}});

            });

            // this.$store.dispatch('GET_EDITOR_PERSONS_ACTION',selectedUser).finally(()=>{
            //     this.loadingView = false;
            //     this.$router.push({name:'persons-view',params:{id:selectedUser.id}});
            // });
        },
        editItem(item){

            let selectedUser = item;

            this.loadingView = true;

            this.$store.dispatch('GET_EDITOR_PERSONS_ACTION',selectedUser).finally(()=>{
                this.loadingView = false;
                this.$router.push({name:'persons-edit',params:{id:selectedUser.id}});
            });
        },
        deleteItem(item){

        },

    },
    computed:{
        ...mapState({
            persons:state=>state.persons,
            page:state=>state.personPagination.page,
            totalPersons:state=>state.totalPersons,
        }),
    },
    mounted(){
        this.getPersonsFromApi();
    },
    watch:{
        search(value){
            if(!this.search){
                this.search = "";
            }
            this.loading = true;
            this.getPersonsFromApi();
        },
        options:{
            handler(){
                this.getPersonsFromApi();
            },
            deep:true,
        },
    }

}
</script>

<style>

</style>
