<template>
    <v-container
        id="login-home"
        fluid
        tag="section"
    >
        <v-row>
            <v-card
                class="mx-auto col-md-4 elevation-2"
                tile="tile"
                outlined
            >
                <v-list-item three-line>
                    <v-list-item-content>
                        <h4 class="overline mb-4">MASAZA CUP e.REGISTRATION</h4>
                    </v-list-item-content>
                </v-list-item>

                <v-card-text>
                    <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                    >
                    <v-col cols="12" sm="12">
                        <v-text-field
                        v-model="name"
                        :counter="10"
                        :rules="nameRules"
                        label="USERNAME"
                        required
                        ></v-text-field>
                    </v-col>

                        <v-col cols="12" sm="12">
                            <v-text-field
                                v-model="password"
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="[rules.required, rules.min]"
                                :type="show1 ? 'text' : 'password'"
                                name="input-10-1"
                                label="PASSCODE"
                                hint="At least 8 characters"
                                counter
                                @click:append="show1 = !show1"
                            ></v-text-field>
                        </v-col>


                    </v-form>
                </v-card-text>

                <v-card-actions>
                    <div
                    class="mx-auto btn-group"
                    >
                        <v-btn  v-on:click="loginFunc" class="mx-1" dark>Login
                            <v-icon dark left>mdi-login</v-icon>
                        </v-btn>

                        <v-btn v-on:click="registerFunc" class="mx-1" dark>Register
                            <v-icon dark left>mdi-account-plus-outline</v-icon>
                        </v-btn>
                    </div>


                </v-card-actions>
            </v-card>
        </v-row>

    </v-container>
</template>

<script>
  export default {
      name:'login',
    data () {
      return {
        name: 'Junior',
        show1: false,
        valid:false,
        password: '',
        nameRules: [
            v => !!v || 'Name is required',
            v => v.length <= 10 || 'Name must be less than 10 characters',
        ],
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match'),
        },
      }
    },
    methods:{
        loginFunc(){
            // alert("Login to Dashboard");
            this.$router.push({name:'requests'});
        },
        registerFunc(){
            alert("register to Form");
        },
    }
  }
</script>

<style lang="scss" scoped>

</style>
