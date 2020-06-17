<template>
    <div class="container">
        <div class="large-12 medium-12 small-12 filezone">
            <input type="file" id="files" ref="files" :accept="fileFormat" multiple  v-on:change="handleFiles()"/>
            <p>
                Drop your files here <br>or click to search
            </p>
        </div>
        <div v-if="set_no === 1">
             <div v-for="(file, key) in set1Files" :key="key" class="file-listing">
                <img class="preview" v-bind:ref="'preview'+parseInt(key)"/>
                
                {{ file.name }} <br/>
                <span  v-if="set1RuleStatus[key]" class="text-success">{{rules[key]}}</span>
                <span v-else class="text-danger">{{set1Rules[key]}}</span>
                <div class="success-container" v-if="file.id > 0">
                    Success
                    <input type="hidden" :name="input_name" :value="file.id"/>
                </div>
                <div class="remove-container" v-else>
                    <a class="remove" v-on:click="removeFile(key)">Remove</a>
                </div>
            </div>
        </div>
        <div v-if="set_no === 2">
             <div v-for="(file, key) in set2Files" :key="key" class="file-listing">
                <img class="preview" v-bind:ref="'preview'+parseInt(key)"/>
                
                {{ file.name }} <br/>
                <span  v-if="set2RuleStatus[key]" class="text-success">{{rules[key]}}</span>
                <span v-else class="text-danger">{{set2Rules[key]}}</span>
                <div class="success-container" v-if="file.id > 0">
                    Success
                    <input type="hidden" :name="input_name" :value="file.id"/>
                </div>
                <div class="remove-container" v-else>
                    <a class="remove" v-on:click="removeFile(key)">Remove</a>
                </div>
            </div>
        </div>
        <div v-if="set_no === 3">
             <div v-for="(file, key) in set3Files" :key="key" class="file-listing">
                <img class="preview" v-bind:ref="'preview'+parseInt(key)"/>
                
                {{ file.name }} <br/>
                <span  v-if="set3RuleStatus[key]" class="text-success">{{rules[key]}}</span>
                <span v-else class="text-danger">{{set3Rules[key]}}</span>
                <div class="success-container" v-if="file.id > 0">
                    Success
                    <input type="hidden" :name="input_name" :value="file.id"/>
                </div>
                <div class="remove-container" v-else>
                    <a class="remove" v-on:click="removeFile(key)">Remove</a>
                </div>
            </div>
        </div>
        <div v-if="set_no === 4">
             <div v-for="(file, key) in set4Files" :key="key" class="file-listing">
                <img class="preview" v-bind:ref="'preview'+parseInt(key)"/>
                
                {{ file.name }} <br/>
                <span  v-if="set4RuleStatus[key]" class="text-success">{{rules[key]}}</span>
                <span v-else class="text-danger">{{set4Rules[key]}}</span>
                <div class="success-container" v-if="file.id > 0">
                    Success
                    <input type="hidden" :name="input_name" :value="file.id"/>
                </div>
                <div class="remove-container" v-else>
                    <a class="remove" v-on:click="removeFile(key)">Remove</a>
                </div>
            </div>
        </div>
        <!--
        <div v-for="(file, key) in files" :key="key" class="file-listing">
            <img class="preview" v-bind:ref="'preview'+parseInt(key)"/>
            
            {{ file.name }} <br/>
            <span  v-if="rulesStatus[key]" class="text-success">{{rules[key]}}</span>
            <span v-else class="text-danger">{{rules[key]}}</span>
            <div class="success-container" v-if="file.id > 0">
                Success
                <input type="hidden" :name="input_name" :value="file.id"/>
            </div>
            <div class="remove-container" v-else>
                <a class="remove" v-on:click="removeFile(key)">Remove</a>
            </div>
        </div>
        -->
        <!-- <a class="submit-button" v-on:click="submitFiles()" v-show="files.length > 0">Upload <i class="fa fa-save"></i></a> -->
    </div>
</template>

<script>
import {mapState} from 'vuex';
    export default {
        props: ['file_type','input_name', 'post_url',"input_multiple",'set_no'],
        data() {
            return {
                files: [],
                rules:[],
                rulesStatus:[],
                fileType:[]
            }
        },
        methods: {
            // your methods here
            convertBytesToSize(bytes){
                var sizes = ['Bytes','KB','MB',"GB","TB"];
                if(bytes === 0) return "0 Byte";
                var i = parseInt(Math.floor(Math.log(bytes)/Math.log(1024)));
                return Math.round(bytes/Math.pow(1024,i),2)+ " "+ sizes[i];
            },
            handleFiles() {
                let uploadedFiles = this.$refs.files.files;
                

                if(this.input_multiple){
                    
                    for(var i = 0; i < uploadedFiles.length; i++) {
                        this.files.push(uploadedFiles[i]);
                        if(uploadedFiles[i].size > 1024 *1024 *2){
                            this.rules.push('file size is '+this.convertBytesToSize(uploadedFiles[i].size)+', let size be atleast < 2MB');
                            this.rulesStatus.push(false)
                        }
                        else if(uploadedFiles[i].size < 1024 *1024 *2){
                                this.rules.push('file size is '+this.convertBytesToSize(uploadedFiles[i].size));
                                this.rulesStatus.push(true)

                        }
                    }

                    let set_number = this.set_no
                    if(!set_number){
                        set_number = null
                        let data = {
                                set_number:set_number,
                                files:this.files,
                                rules:this.rules,
                                rulesStatus:this.rulesStatus,
                            }
                        this.$store.dispatch('UPLOADED_FILE_ACTION',data);
                    }
                    else if(set_number !== null){
                    
                            let data = {
                                set_number:set_number,
                                files:this.files,
                                rules:this.rules,
                                rulesStatus:this.rulesStatus,
                            }
                            this.$store.dispatch('UPLOADED_FILE_ACTION',data);
                        
                    }

                }
                else{
                    this.files = []
                    this.rules = []
                    this.rulesStatus = []
                    for(var i = 0; i < uploadedFiles.length; i++) {
                        this.files.push(uploadedFiles[i]);
                        if(uploadedFiles[i].size > 1024 *1024 *2){
                            this.rules.push('file size is '+this.convertBytesToSize(uploadedFiles[i].size)+'MB'+', allowed size is atleast < 2MB');
                            this.rulesStatus.push(false);
                        }
                        else if(uploadedFiles[i].size < 1024 *1024 *2){
                            this.rules.push('file size is '+this.convertBytesToSize(uploadedFiles[i].size));
                            this.rulesStatus.push(true);
                        }
                    }

                    let set_number = this.set_no
                    if(!set_number){
                        set_number = null
                        let data = {
                                set_number:set_number,
                                files:this.files,
                                rules:this.rules,
                                rulesStatus:this.rulesStatus,
                            }
                        this.$store.dispatch('UPLOADED_FILE_ACTION',data);
                    }
                    else if(set_number !== null){
                    
                            let data = {
                                set_number:set_number,
                                files:this.files,
                                rules:this.rules,
                                rulesStatus:this.rulesStatus,
                            }
                            this.$store.dispatch('UPLOADED_FILE_ACTION',data);
                        
                    }
                }
                console.log({files3:this.files})
                
               
                this.getImagePreviews();
                
            },
            getImagePreviews(){
                let set_number = this.set_no;
                if(!set_number){
                    set_number = null;
                }
                else if (set_number !== null){
                    if(set_number === 1 ){
                        for( let i = 0; i < this.set1Files.length; i++ ){
                                if( /\.(jpe?g|png|gif)$/i.test( this.set1Files[i].name )  ){
                                    // this.fileType.push(true);
                                    let reader = new FileReader();
                                    reader.addEventListener("load", function(){
                                        this.$refs['preview'+parseInt(i)][0].src = reader.result;
                                    }.bind(this), false);
                                    reader.readAsDataURL( this.set1Files[i] );
                                }
                                else{
                                    this.$nextTick(function(){
                                        this.$refs['preview'+parseInt(i)][0].src = '/images/generic.png';
                                    });
                                }
                        }
                    }

                    if(set_number === 2 ){
                        for( let i = 0; i < this.set2Files.length; i++ ){
                                if( /\.(jpe?g|png|gif)$/i.test( this.set2Files[i].name )  ){
                                    // this.fileType.push(true);
                                    let reader = new FileReader();
                                    reader.addEventListener("load", function(){
                                        this.$refs['preview'+parseInt(i)][0].src = reader.result;
                                    }.bind(this), false);
                                    reader.readAsDataURL( this.set2Files[i] );
                                }
                                else{
                                    this.$nextTick(function(){
                                        this.$refs['preview'+parseInt(i)][0].src = '/images/generic.png';
                                    });
                                }
                        }
                    }


                    if(set_number === 3 ){
                        for( let i = 0; i < this.set3Files.length; i++ ){
                                if( /\.(jpe?g|png|gif)$/i.test( this.set3Files[i].name )  ){
                                    // this.fileType.push(true);
                                    let reader = new FileReader();
                                    reader.addEventListener("load", function(){
                                        this.$refs['preview'+parseInt(i)][0].src = reader.result;
                                    }.bind(this), false);
                                    reader.readAsDataURL( this.set3Files[i] );
                                }
                                else{
                                    this.$nextTick(function(){
                                        this.$refs['preview'+parseInt(i)][0].src = '/images/generic.png';
                                    });
                                }
                        }
                    }


                    if(set_number === 4 ){
                        for( let i = 0; i < this.set4Files.length; i++ ){
                                if( /\.(jpe?g|png|gif)$/i.test( this.set4Files[i].name )  ){
                                    // this.fileType.push(true);
                                    let reader = new FileReader();
                                    reader.addEventListener("load", function(){
                                        this.$refs['preview'+parseInt(i)][0].src = reader.result;
                                    }.bind(this), false);
                                    reader.readAsDataURL( this.set4Files[i] );
                                }
                                else{
                                    this.$nextTick(function(){
                                        this.$refs['preview'+parseInt(i)][0].src = '/images/generic.png';
                                    });
                                }
                        }
                    }
                    
                }
                /**
                    for( let i = 0; i < this.files.length; i++ ){
                        if ( /\.(jpe?g|png|gif)$/i.test( this.files[i].name ) ) {
                            // this.fileType.push(true);
                            let reader = new FileReader();
                            reader.addEventListener("load", function(){
                                this.$refs['preview'+parseInt(i)][0].src = reader.result;
                            }.bind(this), false);
                            reader.readAsDataURL( this.files[i] );
                        }
                        // else if( /\.(pdf)$/i.test( this.files[i].name ) ) {
                        //     this.fileType.push(false);
                        //     let reader = new FileReader();
                        //     reader.addEventListener("load", function(){
                        //         this.$refs['preview-pdf-'+parseInt(i)][0].src = reader.result;
                        //     }.bind(this), false);
                        //     reader.readAsDataURL( this.files[i] );
                        // }
                        else{
                            this.$nextTick(function(){
                                this.$refs['preview'+parseInt(i)][0].src = '/images/generic.png';
                            });
                        }
                    }
                */
            },
            removeFile( key ){
                // this.files.splice( key, 1 );

                let set_number = this.set_no;
                if(!set_number){
                    set_number = null
                    let data ={
                        set_number:set_number,
                        key:key
                    } 
                    this.$store.dispatch('DELETE_UPLOADED_FILE_ACTION',data);
                }
                else if(set_number !== null){
                    let data ={
                        set_number:set_number,
                        key:key
                    } 
                    this.$store.dispatch('DELETE_UPLOADED_FILE_ACTION',data);
                }


                this.getImagePreviews();
            },
            submitFiles() {
                for( let i = 0; i < this.files.length; i++ ){
                    if(this.files[i].id) {
                        continue;
                    }
                    let formData = new FormData();
                    formData.append('files', this.files[i]);
                    console.log(this.files[i]);
                    axios.post('/' + this.post_url,
                        formData,
                        {
                            headers: {
                                'Content-Type': "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2)
                            }
                        }
                    ).then(function(data) {
                        console.log(data)
                        this.files[i].id = data['data']['id'];
                        this.files.splice(i, 1, this.files[i]);
                        console.log('success');
                    }.bind(this)).catch(function(data) {
                        console.log(data);
                    });
                }
            }
        },
        computed:{
            ...mapState({
                set1Files:state=>state.set1Files,                
                set1Rules:state=>state.set1Rules,              
                set1RuleStatus:state=>state.set1RuleStatus,
                set2Files:state=>state.set2Files,                
                set2Rules:state=>state.set2Rules,               
                set2RuleStatus:state=>state.set2RuleStatus,
                set3Files:state=>state.set3Files,                
                set3Rules:state=>state.set3Rules,                
                set3RuleStatus:state=>state.set3RuleStatus,
                set4Files:state=>state.set4Files,                
                set4Rules:state=>state.set4Rules,                
                set4RuleStatus:state=>state.set4RuleStatus,
            }),
            fileFormat(){
                let fileFormat = this.file_type;
                let newAccept = '';
                console.log({fileFormat})
                if(!fileFormat){
                    fileFormat = null;
                    newAccept = `image/jpeg,image/png,application/pdf`
                }
                else if(fileFormat !== null){
                    if(fileFormat === 'image'){
                        newAccept = `image/jpeg,image/png`;
                    }
                    else{
                        newAccept = `image/jpeg,image/png,application/pdf`;
                    }
                    
                }
                
                return newAccept;
            }
        }
    }
</script>

<style>
    input[type="file"]{
        opacity: 0;
        width: 100%;
        height: 200px;
        position: absolute;
        cursor: pointer;
    }
    .filezone {
        outline: 2px dashed #f2f4f5;
        outline-offset: -10px;
        background: #0277bd;
        color: #f2f4f5;
        padding: 10px 10px;
        min-height: 200px;
        position: relative;
        cursor: pointer;
    }
    .filezone:hover {
        background: #30a7ee;
        color: #f2f4f5;
        font-weight:600;
        outline: 2px dashed #f2f4f5;
    }

    .filezone p {
        font-size: 1.2em;
        text-align: center;
        padding: 50px 50px 50px 50px;
    }
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
    div.success-container{
        text-align: center;
        color: green;
    }

    div.remove-container{
        text-align: center;
    }

    div.remove-container a{
        color: red;
        cursor: pointer;
    }

    a.submit-button{
        display: block;
        margin: auto;
        text-align: center;
        width: 200px;
        padding: 10px;
        text-transform: uppercase;
        background-color: #0277bd;
        color: white !important;
        font-weight: bold;
        margin-top: 20px;
    }
    a.submit-button:hover{
        display: block;
        margin: auto;
        text-align: center;
        width: 200px;
        padding: 10px;
        text-transform: uppercase;
        background-color: #0f4053;
        color: white;
        font-weight: bold;
        margin-top: 20px;
    }
</style>
