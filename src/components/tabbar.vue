<template>
    <div class="tabbarList">
        <div class="tabbarItem" v-for="(item, index) in tabbarList" :key="index" @click="goPage(item.path)">
            <img :src="currentPath == item.path ? item.activeIcon : item.icon" alt="" class="tabbarIcon" />
            <div class="abbarText">
                {{ item.text }}
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
import type { tabbarItem } from "@/types/home.d.ts";
import { useRouter, useRoute } from "vue-router";

// 1.tabList
const tabbarList = ref<tabbarItem[]>([]);
tabbarList.value = [
    {
        path: "/home",
        text: "首页",
        icon: new URL("@/assets/tabbar/home.png", import.meta.url).href,
        activeIcon: new URL("@/assets/tabbar/homeActive.png", import.meta.url).href,
    },
    {
        path: "/feed",
        text: "社区",
        icon: new URL("@/assets/tabbar/feed.png", import.meta.url).href,
        activeIcon: new URL("@/assets/tabbar/feedActive.png", import.meta.url).href,
    },
    {
        path: "/mini-game",
        text: "在线玩",
        icon: new URL("@/assets/tabbar/game.png", import.meta.url).href,
        activeIcon: new URL("@/assets/tabbar/gameActive.png", import.meta.url).href,
    },
    {
        path: "/notice",
        text: "首页",
        icon: new URL("@/assets/tabbar/notice.png", import.meta.url).href,
        activeIcon: new URL("@/assets/tabbar/noticeActive.png", import.meta.url)
            .href,
    },
    {
        path: "/user-center",
        text: "我的",
        icon: new URL("@/assets/tabbar/user.png", import.meta.url).href,
        activeIcon: new URL("@/assets/tabbar/userActive.png", import.meta.url).href,
    },
];
// 2.激活项
const router = useRouter();
const route = useRoute();
const currentPath = ref(route.path);

watch(
    () => router.currentRoute.value.path,
    (newPath) => {
        currentPath.value = newPath;
        console.log("New path:", newPath);
    }
);
// 3.跳转
const goPage=(path:string)=>{
    router.push(path)
}
</script>
<style lang="scss" scoped>
.tabbarList {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    width: 100vw;
    // height: 50px;
    background-color: #fff;
    border-top: 1px solid #ccc;
    padding-top: 2px;

    .tabbarItem {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        // justify-content: center;
        width: 86px;
        height: 50px;

        .tabbarIcon {
            display: block;
            width: 28px;
            height: 28px;
        }

        .tabbarText {
            width: 100%;
            height: 12px;
            font-size: 12px;
            text-align: center;
        }
    }
}
</style>
