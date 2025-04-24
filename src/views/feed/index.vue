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
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <div class="articleListBox" ref="scrollableRef" @scroll="handleScroll">
            <div class="leftArticleBox">
                <div class="articleItem" v-for="(item, index) in leftArticleList" :key="item.uid">
                    <!-- 文章资源 -->
                    <div v-if="index % 2 == 0">
                        <img src="@/assets/article/goodsImage.jpg" alt="" class="articleImage" />
                    </div>
                    <div v-else>
                        <video src="@/assets/article/video.mp4" class="articleImage" controls></video>
                    </div>
                    <div class="articleInfo">
                        <!-- 文章标题 -->
                        <div class="articleName">
                            {{ item.title }}
                        </div>
                        <div class="gameName">
                            {{ item.gameCircleName }}
                        </div>
                        <div class="authorBox">
                            <div class="authorInfo">
                                <img :src="item.uportrait" alt="" class="authorImage">
                                <div class="authorName">{{ item.uname }}</div>
                            </div>
                            <div class="likeNumberBox">
                                <img src="@/assets/feed/likeIcon.png" alt="" class="likeIcon">
                                <div class="likeNumber">{{ item.likeCount }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="rightArticleBox">
                <div class="articleItem" v-for="(item, index) in rightArticleList" :key="item.uid">
                    <!-- 文章资源 -->
                    <div v-if="index % 2 == 1">
                        <img src="@/assets/article/goodsImage.jpg" alt="" class="articleImage" />
                    </div>
                    <div v-else>
                        <video src="@/assets/article/video.mp4" class="articleImage" controls></video>
                    </div>
                    <div class="articleInfo">
                        <!-- 文章标题 -->
                        <div class="articleName">
                            {{ item.title }}
                        </div>
                        <div class="gameName">
                            {{ item.gameCircleName }}
                        </div>
                        <div class="authorBox">
                            <div class="authorInfo">
                                <img :src="item.uportrait" alt="" class="authorImage">
                                <div class="authorName">{{ item.uname }}</div>
                            </div>
                            <div class="likeNumberBox">
                                <img src="@/assets/feed/likeIcon.png" alt="" class="likeIcon">
                                <div class="likeNumber">{{ item.likeCount }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </van-pull-refresh>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import type { articleItem } from "@/types/home";
import { getArticleList } from "@/api/feed";
import { showToast } from "vant";
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

// 2.文章相关
const params = ref({
    offSet: 32,
    page: 1,
});
const leftArticleList = ref<articleItem[]>([]);
const rightArticleList = ref<articleItem[]>([]);
const isFinshed = ref(false);
const loading = ref(false)
const loadList = async () => {
  
  
        const res = await getArticleList(params.value);
        //    console.log(res,'res');
        //    console.log(res.isEnd,'isEnd');
        //    console.log(res.postItems,'postItems');
        if (isFinshed.value) {
            return showToast("没有更多了");
        }
        // 游客请求，isEnd默认返回 true?????????????????????
        isFinshed.value = !res.isEnd;
        if (res.postItems.length > 0) {
            // articleList.value = [...articleList.value, ...res.postItems]
            const { left, right } = splitArrayByIndex(res.postItems);
            // console.log(left,'left');
            // console.log(right,'right');
            leftArticleList.value = [...leftArticleList.value, ...left];
            rightArticleList.value = [...rightArticleList.value, ...right];
        }
  

};

onMounted(async () => {
    loadList();
});

// 2.2 数组分割
const splitArrayByIndex = (arr: articleItem[]) => {
    const left = [];
    const right = [];

    for (let i = 0; i < arr.length; i++) {
        if (i % 2 === 1) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return {
        left: left,
        right: right,
    };
};
// 2.3 滚动到底部
const scrollableRef = ref(null);

const handleScroll =async () => {
    const scrollableBox: any = scrollableRef.value;
    if (scrollableBox) {
        const scrollTop = scrollableBox.scrollTop;
        const clientHeight = scrollableBox.clientHeight;
        const scrollHeight = scrollableBox.scrollHeight;

        if (scrollTop + clientHeight >= scrollHeight) {
            console.log('盒子已滚动到底部');
            if(loading.value) {
                return
            }
            loading.value=true
            params.value.page++
            await loadList()
            loading.value=false
        }
    }
};
// 2.4 刷新
const  refreshing=ref(false) 
const onRefresh=async ()=>{
    console.log('刷新');
    leftArticleList.value=[]
    rightArticleList.value=[]
    params.value.page=1
    await loadList()
    refreshing.value=false
    
}
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

    .articleListBox {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: calc(100vh - 103px);
        // background-color: pink;
        overflow: auto;

        .leftArticleBox,
        .rightArticleBox {
            width: 180px;
            height: 100%;

            // background-color: pink;

            .articleItem {
                width: 180px;
                background-color: #fff;
                border-radius: 20px;
                overflow: hidden;
                margin-bottom: 10px;
                padding-bottom: 20px;

                .articleImage {
                    width: 180px;
                }

                .articleInfo {
                    display: flex;
                    flex-direction: column;
                    width: 180px;
                    padding: 0px 10px;
                    box-sizing: border-box;

                    .articleName {
                        font-size: 12px;
                        margin-top: 5px;
                        word-break: break-all;
                    }

                    .gameName {
                        width: 100%;
                        font-size: 10px;
                        color: #ccc;
                        margin-top: 5px;
                        word-break: break-all;
                    }

                    .authorBox {
                        display: flex;
                        justify-content: space-between;
                        width: 100%;
                        height: 20px;
                        margin-top: 5px;

                        .authorInfo {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            width: 100px;
                            height: 20px;

                            .authorImage {
                                display: block;
                                width: 20px;
                                height: 20px;
                                border-radius: 10px;
                            }

                            .authorName {
                                width: 70px;
                                font-size: 12px;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;

                            }
                        }

                        .likeNumberBox {
                            display: flex;
                            justify-content: space-between;
                            align-items: flex-end;
                            width: 50px;
                            height: 20px;

                            .likeIcon {
                                display: block;
                                width: 20px;
                                height: 20px;

                            }

                            .likeNumber {
                                font-size: 12px;

                            }
                        }
                    }
                }
            }

        }

        // background-color: pink;
    }
}
</style>
