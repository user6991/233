// 路由配置
const routes = [
  {
    path: "/",
    component: () => import("@/views/layout/index.vue"),
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "首页",
        },
      },
      {
        path: "/feed",
        component: () => import("@/views/feed/index.vue"),
        meta: {
          title: "社区",
        },
      },
      {
        path: "/mini-game",
        component: () => import("@/views/mini-game/index.vue"),
        meta: {
          title: "在线玩",
        },
      },
      {
        path: "/notice",
        component: () => import("@/views/notice/index.vue"),
        meta: {
          title: "消息中心",
        },
      },
      {
        path: "/user-center",
        component: () => import("@/views/user-center/index.vue"),
        meta: {
          title: "用户中心",
        },
      },
    ],
  },
];
export default routes;
