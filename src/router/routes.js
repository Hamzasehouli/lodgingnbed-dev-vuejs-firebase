export default [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      title: "Home Page - lodingnbed",
    },
  },
  {
    path: "/policy",
    name: "Policy",
    component: () => import("../views/Policy.vue"),
    meta: {
      title: "Policy",
    },
  },
  {
    path: "/hotels/:city/:country/:checkIn/:checkOut/:rooms/:adults/:children/:sorting/:page/:currency",
    name: "Hotels",
    props: true,
    component: () => import("../views/Hotels.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
    meta: {
      title: "About",
    },
  },

  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
  {
    path: "/:notFound(.*)",
    name: "notFound",
    component: () => import("../views/NotFound.vue"),
  },
];
