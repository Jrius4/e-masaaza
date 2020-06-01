<template>
    <v-app>
        <app-nav-bar/>
        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
import AppNavBar from './AppNavBar';
export default {
    name:'AppLayout',
    components:{AppNavBar}


}
</script>

<style>
.app-bar{
    min-height: 20vh;
}
.side-nav{
    min-height: 80vh;
}
.content-div{
    min-height: 80vh;
}

</style>
