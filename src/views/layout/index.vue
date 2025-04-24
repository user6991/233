<template>
    <div class="home-page">
        <div class="appMain">
            <RouterView></RouterView>
        </div>
       
        <tabbar></tabbar>
    </div>
</template>
<script lang="ts" setup>
import tabbar from '@/components/tabbar.vue'
</script>
<style lang="scss" scoped>
.home-page {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    padding-top: env(safe-area-inset-top);
    padding-bottom: calc(53px + env(safe-area-inset-bottom));
    box-sizing: border-box;
    .appMain {
        width: 100%;
        flex: 1;
    }
}
</style>