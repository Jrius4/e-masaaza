<template>
  <div>
      <section class="row container d-flex justify-content-center">
        <h2 class="d-block col-12 text-center">Login</h2>
        <div class="alert alert-danger text-center col-12" role="alert" v-if="error">
            <p>{{error}}</p>
        </div>
        <form class="row col-md-10 mx-auto" autocomplete="off" @submit.prevent="login" method="POST">
            <div class="form-group d-block col-12">
                <label>Email</label>
                <input class="form-control col-12" type="text" name="email" v-model="email" placeholder="user@example.com"/>
            </div>
            <div class="form-group d-block col-12">
                <label>Password</label>
                <input class="form-control col-12" type="password" name="password" v-model="password"/>
            </div>
            <div class="form-group d-block col-12">
                <button type="submit" class="btn btn-block btn-dark">Login</button>
            </div>
        </form>
      </section>
  </div>
</template>
<script>
export default {
    data(){
        return{
            email:null,
            password:null,
            error:null
        };
    },
    methods:{
        login(){
            this.$store.dispatch('retrieveTokenAction',{
                email:this.email,
                password:this.password
            }).then((result) => {
                this.$router.push({name:'dashboard'});

            }).catch((err) => {
                this.error = err.response.data.error
            });
        }
    },
    created(){}
}
</script>


