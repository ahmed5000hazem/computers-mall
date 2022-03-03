import vue from 'vue'
import {store} from '../store'

import {createRouter, createWebHistory, RouterView, RouterLink } from 'vue-router'
import Home from '../views/Home'
import Login from '../views/Login'
import Profile from '../views/Profile'
import SignUp from '../views/SignUp'

import guest from '../middleware/guest'
import auth from '../middleware/auth'

const History = new createWebHistory()



const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta:{
            middleware:[guest]
        }
    },
    {
        path: '/sign-up',
        name: 'SignUp',
        component: SignUp,
        meta:{
            middleware:[guest]
        }
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
        meta:{
            middleware:[auth]
        }
    },
    {
        path: '/logout',
        meta:{
            middleware:[auth]
        },
        
    }
]



export default new createRouter({
    history: History,
    routes
})