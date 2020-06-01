<template>
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Control sidebar content goes here -->
    <div class="p-3">
        <h5>Username</h5>
        <router-link class="d-block" to="/logout" v-if="this.$store.getters.loggedIn">Logout</router-link>
        <!-- <a class="d-block" href="javascript:{}" onclick="">Logout</a>
        <form id="logout-form" action="" method="" style="display: none;">

        </form> -->
    </div>
</aside>
</template>

<script>
export default {

}
</script>

<style>

</style>
