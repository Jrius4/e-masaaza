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
                                :search="search" :single-select="singleSelect"
                                item-key="name" show-select :headers="headers"
                                :items="clubs"
                                sort-by="name" class="mr-2"
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
                                            <v-col cols="12" md="3" sm="8">
                                                <v-btn color="light-blue darken-3" dark class="mb-2"
                                                    text
                                                    @click="step=2"
                                                >
                                                    <v-icon left>mdi-plus</v-icon> Add Club
                                                </v-btn>
                                            </v-col>
                                            
                                        </v-row>
                                    </template>
                                    <template v-slot:item.logo="{item}">
                                        <v-avatar size="30px">
                                            <img :src="item.logo"/>
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
                           <v-form class="light-blue--text text--darken-3">
                               <v-text-field
                               class="light-blue--text text--darken-3"
                               label="Team Name"
                               prepend-icon="mdi-soccer-field"
                               ></v-text-field>
                               <br/>
                                <h5> <v-icon class="light-blue--text text--darken-3">mdi-camera</v-icon> Team Logo</h5>
                                <upload-files :input_multiple="false" :input_name="'teams[]'" :post_url="'files/upload-file'"></upload-files>
                                <v-row align="center" justify="center">
                                    <v-btn color="light-blue darken-3" class="mx-2 btn-block" dark @click="step=1">
                                        Save
                                    </v-btn>
                                    <v-btn color="light-black" class="mx-2 btn-block" dark @click="step=1">
                                        Cancel
                                    </v-btn>
                                </v-row>
                           </v-form>
                       </v-window-item>
                       <v-window-item :value="3">
                           <v-row align="center" justify="center">
                                <v-btn color="light-blue darken-3" class="mx-2 btn-block my-2" dark @click="step=1">
                                    View All Teams
                                </v-btn>
                            </v-row>

                            <v-row>
                                <v-col>
                                   <h3 class="light-blue--text text-darken-3">Team</h3> 
                                </v-col>
                                
                            </v-row>
                            <v-row align="center" justify="center">
                                <v-col cols="12" md="4">
                                    <base-material-card
                                        class="v-card-profile"
                                        avatar="/images/AdminLTELogo.png"
                                        align="center"
                                        justify="center"
                                    >
                                    <v-card-text>
                                        <h4 class="display-2 font-weight-light mb-3 light-blue--text text--darken-3">
                                            Buddu
                                        </h4>
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
        selected:[],
        step:1,
        search:'',
        headers:[
            {text:'CLUB',align:'left',sortable:false,value:'logo'},
            {text:'NAME',align:'left',value:'name'},
            {text:' ACTION',align:'right',value:'action',sortable:false},
        ],
    }),

    methods:{

        viewItem(item){
            this.step = 3;
        },
        editItem(item){
            this.step = 2;
        },
        deleteItem(item){

        }


    },

    computed:{
        ...mapState({
            clubComponentSelected:state=>state.clubsModule.clubComponentSelected,
            clubs:state=>state.clubsModule.clubs
        }),

        selectedClubComponet(){
            switch(this.clubComponentSelected){
                case 'table':
                    return ClubsTable;
                case 'editor':
                    return ClubEditor;
            }
        }

    }

}
</script>
<style>

</style>
