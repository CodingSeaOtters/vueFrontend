<template>

  <div class="d-flex justify-space-between align-center px-2">
    <h1>Notes</h1>
    <div>
      <v-btn @click="dialog = true" variant="elevated" color="warning" class="mr-2"><b>+</b></v-btn>
      <v-btn v-if="filter" @click="filter = false" variant="elevated" color="warning" class="mr-2"><b>Filter entfernen</b></v-btn>
      <v-btn @click="filterForExpired" variant="elevated" color="warning" class="mr-2"><b>Nur Abgelaufene</b></v-btn>
      <v-btn @click="filterForUnexpired" variant="elevated" color="warning" class="mr-2"><b>Nur Gültige</b></v-btn>
    </div>
  </div>

<!--  region Note Lists-->

  <div  v-if="!filter" class="d-flex flex-wrap justify-space-evenly">
    <div v-for="(note,index) in notes" :key="index">
      <NoteComponent :data="note"/>
    </div>
  </div>

  <div  v-if="filter && expired" class="d-flex flex-wrap justify-space-evenly">
    <div v-for="(note,index) in expiredNotes" :key="index">
      <NoteComponent :data="note"/>
    </div>
  </div>

  <div  v-if="filter && !expired" class="d-flex flex-wrap justify-space-evenly">
    <div v-for="(note,index) in notExpiredNotes" :key="index">
      <NoteComponent :data="note"/>
    </div>
  </div>

  <!--  endregion-->

  <!--    Dialog Start-->
  <v-dialog v-model="dialog" width="auto">
    <v-card title="Neue Notiz erstellen" width="400" class="pa-5 ma-auto mt-16 bg-blue-grey-darken-2">
      <v-text-field v-model="newNote.title" label="Titel"></v-text-field>
      <v-text-field v-model="newNote.content" label="Notiz"></v-text-field>
      <div class="d-flex justify-space-between text-white">
        <div>
          <label for="startDate">Starttag</label>
          <input type="date" class="text-white bg-blue-grey-darken-1 border-b pa-2 rounded-t" name="startDate"
                 v-model="newNote.startDate"/>
        </div>
        <div>
          <label for="endDate">Starttag</label>
          <input type="date" class="text-white bg-blue-grey-darken-1 border-b pa-2 rounded-t" name="endDate"
                 v-model="newNote.endDate"/>
        </div>
      </div>
      <v-card-actions class="d-flex justify-end">
        <v-btn @click="createNote" variant="elevated" color="warning">Erstellen</v-btn>
        <v-btn @click="cancel" variant="elevated" color="secondary">Abbrechen</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import NoteComponent from "@/components/NoteComponent.vue";
import {mapGetters, mapState} from "vuex";
import store from "@/modules/user.store";


export default {
  name: "ShowNotes",
  components: {NoteComponent},
  computed: {
    ...mapState({
      notes: "notesOfBoard",
    }),
    ...mapGetters(["getOnlyExpired", "getNotExpired"]),
    expiredNotes() {
      return this.getOnlyExpired;
    },
    notExpiredNotes(){
      return this.getNotExpired;
    }
  },
  data() {
    return {
      dialog: false,
      filter: false,
      expired: true,
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
          startDate: this.newNote.startDate,
          endDate: this.newNote.endDate,
        }
        store.dispatch("createNote", body)
        this.cancel();

      }
    },
    cancel() {
      this.dialog = false;
      this.newNote.content = "";
      this.newNote.title = "";
    },
    filterForExpired(){
      this.expired = true;
      this.filter = true;
    },
    filterForUnexpired(){
      this.expired = false;
      this.filter = true;
    }
  }
}
</script>

