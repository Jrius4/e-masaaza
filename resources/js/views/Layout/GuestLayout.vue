<template>
  <div>
        <div class="links text-center">
            <router-link to="/">Home</router-link>
            <router-link to="/dashboard"  v-if="this.$store.getters.loggedIn">Dashboard</router-link>
            <router-link to="/login" v-if="!this.$store.getters.loggedIn">Login</router-link>
            <router-link to="/logout" v-if="this.$store.getters.loggedIn">Logout</router-link>
        </div>
        <transition
        enter-active-class="animated fadeIn quick"
        leave-active-class="animated fadeOut quick" mode="out-in"
        appear  appear-active-class="animated zoomIn quick"
        >
            <router-view/>
        </transition>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
