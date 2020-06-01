<template>
    <div class="card">
        <div class="card-header">User Information</div>
        <div class="card-body">
            <div class="alert alert-success" role="alert">
                {{name}}
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                name:''
            }
        },
       async mounted(){
            axios.get('/api/users').then((result) => {
                this.name = result.data.name
                console.log(result.data)
            }).catch((err) => {
                console.log(err)
            });
            // this.name = "Julius Junior"
        }
    }

</script>
