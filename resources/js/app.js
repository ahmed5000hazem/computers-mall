require('./bootstrap');

import * as Vue from 'vue'
import router from './router'
import AppComponent from './views/App'

import {store} from './store/index'
import axios from 'axios';
import ENV from './ENV';
import middlewarePipeline from './router/middlewarePipeLine';

router.beforeEach((to, from, next) => {
    if (!to.meta.middleware) {
        return next()
    }
    const middleware = to.meta.middleware

    const context = {
        to,
        from,
        next,
        store
    }
    return middleware[0]({
        ...context,
        next: middlewarePipeline(context, middleware, 1)
    })
})


const App = Vue.createApp({
    components:{
        AppComponent
    },
    methods: {
        initUser(){
            axios.get(`${ENV.BASE_URL}user`)
            .then(response => response.data)
            .then(response => {
                store.commit("initUser", response)
            })
            .catch(err => console.log(err))
        }
    },
    mounted(){
        this.initUser()
    }
});

App.use(router)
App.use(store)
App.mount('#app')