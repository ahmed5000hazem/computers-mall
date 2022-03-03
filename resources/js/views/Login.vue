<template>
    <h3 class="text-center fs-1 my-5">Login</h3>
    <div class="row justify-content-center">
        <div class="col-md-4">
            <form @submit.prevent="login">
                <div class="mb-4">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" v-model="form.email" id="exampleInputEmail1" aria-describedby="emailHelp">
                </div>
                <div class="mb-4">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" v-model="form.password" id="exampleInputPassword1">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</template>
<script>
import * as AuthServices from '../services/AuthService'
import {store} from '../store/'
export default {
    data() {
        return {
            form:{
                email:"",
                password:"",
            }
        }
    },
    methods:{
        login(){
            let result = AuthServices.login(this.form)
            
            result.then(response => response.data)
            .then(response => {
                this.$router.push("/")
            })
            .catch(err => console.log(err))
        }
    }
}
</script>
<style lang="scss" scoped>

</style>