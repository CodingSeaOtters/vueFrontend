<template>
    <v-card title="Log In" width="400" class="pa-5 ma-auto mt-16 bg-blue-grey-darken-2">
        <v-text-field v-model="username" label="Benutzername"></v-text-field>
        <v-text-field v-model="password" type="password" label="Passwort"></v-text-field>
        <v-card-actions class="d-flex align-items-center justify-center">
            <v-btn @click="login" variant="elevated" color="warning"><b>Einsteigen</b></v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import store from "@/modules/user.store";

export default {
    name: "LogIn",
    data() {
        return {
            username: "",
            password: "",
        }
    },
    methods: {
        login() {
            if (this.username !== "" && this.password !== "") {
                const body = {
                    username: this.username,
                    password: this.password
                }
                store.dispatch("logIn", body)
            }
        },
    }
}
</script>
