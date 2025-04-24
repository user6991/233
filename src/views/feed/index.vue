<template>
    <div class="container">
        <!-- 自定义导航栏 -->
        <div class="customizeNavigationBar">
            <div class="tabListBox">
                <div class="tabItem" v-for="(item, index) in tabList"
                    :class="currentTabIndex == index ? 'activeTabItem' : ''" @click="changeTab(index)">
                    {{ item.text }}
                </div>
            </div>
            <div class="toolList">
                <img src="@/assets/feed/searchIcon.png" alt="" class="toolItem" />
                <img src="@/assets/feed/messageIcon.png" alt="" class="toolItem" />
            </div>
        </div>
        <div class="articleList"></div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
// 1.tab页签
const tabList = ref([] as any);
tabList.value = [
    {
        text: "发现",
        type: 1,
    },
    {
        text: "游戏圈",
        type: 2,
    },
    {
        text: "校园模拟器",
        type: 3,
    },
];
const currentTabIndex = ref(0);
// 1.2 页签切换
const changeTab = (index: number) => {
    currentTabIndex.value = index;
};
</script>
<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 0px 5px;
    box-sizing: border-box;
    background-color: #f7f6f4;

    // background-color: pink;
    .customizeNavigationBar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 20px;
        margin: 15px 0px;
        padding: 0px 10px;
        box-sizing: border-box;

        // background-color: pink;
        .tabListBox {
            display: flex;
            align-items: center;
            width: 200px;
            height: 50px;

            .tabItem {
                font-size: 12px;
                margin-right: 10px;
            }

            & .tabItem:last-child {
                margin-right: 0px;
            }

            .activeTabItem {
                font-size: 15px;
                font-weight: 700;
            }
        }

        .toolList {
            display: flex;
            justify-content: space-between;
            width: 50px;
            height: 20px;

            // background-color: pink;
            .toolItem {
                display: block;
                height: 20px;
            }
        }
    }

    .articleList {
        width: 100%;
        flex: 1;
        // background-color: pink;
    }
}
</style>
