<template>
  <v-app>
      <v-content>
          <v-container class="fill-height" fluid>
              <v-row align="center" justify="center">
                  <v-col cols="12" sm="8" md="8">
                      <v-card class="elevation-12">
                        <v-window v-model="step">
                            <v-window-item :value="1">
                                <v-row>

                                    <div class="alert alert-danger text-center col-12" role="alert" v-if="error">
                                        <p>{{error}}</p>
                                    </div>
                                    <v-col cols="12"
                                        md="8"
                                    >
                                        <v-card-text
                                            class="mt-12"
                                        >
                                        <h1 class="text-center display-2 light-blue--text text--darken-4">
                                            Login to Masaza Cup
                                        </h1>
                                        <h4 class="text-center mt-4">Ensure your are already connected to the system</h4>

                                        <v-form>
                                           <v-text-field
                                            label="Username"
                                            v-model="username"
                                            prepend-icon="mdi-account"
                                            text="text"
                                            color="light-blue darken-3"
                                           /> 
                                           <v-text-field
                                            id="password"
                                            label="Password"
                                            v-model="password"
                                            prepend-icon="mdi-lock"
                                            type="password"
                                            color="light-blue darken-3"
                                           /> 
                                        </v-form>

                                        <h4 class="text-center mt-4">Forgot Your Password</h4>

                                        </v-card-text>
                                        <div class="text-center mt-3">
                                            <v-btn
                                                rounded color="light-blue darken-3 elevation-12"
                                                dark
                                                v-on:click="loginFunc"
                                            >LOGIN{{"       "}}<v-icon dark right>mdi-login</v-icon>
                                            </v-btn>
                                        </div>
                                    </v-col>


                                    <v-col cols="12"
                                        md="4" class="light-blue darken-3"
                                        
                                    >
                                        <v-card-text
                                        class="white--text mt-12"
                                        >
                                        <h3 class="text-center">
                                            Enter your personnel Details.
                                        </h3>
                                        </v-card-text>
                                        <div
                                            class="text-center"
                                        >
                                            <v-btn
                                                rounded outlined
                                                dark
                                                @click="step++"
                                            >
                                                REGISTER{{"     "}}<v-icon dark right>mdi-account-plus-outline</v-icon>
                                            </v-btn>
                                        </div>

                                    </v-col>
                                </v-row>
                            </v-window-item>
                            <v-window-item :value="2">
                                <v-row
                                    class="fill-height"
                                >
                                    <v-col
                                    col="12" md="4" class="light-blue darken-3"
                                    >
                                        <v-card-text
                                            class="white--text mt-12"
                                        >
                                            <h1
                                             class="text-center display-1"
                                            >
                                                Welcome Back !
                                            </h1>
                                            <h5
                                             class="text-center"
                                            >
                                                To Keep connected us login with your personnel info. 
                                            </h5>
                                        </v-card-text>

                                        <div
                                            class="text-center"
                                        >
                                            <v-btn
                                                rounded outlined
                                                dark
                                                @click="step--"
                                            >
                                                LOGIN{{"    "}}<v-icon dark right>mdi-login</v-icon>
                                            </v-btn>
                                        </div>
                                    </v-col>

                                    

                                    <v-col cols="12"
                                        md="8"
                                    >
                                        <v-card-text
                                            class="mt-12"
                                        >
                                        <h1 class="text-center display-2 light-blue--text text--darken-4">
                                            Register into e.Masaza Cup
                                        </h1>
                                        <h4 class="text-center mt-4">Ensure your already a connection key to the system</h4>

                                        <v-form>
                                           <v-text-field
                                            label="Username"
                                            name="Username"
                                            prepend-icon="mdi-account"
                                            text="text"
                                            color="light-blue darken-3"
                                           /> 

                                           <v-text-field
                                           id="password"
                                            label="Password"
                                            name="password"
                                            prepend-icon="mdi-account"
                                            text="password"
                                            color="light-blue darken-3"
                                           /> 
                                           <v-text-field
                                            id="confirm_password"
                                            label="Confirm Password"
                                            name="password_confirmation"
                                            prepend-icon="mdi-lock"
                                            type="password"
                                            color="light-blue darken-3"
                                           /> 

                                           <v-text-field
                                            id="personalKey"
                                            label="Personal Key"
                                            name="personalKey"
                                            prepend-icon="mdi-key"
                                            type="text"
                                            color="light-blue darken-3"
                                           /> 
                                        </v-form>

                                        <h5 class="text-center text-danger mt-4">Remember to have a personnel key
                                            <v-icon right style="color:tomato;">mdi-key</v-icon>
                                        </h5>

                                        </v-card-text>
                                        <div class="text-center mt-3">
                                            <v-btn
                                                rounded color="light-blue darken-3 elevation-12"
                                                dark
                                                v-on:click="registerFunc"
                                            >REGISTER{{"        "}}<v-icon dark right>mdi-account-plus-outline</v-icon>
                                            </v-btn>
                                        </div>
                                    </v-col>

                                    
                                </v-row>
                                
                            </v-window-item>
                        </v-window>
                      </v-card>
                  </v-col>
              </v-row>
          </v-container>
      </v-content>
  </v-app>
</template>

<script>
export default {
    data:()=>({
        step:1,
        username:null,
        password:null,
        error:null
    }),
    props:{
        source:String
    },
    methods:{
        loginFunc(){
            this.$store.dispatch('retrieveTokenAction',{
                username:this.username,
                password:this.password
            }).then((result) => {
                this.$router.push({name:'portal'});

            }).catch((err) => {
                this.error = err.response.data.error
            });
        },
        registerFunc(){
            this.$store.dispatch('retrieveTokenAction',{
                username:this.username,
                password:this.password
            }).then((result) => {
                this.$router.push({name:'edit-personal-information'});

            }).catch((err) => {
                this.error = err.response.data.error
            });
        },
    }
}
</script>

<style>

</style>
