<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="10" md="10">
            <v-card class="elevation-12">
              <v-window>
                <v-window-item>
                  <v-row>
                    <v-col
                      cols="12" md="8"
                    >

                      <v-app-bar
                      color="light-blue darken-3"
                      class="offset-1"
                      dense
                      dark
                    >
                    <v-toolbar-title>Personel Details</v-toolbar-title>
                    <v-spacer></v-spacer>

                    <v-btn text icon v-on:click="personalDetail">
                      <v-icon>mdi-account-details</v-icon>
                    </v-btn>
                    <v-btn text icon v-on:click="personalDetailEdit">
                      <v-icon>mdi-account-edit</v-icon>
                    </v-btn>
                    <v-menu left bottom>
                      <template v-slot:activator="{on}">
                        <v-btn icon v-on="on">
                          <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item @click="()=>{}">
                          <v-list-item-title>
                            Logout
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                    
                    </v-app-bar>
                    
                    </v-col>                    
                  </v-row>
                  <v-row>
                    <v-col
                      cols="12" md="8"
                    >
                    <v-sheet min-height="80vh" class="overflow-y-auto">
                      <v-container>
                        <router-view></router-view>
                      </v-container>
                    </v-sheet>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
              
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
  export default{
    name:"Personels",
    data:()=>({

    }),
    methods:{
      personalDetailEdit(){
          this.$router.push({name:"edit-personal-information"})
      },
       personalDetail(){
          this.$router.push({name:"personel-profile"})
      }
    }
  }
</script>