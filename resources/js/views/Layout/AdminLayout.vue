<template>
    <div class="wrapper">
        <admin-nav/>
        <admin-sidebar/>
        <admin-content/>
        <admin-controlbar/>
        <admin-footer/>
    </div>
</template>

<script>
import AdminNav from "./AdminNav";
import AdminSidebar from "./AdminSidebar";
import AdminContent from "./AdminContent";
import AdminControlbar from "./AdminControlbar";
import AdminFooter from "./AdminFooter";
export default {
    props:['user'],
    components:{AdminNav,AdminSidebar,AdminContent,AdminControlbar,AdminFooter},

}
</script>

<style lang="scss" scoped>

</style>
