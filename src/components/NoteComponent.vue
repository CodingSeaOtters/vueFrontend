<template>
    <v-card :text="content" :title="title" width="300" class="pa-5 ma-auto mt-16 bg-blue-grey-darken-2">
    </v-card>
</template>

<script>
import axios from "axios";

export default {
    name: "NoteComponent",
    props: ["connectionBase", "id"],
    data() {
        return {
            title: "",
            content: "",
        }
    },
    created() {
        this.getNote()
    },
    methods: {
        getNote() {
            axios.get(this.connectionBase + "/note/" + this.id, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("JWT")
                }
            })
                .then(response => {
                    if(response.status  === 200){
                        this.title = response.data.title;
                        this.content = response.data.content;
                    }
                })
        }
    }
}
</script>

<style scoped>

</style>