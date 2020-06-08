<template>
    <v-container fluid>
        <base-v-component
            heading="All Requests" color="light-blue--text text--darken-3"
        />

        <base-material-card
            icon="mdi-clipboard-text"
            title="Requests"
            class="px-5 py-3 elevation-4"
        >
           <v-row align="center" justify="center">
               <v-col cols="12">
                   <v-window v-model="step">
                       <v-window-item :value="1">

                                <v-data-table

                                    :search="search" :single-select="singleSelect"
                                    item-key="name" show-select :headers="headers"
                                    :items="requests"
                                    sort-by="applied" class="mr-2"
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
                                                    @click="makeRequest()"
                                                >
                                                    <v-icon left>mdi-file-send</v-icon> Make Request
                                                </v-btn>
                                            </v-col>
                                            
                                        </v-row>
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

                            </v-window-item>
                       <v-window-item :value="2">
                           <v-form class="light-blue--text text--darken-3">
                               <v-row align="center" justify="center">
                                    <v-btn color="light-blue darken-3" class="mx-2 btn-block my-2" dark @click="step=1">
                                        View All Requests
                                    </v-btn>
                                </v-row>
                               <v-row align="center" justify="center">
                                   <h4>Make A Request</h4>
                               </v-row>
                               
                                <v-row align="center" justify="center">
                                    <v-text-field
                                        class="light-blue--text text--darken-3"
                                        label="Search Player"
                                        v-model="playerRequest"
                                    >
                                        
                                        <v-btn  slot="append" color="light-blue darken-3" class="mx-2 btn-block" dark @click="playerSearch=true">
                                                <v-icon>mdi-database-search</v-icon> Search
                                            </v-btn>
                                            
                                        </v-text-field>
                                </v-row>
                               
                                <v-row align="center" justify="center" v-if="playerSearch">
                                    <v-col cols="12" md="4">
                                        <base-material-card
                                            class="v-card-profile"
                                            avatar="/images/user.png"
                                            align="center"
                                            justify="center"
                                        >
                                        <v-card-text>
                                            <v-row>
                                                <v-col cols="12">
                                                    <h4 class="display-2 font-weight-light mb-3 light-blue--text text--darken-3">
                                                        {{playerRequest!=""?playerRequest:'Micheal Jordan'}}
                                                    </h4> 
                                                </v-col>
                                                <v-col cols="12">
                                                    <h2 class="font-weight-light mb-3 light-blue--text text--darken-3">
                                                       Status: <small>{{playerRequestStatus!=""?playerRequestStatus:'under processing'}}</small> 
                                                    </h2>
                                                </v-col>
                                               
                                                 
                                            </v-row>
                                            <v-row>
                                                <v-col cols="12">
                                                    <h3 class="display-1">Team: <small>Buddu</small></h3 class="display-1">
                                                    <h3 class="display-1">Position: <small>Striker</small></h3 class="display-1">
                                                </v-col>
                                            </v-row>
                                            
                                            <v-row align="center" justify="center">
                    
                                                <v-btn color="light-black" class="mx-2 btn-block" dark @click="playerSearch=false">
                                                   <v-icon>mdi-send</v-icon> Request
                                                </v-btn>
                                            </v-row>
                                        </v-card-text>
                                        </base-material-card>
                                    </v-col>
                                </v-row>
                           </v-form>
                       </v-window-item>
                       <v-window-item :value="3">
                           <v-row align="center" justify="center">
                                <v-btn color="light-blue darken-3" class="mx-2 btn-block my-2" dark @click="step=1">
                                    View All Requests
                                </v-btn>
                            </v-row>

                            <v-row>
                                <v-col>
                                   <h3 class="light-blue--text text-darken-3">Request</h3>
                                </v-col>

                            </v-row>
                            <v-row align="center" justify="center">
                                <v-col cols="12" md="4">
                                    <base-material-card
                                        class="v-card-profile"
                                        avatar="/images/user.png"
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
import moment from 'moment';
import faker from 'faker';
export default{
    name:'Requests',
    data:()=>({
        step:1,
        playerSearch:false,
        playerRequest:"",
        playerRequestStatus:"",
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
        makeRequest(){
            this.step=2;
            this.playerRequest="";
            this.playerRequestStatus="";
        },
        viewItem(){
            this.step = 3;
        },
        editItem(item){
            this.step = 2;
            this.playerSearch= true;
            this.playerRequest=item.player;
            this.playerRequestStatus=item.status;
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
