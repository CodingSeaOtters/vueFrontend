<template>

    <div class="d-flex justify-space-between align-center px-2">
        <h1>Notes</h1>
        <v-btn @click="dialog = true" variant="elevated" color="warning"><b>+</b></v-btn>
    </div>
    <div class="d-flex flex-wrap justify-space-evenly">
        <div v-for="(note,index) in notes" :key="index">
            <NoteComponent :data="note"/>
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
import NoteComponent from "@/components/NoteComponent.vue";
import {mapState} from "vuex";
import store from "@/modules/user.store";


export default {
    name: "ShowNotes",
    components: {NoteComponent},
    computed: {
        ...mapState({
            notes: "notesOfBoard",
        })
    },
    data() {
        return {
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

    methods: {
        createNote() {
            if (this.newNote.title !== "" && this.newNote.content !== "") {
                const body = {
                    title: this.newNote.title,
                    content: this.newNote.content,
                    title_image_path: this.newNote.title_image_path,
                    startDate:"2023-01-12",
                    endDate: "2023-01-12",
                }
                store.dispatch("createNote", body)
                this.cancel();

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

