import { createApp } from 'vue';
import LoadingComponent from '@/components/loading.vue';
const useLoading = () => {
    let loadingInstance: any;

    const LoadingService = {
        open(message = '加载中...') {
            // console.log('显示弹窗');
            
            if (!loadingInstance) {
                const loadingApp = createApp(LoadingComponent);
                const mountNode = document.createElement('div');
                document.body.appendChild(mountNode);
                loadingInstance = loadingApp.mount(mountNode);
            }
            loadingInstance.open(message);
        },
        close() {
            if (loadingInstance) {
            // console.log('关闭弹窗');
                loadingInstance.close();
            }
        },
    };
    return LoadingService
}
export { useLoading }