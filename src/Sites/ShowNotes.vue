<template>

    <div class="d-flex justify-space-between align-center px-2">
        <h1>Notes</h1>
        <v-btn @click="dialog = true" variant="elevated" color="warning"><b>+</b></v-btn>
    </div>
    <div class="d-flex justify-space-evenly">
        <div v-for="(noteId,index) in noteIds" :key="index">
            <NoteComponent :connection-base="connectionBase" :id="noteId"/>
        </div>
        <v-dialog v-model="dialog" width="auto">
            <v-card title="Neue Notiz erstellen" width="400" class="pa-5 ma-auto mt-16 bg-blue-grey-darken-2">
                <v-text-field v-model="newNote.title" label="Titel"></v-text-field>
                <v-text-field v-model="newNote.content" label="Notiz"></v-text-field>
                <v-card-actions class="d-flex justify-end">
                    <v-btn @click="createNote" variant="elevated" color="warning">Erstellen</v-btn>
                    <v-btn @click="cancel" variant="elevated" color="secondary">Abbrechen</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import axios from "axios";
import NoteComponent from "@/components/NoteComponent.vue";
export default {
    name: "ShowNotes",
    components: {NoteComponent},
    props: ["connectionBase"],
    data() {
        return {
            noteIds: [],
            boardId: this.$route.params.id,
            dialog: false,
            newNote: {
                title: "",
                content: "",
                title_image_path: "",
                startDate: "",
                endDate: "",
            }
        }
    },
    created() {
        if (!document.cookie.split(';').some((item) => item.trim().startsWith('login='))) {
            this.$router.push('/');
        }
        this.getAllNotes()
    },
    methods: {
        getAllNotes() {
            axios.get(this.connectionBase + "/board/note/" + this.boardId, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("JWT")
                }
            })
                .then(response => {
                    if (response.status === 200) {
                        this.noteIds = response.data;
                    }
                })
                .catch(e => console.log(e))

        },
        createNote() {
            if (this.newNote.title !== "" && this.newNote.content !== "") {
                const body = {
                    title: this.newNote.title,
                    content: this.newNote.content,
                    title_image_path: this.newNote.title_image_path,
                    startDate: this.newNote.startDate,
                    endDate: this.newNote.endDate,
                }

                axios.post(this.connectionBase + "/note/" + this.boardId, body, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("JWT")
                    }
                })
                    .then(response => {
                        if (response.status === 200) {
                            this.cancel();
                            this.getAllNotes();
                        }
                    })
            }
        },
        cancel() {
            this.dialog = false;
            this.newNote.content = "";
            this.newNote.title = "";
        }
    }
}
</script>

