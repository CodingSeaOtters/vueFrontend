<template>
    <div class="pa-5 bg-blue-grey">
        <div class="d-flex justify-space-between" v-if="!login">
            <h1>Taskmaster</h1>
            <router-link v-if="!containsRegistration" to="/registration">
                <v-btn color="warning"><b>Registrieren</b></v-btn>
            </router-link>
            <router-link v-if="containsRegistration" to="/">
                <v-btn color="warning"><b>Login</b></v-btn>
            </router-link>
        </div>
        <div class="d-flex justify-space-between" v-else>
            <h1>Willkommen, {{ username }}!</h1>
            <v-btn @click="logout" color="warning" variant="elevated">LogOut</v-btn>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex";
import router from "@/router";

export default {
    name: "NavBar",
    computed: {
        ...mapState({
            username: "username",
            login: "loggedIn",
        }),
        containsRegistration() {
            return this.$route.path.includes("registration");
        },
    },
    methods: {
        logout() {
            this.store.dispatch("changeLoggedIn");
            router.push("/");

        }
    },
    mounted() {
        console.log(this.login)
    }
}
</script>
