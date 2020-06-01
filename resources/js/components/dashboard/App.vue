<template>
  <app-layout></app-layout>
</template>

<script>
  export default {
    name: 'App',
    components:{
      AppLayout:()=>import('./layouts/MainLayout.vue')
    //   AppLayout:()=>import('./layouts/AppLayout.vue')
    }
  }
</script>
