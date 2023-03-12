<template>
    <v-card title="Log In" width="400" class="pa-5 ma-auto mt-16 bg-blue-grey-darken-2">
        <v-text-field  label="Benutzername"></v-text-field>
        <v-text-field label="Passwort"></v-text-field>
        <v-card-actions class="d-flex align-items-center justify-center">
            <v-btn variant="elevated" color="warning"><b>Einsteigen</b></v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: "LogIn",
    data(){
        return {
            userName: "",
            password: "",
        }
    }

}
</script>

<style scoped>

</style>