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
import Vue from 'vue'
export default {
}
</script>

<style>
.quick{
    animation-duration: 250ms;
}

    .links > a {
                color: #636b6f;
                padding: 0 25px;
                font-size: 13px;
                font-weight: 600;
                letter-spacing: .1rem;
                text-decoration: none;
                text-transform: uppercase;
            }

</style>
