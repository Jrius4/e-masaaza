<template>
  <h1>Logout</h1>
</template>

<script>
export default {
    created(){
        this.$store.dispatch("destoryTokenAction").then((response) => {
            this.$router.push({name:"login"})
        }).catch((err) => {
            console.log(err)
        });
    }
}
</script>

<style>

</style>
