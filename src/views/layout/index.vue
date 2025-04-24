<template>
    <div class="home-page">
        <RouterView></RouterView>
        <tabbar></tabbar>
    </div>
</template>
<script lang="ts" setup>
import tabbar from '@/components/tabbar.vue'
</script>
<style lang="scss" scoped>
.home-page {
    width: 100vw;
    height: 100vh;
}
</style>