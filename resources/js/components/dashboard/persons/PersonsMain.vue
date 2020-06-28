<template>
    <v-container>
        <base-v-component
            heading="Masaza Personels" color="light-blue--text text--darken-3"
        />
        <base-material-card
            icon="fas fa-users"
            title="Personels"
            class="px-5 py-3 elevation-4"
        >
            <transition
        enter-active-class="animated bounceIn quick"
        leave-active-class="animated bounceOut quick" mode="out-in"
        appear  appear-active-class="animated zoomIn quick"
        >
            <router-view/>
        </transition>
        </base-material-card>

    </v-container>
</template>


<script>
export default {
    name:'PersonsMain'

}
</script>

<style>

</style>
