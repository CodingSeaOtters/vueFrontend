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
import axios from "axios";

export default {
    name: "LogIn",
    props:["connectionBase"],
    data() {
        return {
            username: "",
            password: "",
            userId: 0,
        }
    },
    methods: {
        login() {
            if (this.username !== "" && this.password !== "") {
                const body = {
                    username: this.username,
                    password: this.password
                }

                axios.post(this.connectionBase + '/auth/login', body)
                    .then(response => {
                        if (response.status === 202) {
                            localStorage.setItem("JWT", response.data);
                            this.getUser()
                                .then(() => {
                                    this.$emit("successLogin")
                                    this.$router.push("/boards/" + this.userId)
                                });
                        }
                    })
                    .catch(e => console.log(e))
            }
        },
        getUser() {
            return new Promise((resolve, reject) => {
                axios.get( this.connectionBase + '/user/find/' + this.username, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("JWT")
                    }
                })
                    .then(response => {
                        if (response.status === 200) {
                            this.userId = response.data.id;
                            resolve();
                        }
                    })
                    .catch(error => reject(error))
            })
        }
    }
}
</script>
