<template>
    <div v-if="visible">
        <div class="load"  >
            <!-- 中间的图案动效加载 -->
            <div class="sk-chase">
                <div class="sk-chase-dot" v-for="(item, key) in 6" :key="key"></div>
            </div>
            <!-- 文字加载 -->
            <span>{{ message }}</span>
        </div>
        <!-- 全屏遮罩层 -->
        <div class="full-screen"></div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const visible = ref(false);
const message = ref("");

const open = (msg:any) => {
    message.value = msg;
    visible.value = true;
};

const close = () => {
    visible.value = false;
};

defineExpose({
    open,
    close,
})
</script>

<style scoped="scoped" lang="scss">
.full-screen {
    position: fixed;
    overflow: hidden;
    left: 0;
    top: 0;
    background: rgba(255, 255, 255, 0.3);
    width: 100%;
    height: 100%;
    z-index: 99999999;
}

.load {
    color: #dfdfdf;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120px;
    height: 120px;
    border-radius: 8px;
    background: rgba(74, 74, 74, 0.9);
    z-index: 999999992;

    span {
        position: absolute;
        bottom: 15%;
        left: 25%;
    }
}

.sk-chase {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 20px;
    left: 35%;
    animation: sk-chase 2.5s infinite linear both;
}

.sk-chase-dot {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    animation: sk-chase-dot 2s infinite ease-in-out both;
}

.sk-chase-dot:before {
    content: "";
    display: block;
    width: 25%;
    height: 25%;
    background-color: #dfdfdf;
    border-radius: 100%;
    animation: sk-chase-dot-before 2s infinite ease-in-out both;
}

.sk-chase-dot:nth-child(1) {
    animation-delay: -1.1s;
}

.sk-chase-dot:nth-child(2) {
    animation-delay: -1s;
}

.sk-chase-dot:nth-child(3) {
    animation-delay: -0.9s;
}

.sk-chase-dot:nth-child(4) {
    animation-delay: -0.8s;
}

.sk-chase-dot:nth-child(5) {
    animation-delay: -0.7s;
}

.sk-chase-dot:nth-child(6) {
    animation-delay: -0.6s;
}

.sk-chase-dot:nth-child(1):before {
    animation-delay: -1.1s;
}

.sk-chase-dot:nth-child(2):before {
    animation-delay: -1s;
}

.sk-chase-dot:nth-child(3):before {
    animation-delay: -0.9s;
}

.sk-chase-dot:nth-child(4):before {
    animation-delay: -0.8s;
}

.sk-chase-dot:nth-child(5):before {
    animation-delay: -0.7s;
}

.sk-chase-dot:nth-child(6):before {
    animation-delay: -0.6s;
}

@keyframes sk-chase {
    100% {
        transform: rotate(360deg);
    }
}

@keyframes sk-chase-dot {

    80%,
    100% {
        transform: rotate(360deg);
    }
}

@keyframes sk-chase-dot-before {
    50% {
        transform: scale(0.4);
    }

    100%,
    0% {
        transform: scale(1);
    }
}
</style>