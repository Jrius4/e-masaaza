<template>
  <div>
      <transition
        enter-active-class="animated fadeIn quick"
        leave-active-class="animated fadeOut quick" mode="out-in"
        appear  appear-active-class="animated zoomIn quick"
        >
            <router-view/>
        </transition>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
