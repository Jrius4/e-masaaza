<template>
    <router-view></router-view>
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
