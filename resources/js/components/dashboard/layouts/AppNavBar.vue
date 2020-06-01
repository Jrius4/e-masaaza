<template>
      <v-navigation-drawer
        v-model="drawer"
        app class="blue darken py-0"
      >
        <v-container>
            <v-row>
                <v-col md="9">

                    <v-progress-circular
                        :rotate="300"
                        :size="50"
                        :width="7"
                        :value="value"
                        color="white"
                        class="mt-n1"
                    >{{value}}</v-progress-circular>
                </v-col>
                <v-col md="3">
                    <v-btn icon @click="toggleDrawer">
                        <v-icon>fas fa-bars</v-icon>
                    </v-btn>
                    <!-- <v-icon right class="mt-1">fas fa-bars</v-icon> -->
                </v-col>
            </v-row>
        </v-container>
        <v-list nav class="mb-4">

            <v-list-item router to="/">
                <v-list-item-action>
                    <v-icon small>fas fa-tachometer-alt</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Dashboard</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item router to="/requests">

                    <v-list-item-action>
                        <v-badge color="error" overlap>
                            <template slot="badge">400</template>
                            <v-icon color="tertiary">fas fa-clipboard-list</v-icon>
                        </v-badge>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Requests</v-list-item-title>
                    </v-list-item-content>


            </v-list-item>
            <v-list-item router to="/persons">
                <v-list-item-action>
                    <v-icon small>fas fa-users</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Persons</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item router to="/roles">
                <v-list-item-action>
                    <v-icon small>fas fa-briefcase</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Roles</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item router to="/roles">
                <v-list-item-action>
                    <v-icon medium dark>mdi-soccer-field</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Pitches</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item router to="/">
                <v-list-item-action>
                    <v-icon small>fas fa-tachometer-alt</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Dashboard</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

        </v-list>
        <v-layout row style="">
        <!-- <v-layout row style="position:absolute;bottom:0;top:2"> -->
            <v-flex md-10>
                <v-list-item dense>
                    <v-list-item-avatar class="ml-2">
                        <v-img src="/images/AdminLTELogo.png"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-action class="ml-8">
                        <v-badge color="error" overlap>
                            <template slot="badge">400</template>
                            <v-icon color="tertiary">mdi-bell</v-icon>
                        </v-badge>
                    </v-list-item-action>
                </v-list-item>
            </v-flex>
            <v-flex md-2>
                <v-tooltip top>
                    <template v-slot:activator="{on}">
                        <v-btn text icon v-on="on" class="mt-2">
                            <v-icon dark="" right>fas fa-sign-out-alt</v-icon>
                        </v-btn>
                    </template>
                    <span>Exit</span>
                </v-tooltip>
            </v-flex>
            <v-flex md-12>
                <v-card color="blue lighter-4">
                    <v-list-item dense>
                        <v-list-item-action>
                            <v-btn class="mx-2" fab dark small color="red">
                                <v-icon dark>mdi-soccer</v-icon>
                            </v-btn>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title style="color:white;font-weight:900">LEEROSPORTS</v-list-item-title>
                        </v-list-item-content>
                        <v-icon dark class="mr-2">fas fa-chevron-down</v-icon>
                    </v-list-item>
                </v-card>
            </v-flex>
        </v-layout>
      </v-navigation-drawer>
</template>

<script>
export default {
    props:['drawer'],
    data:()=>({
            // drawer:true,
            interval:{},
            value:0,
        }),

    beforeDestroy(){
        clearInterval(this.interval);
    },
    methods:{
        toggleDrawer(){
            this.drawer = (this.drawer === true ?false:true)
        }
    },
    mounted(){
        this.interval = setInterval(()=>{
            if(this.value ===100){
                return (this.value = 0);
            }
            this.value += 10
        },1000)
    }

}
</script>

<style scoped>
.v-progress-circular{
    margin:1rem;
}

</style>
