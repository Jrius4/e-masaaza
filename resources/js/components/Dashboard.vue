<template>
    <section class="row container  d-flex justify-content-center">
        <div class="col-md-10 mx-auto">
            <h3>Dashboard</h3>
            <p v-if="user!== null" class="text-center">
               Welcome {{user.name}}, :)
            </p>
            <router-link class="btn bth-block btn-dark text-center col-12" to="/logout">Logout</router-link>
        </div>
    </section>
</template>

<script>
export default {
    data(){
        return{
            user:null
        }
    },
    created(){
        this.$store.dispatch("getUserAction").then((response) => {
           this.user =  this.$store.state.user
        }).catch((err) => {
            console.log(err)
        });
    }
}
</script>

<style>

</style>
