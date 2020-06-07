<template>
    <v-sheet class="light-blue--text text--darken-3 p-2">
        <v-row align="center" justify="center" class="px-4">

            <v-flex md12 sm12 xs12>
                <h4 class="text-left mb-6"></h4>
            </v-flex>
            <v-flex md6 class="mt-4">
                <base-material-card
                    class="v-card-profile"
                    avatar="/images/user.png"
                    align="center"
                    justify="center"
                >
                    <v-card-text>
                        <h6 class="display-1 mb-1 light-blue--text text--darken-1">
                            Secretary
                        </h6>
                        <h4 class="display-2 font-weight-light mb-3 light-blue--text text--darken-3">
                            Julius Junior Kazibwe
                        </h4>

                        <p class="font-weight-light light-blue--text text--darken-1">
                         Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...
                        </p>

                        <v-row>
                            <v-col cols="12" md="12">
                               <h6 class="display-1 mb-1 light-blue--text text--darken-1">
                                    Documents
                                </h6> 
                            </v-col>
                            
                            <v-col cols="12" md="12">
                                <div v-for="(file, key) in files" :key="key" class="file-listing light-blue--text text--darken-1">
                                    <h5 >{{file.type}}</h5>
                                    <img  class="preview" src="/images/generic.png" v-bind:ref="'preview'"/>
                                    {{file.name}}
                                    <br/>
                                    <v-btn class="row mx-auto" ico>
                                        <v-icon>mdi-download</v-icon>
                                    </v-btn>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </base-material-card>
            </v-flex>
            </v-row>
        </v-row>
    </v-sheet>
</template>
<script>
import faker from 'faker';
export default {
    data:()=>({
        files:[{type:"National ID",location:"/images/",name:"generic.png"},{type:"Certificate",location:"/files/uploads/",name:"user.pdf"}],
        biography:"hdajskhdiuasfjasfks fsifjas fojaskamns faisojf aisifsoafjsafjueifnsjndsja fsafhufajfijsafsa fsaufsa"
    }),

}
</script>

<style>
div.file-listing img{
        max-width: 90%;
    }

    div.file-listing{
        margin: auto;
        padding: 10px;
        border-bottom: 1px solid #ddd;
    }

    div.file-listing img{
        height: 100px;
    }
</style>
