<template>
    <v-card variant="tonal" title="Registrieren" width="400" class="pa-5 ma-auto mt-16 bg-blue-grey-darken-2">
        <v-text-field type="text" v-model="username" label="Benutzername"></v-text-field>
        <v-text-field type='password' v-model="password" label="Passwort"></v-text-field>
        <v-text-field type="password" v-model="passwordRepeat" label="Passwort wiederholen"></v-text-field>
        <v-card-actions class="d-flex align-items-center justify-center">
            <v-btn @click="registrationInDatabase" variant="elevated" color="warning"><b>Registrieren</b></v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>

import axios from "axios";

export default {
    name: "RegistrationComponent",
    data() {
        return {
            username : "",
            password : "",
            passwordRepeat: ""
        }
    },
    methods: {
       registrationInDatabase(){
           if(this.username !== "" && this.password !== "" && this.passwordRepeat !== ""){
               if(this.passwordRepeat === this.password){
                   const data = {
                       username: this.username,
                       password: this.password
                   }

                   axios.post('http://localhost:8081/user', data)
                       .then(response => {
                       if(response.status === 201){
                           this.username = "";
                           this.password = "";
                           this.passwordRepeat = "";
                           this.$router.push("/");
                       }
                       })
                       .catch(e => {
                           console.log(e)
                       })
               }
           }
       }
    }
}
</script>

