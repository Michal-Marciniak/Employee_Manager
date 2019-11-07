import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import EditEmployee from '@/components/EditEmployee'
import NewEmployee from '@/components/NewEmployee'
import ViewEmployee from '@/components/ViewEmployee'
import AboutMe from '@/components/AboutMe'
import Login from '@/components/Login'
import Register from '@/components/Register'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      // home page
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    { 
      // dodaj nowego użytkownika
      path: '/new',
      // name - nazwa komponentu
      name: 'new-employee',
      component: NewEmployee,
      meta: {
        requiresAuth: true
      }
    },
    {    
      // edytuj dane pracownika
      path: '/edit/:employee_id',
      name: 'edit-employee',
      component: EditEmployee,
      meta: {
        requiresAuth: true
      }
    },
    {
      // zobacz dane pracownika
      path: '/:employee_id',
      name: 'view-employee',
      component: ViewEmployee,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/aboutme',
      name: 'about-me',
      component: AboutMe,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(!firebase.auth().currentUser) {
      next({
        path: '/login',
        query: { 
          redirected: to.fullPath
        }
      });
    } else {
      next();
    } 
    } else if(to.matched.some(record => record.meta.requiresGuest)) {
      if(firebase.auth().currentUser) {
      next({
        path: '/',
      });
    } else {
      next();
    }
    } else {
      next();
    }
});

export default router;