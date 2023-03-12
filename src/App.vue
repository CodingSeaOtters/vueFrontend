<template>
    <v-app>
        <v-main>
            <NavBar :login="login"></NavBar>
            <router-view @successLogin="changeLogin"/>
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
        }
    },
    methods: {
        changeLogin(){
            this.login = !this.login;
        }
    }
})

</script>

<style>

</style>
