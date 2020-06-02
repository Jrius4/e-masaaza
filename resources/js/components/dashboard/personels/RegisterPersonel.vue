<template>
    <v-sheet>
        <v-card-text class="light-blue--text text--darken-3">
            <h4 class="text-center">Edit Personal Information</h4>
            <v-form>
                <v-file-input
                :rules="rules"
                accept="image/png, image/jpeg, image/bmp"
                label="Profile Picture"
                v-model="avatar"
                show-size counter
                ></v-file-input>

                <v-file-input
                :rules="rules"
                label="National ID"
                v-model="national_id"
                show-size counter
                ></v-file-input>

                <v-file-input
                :rules="rules"
                label="Certificate"
                v-model="certificate"
                show-size counter
                ></v-file-input>

                <v-col cols="12" sm="12" md="12">
                    <v-menu
                        v-model="menu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model="date"
                            label="Date Of Birth"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-on="on"
                            color="light-blue darken-3"
                        ></v-text-field>
                        </template>
                        <v-date-picker v-model="date" @input="menu = false" color="light-blue darken-3"></v-date-picker>
                    </v-menu>
                    </v-col>




                <v-text-field
                id="password"
                label="Change Password"
                name="password"
                prepend-icon="mdi-lock"
                text="password"
                color="light-blue darken-3"
                />
                <v-text-field
                id="confirm_password"
                label="Confirm Password"
                name="password_confirmation"
                prepend-icon="mdi-lock-plus"
                type="text"
                color="light-blue darken-3"
                />


                <div class="d-block text-center">
                    <v-btn
                    rounded color="light-blue darken-3 elevation-12"
                    dark
                    large
                >
                    SAVE{{"     "}}<v-icon dark right>mdi-content-save-cog</v-icon>
                </v-btn>
                </div>

            </v-form>
        </v-card-text>
    </v-sheet>
</template>
<script>
import moment from 'moment';
export default{
    data:()=>({
        rules:[
            value=>!value || value.size < 2000000 || "Image size should be less than 2MB!",
        ],
        avatar:[],
        picker: new Date().toISOString().substr(0,10),
        national_id:[],
        certificate:[],
        menu: false,
        date:new Date().toISOString().substr(0,10)
    }),
    compute:{
        computedDataFormatted(){
            return this.date?moment(this.date).format('dddd,MMMM Do YYYY'): ''
        }
    }
}
</script>
