<template>
    <div class="pa-5 bg-blue-grey">
        <div class="d-flex justify-space-between" v-if="!login">
            <h1>Taskmaster</h1>
            <router-link v-if="!containsRegistration" to="/registration">
                <v-btn color="warning"><b>Registrieren</b></v-btn>
            </router-link>
            <router-link v-if="containsRegistration" to="/">
                <v-btn color="warning" ><b>Login</b></v-btn>
            </router-link>
        </div>
        <div class="d-flex justify-space-between" v-else>
            <h1>Willkommen</h1>
            <v-btn @click="logout" color="warning" variant="elevated">LogOut</v-btn>
        </div>
    </div>
</template>

<script>

export default {
    name: "NavBar",
    props: ["login"],
    computed: {
        containsRegistration() {
            return this.$route.path.includes("registration")
        },
    },
    methods: {
        logout(){
            document.cookie = "login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            localStorage.removeItem("JWT");
            window.location.reload();
             this.$router.push("/")
            this.$emit("logout")
        }
    }
}
</script>
