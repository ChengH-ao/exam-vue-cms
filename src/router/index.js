import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children:[
      {
        path: 'Question',
        name: 'Question',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "Question" */ '../views/QuestionView.vue')
      },
      {
        path: '/htmlQuestion',
        name: 'htmlQuestion',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "htmlQuestion" */ '../views/htmlView.vue')
      },
      {
        path: '/jsQuestion',
        name: 'jsQuestion',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "jsQuestion" */ '../views/jsView.vue')
      },
      {
        path: '/cssQuestion',
        name: 'cssQuestion',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "cssQuestion" */ '../views/cssView.vue')
      },
      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
      },
      {
        path: '/match',
        name: 'match',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "match" */ '../views/MatchView.vue')
      },
      {
        path: '/signup',
        name: 'signup',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "signup" */ '../views/SignupView.vue')
      },{
        path: '/exercise',
        name: 'exercise',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "exercise" */ '../views/ExerciseView.vue')
      },{
        path: '/calendar',
        name: 'calendar',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "calendar" */ '../views/CalendarView.vue')
      },{
        path: '/material',
        name: 'material',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "material" */ '../views/MaterialView.vue')
      },{
        path: '/CreateAtask',
        name: 'CreateAtask',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "CreateAtask" */ '../views/CreateView.vue')
      },{
        path: '/information',
        name: 'information',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "information" */ '../views/InformationView.vue')
      },{
        path: '/management',
        name: 'management',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "management" */ '../views/RoleMessageView.vue')
      },{
        path: '/userlist',
        name: 'userlist',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "userlist" */ '../views/UserlistView.vue')
      },{
        path: '/Details',
        name: 'Details',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "Details" */ '../views/DetailsListView.vue')
      },{
        path: '/CreatingaRole',
        name: 'CreatingaRole',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "CreatingaRole" */ '../views/CreatingView.vue')
      },{
        path: '/FatherAndSon',
        name: 'FatherAndSon',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "FatherAndSon" */ '../views/fuziGroupView.vue')
      },
      
    ]
  },
 
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "register" */ '../views/RegisterView.vue')
  },
  
]

const router = new VueRouter({
  routes
})

export default router
