<template>
    <div class="row">
        <v-flex md3>
            <v-card ml-1 class="my-2 mx-1 sticky-top">
                <v-container ml-5 mt-5>
                    <h4 class="mb-5">FILTERS</h4>
                    <V-list-item>
                        <v-list-item-action>
                            <v-icon small>fas fa-user-plus</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Send Requests</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <V-list-item>
                        <v-list-item-action>
                            <v-icon small>fas fa-user-tag</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Follow Requests</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <V-list-item>
                        <v-list-item-action>
                            <v-icon small>fas fa-user-cog</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Waiting For Approval</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-text-field
                        label="Custom Search" prepend-icon="fas fa-search"
                        v-model="search"
                        class="ml-3 mr-12"
                        clearable
                    ></v-text-field>
                    <!-- <v-select
                        v-model="value" :items="requests"
                        item-text="name"
                        chips attach clearable
                        label="keywords" multiple
                        class="ml-3 mr-12"
                    ></v-select>
                    <v-select
                        v-model="club" :items="clubs"
                        chips attach clearable
                        label="Clubs" multiple
                        class="ml-3 mr-12"
                    ></v-select>
                    <v-select
                        v-model="status" :items="statuses"
                        chips attach clearable
                        label="Status" multiple
                        class="ml-3 mr-12"
                    ></v-select> -->
                </v-container>
            </v-card>
        </v-flex>
        <v-flex md8>
           <!-- <v-card
            style="background-color:white"
            class="ma-n4"
           > -->
           <v-card class="my-2 mx-1">
               <v-card-title>
                   Requests
                   <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                        clearable
                    ></v-text-field>

               </v-card-title>
            <v-container>
                <v-data-table
                    
                    :search="search" :single-select="singleSelect"
                    item-key="name" show-select :headers="headers"
                    :items="requests"
                    sort-by="applied" class="mr-2"
                >
                    <template v-slot:top>
                        <v-toolbar flat color="white">
                            <v-spacer></v-spacer>
                            <v-btn color="grey lighten-1" dark class="mb-2 mr-2"
                             text
                            >
                                <v-icon left>fas fa-upload</v-icon>
                                CSV import
                            </v-btn>
                            <v-btn color="success" dark class="mb-2"
                                 text
                            >
                                <v-icon left>mdi-plus</v-icon> Make Request
                            </v-btn>
                        </v-toolbar>
                    </template>
                    <template v-slot:item.avatar="{item}">
                        <v-avatar size="30px">
                            <img :src="item.avatar"/>
                        </v-avatar>
                    </template>
                    <template v-slot:item.applied="{item}">
                        <span style="color:#1471bd;font-weight:600">{{item.applied | moment}}</span>
                    </template>
                    <template v-slot:item.status="{item}">
                        <span style="text-transform:capitalize">{{item.status}}</span>
                    </template>
                    <template v-slot:item.years_played="{item}">
                        <v-progress-circular :value='item.years_played | yearPlayered'
                            color="light-blue" small dense

                            striped height="6"
                        >
                        {{item.years_played}}
                        </v-progress-circular>
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
                    <template v-slot:no-data>
                        <v-btn color="primary" @click="initialize">Reset</v-btn>
                    </template>


                </v-data-table>
            </v-container>
            <v-card-actions>
                   Requests
                   <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                        clearable
                    ></v-text-field>

               </v-card-actions>
           </v-card>
        </v-flex>
    </div>
</template>
<script>
import moment from 'moment';
import faker from 'faker';
export default{
    name:'Requests',
    data:()=>({
        items:['Bulemezi','Kaago'],
        value:['Bulemezi','Kaago'],
        clubs:['Buddu','Ssingo'],
        club:['Buddu','Ssingo'],
        statuses:['pending','accepted','denied','approved'],
        status:['pending','denied','approved'],
        singleSelect:false,
        selected:[],
        search:'',
        headers:[
            {text:'CLUB',align:'right',sortable:false,value:'avatar'},
            {text:'NAME',value:'name'},
            {text:'APPLIED_ON',value:'applied'},
            {text:'PLAYER',value:'player'},
            {text:'YEARS_PLAYED',value:'years_played'},
            {text:'STATUS',value:'status'},
            {text:'',value:'action',sortable:false},
        ],
    }),
    methods:{
        initialize(){

            this.requests = []

            for(var i=1;i<20;i++){
                this.requests.push({
                    avatar:'/images/AdminLTELogo.png',
                    player:`${['kazibwe','Magezi','kato','Jjuuko'][i%4]} ${faker.name.firstName()}`,
                    name:`${i}# ${['Buddu','Ssingo','Kyagwe','Bulemezi'][i%4]}`,
                    applied:`${faker.date.between('2020-02-04','2020-06-06')}`,
                    years_played:i%5,
                    status:['pending','accepted','denied','approved'][i%4],
                })
            }
        },
        viewItem(){

        },
        editItem(item){

        },
        deleteItem(item){

        }

    },
    created(){
        this.initialize();
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
