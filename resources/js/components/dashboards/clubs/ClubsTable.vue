<template>
<v-row>
    <v-col cols="12">
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



    </v-data-table>
    </v-col>
</v-row>
</template>
<script>
import {mapState} from 'vuex';
export default {
    name:"ClubTable",
    data:()=>({
        singleSelect:false,
        selected:[],
        search:'',
        headers:[
            {text:'CLUB',align:'left',sortable:false,value:'logo'},
            {text:'NAME',align:'left',value:'name'},
        ],
    }),
    computed:{
        ...mapState({
            clubs:state=>state.clubsModule.clubs
        }),
    },
    methods:{
       
    },
    created(){
        console.log({clubs:this.clubs})
    }
}
<script>
<style>
</style>
