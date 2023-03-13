<template>
    <v-app>
        <v-main>
            <NavBar @logout="changeLogin" :login="login"></NavBar>
            <router-view :connectionBase="connectionBase" @successLogin="setLogin"/>
        </v-main>
    </v-app>
</template>

<script>

import {defineComponent} from "vue";
import NavBar from "@/components/NavBar.vue";

export default defineComponent({
    components: {NavBar},
    data(){
        return {
            login: false,
            connectionBase: "http://localhost:8081"
        }
    },
    methods: {
        setLogin(){
            document.cookie = "login=true; expires=" + new Date(Date.now() + 29 * 60 * 1000).toUTCString() + "; path=/";
            this.changeLogin()
        },
        changeLogin(){
            this.login = !this.login;
        }
    }
})

</script>

