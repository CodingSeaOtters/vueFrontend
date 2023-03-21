<template>
  <v-card width="300" class="pa-5 ma-auto mt-16 bg-blue-grey-darken-2"
          :style="data.isExpired ? 'border: 2px solid red;' : 'border:none;'">
    <div class="d-flex justify-space-between">
      <v-card-title>{{ data.title }}</v-card-title>
      <v-btn class="text-right" icon="mdi-Cog" variant="elevated" color="warning">
        <v-menu activator="parent">
          <v-list-item class="bg-blue-grey">
            <v-card class="bg-blue-grey" @click="changeDialog">Bearbeiten</v-card>
          </v-list-item>
          <v-list-item class="bg-blue-grey">
            <v-card class="bg-blue-grey" @click="deleteNote">Löschen</v-card>
          </v-list-item>
        </v-menu>
        <b>...</b>
      </v-btn>
    </div>
    <v-card-text class="mt-5">{{ data.content }}</v-card-text>
    <div class="d-flex justify-space-between mt-8">
      <div class="d-flex flex-column ">
        <p class="text-subtitle-2">Starttag</p>
        <p>{{ data.startDate }}</p>
      </div>
      <div class="d-flex flex-column">
        <p class="text-subtitle-2">Endtag</p>
        <p>{{ data.endDate }}</p>
      </div>
    </div>
  </v-card>

  <v-dialog v-model="dialog" width="auto">
    <v-card title="Notiz bearbeiten" width="400" class="pa-5 ma-auto mt-16 bg-blue-grey-darken-2">
      <v-text-field v-model="modifiedNote.title" label="Titel"></v-text-field>
      <v-text-field v-model="modifiedNote.content" label="Notiz"></v-text-field>
      <div class="d-flex justify-space-between text-white">
        <div>
          <label for="startDate">Starttag</label>
          <input type="date" class="text-white bg-blue-grey-darken-1 border-b pa-2 rounded-t" name="startDate"
                 v-model="modifiedNote.startDate"/>
        </div>
        <div>
          <label for="endDate">Starttag</label>
          <input type="date" class="text-white bg-blue-grey-darken-1 border-b pa-2 rounded-t" name="endDate"
                 v-model="modifiedNote.endDate"/>
        </div>
      </div>
      <v-card-actions class="d-flex justify-end">
        <v-btn @click="modifyNote" variant="elevated" color="warning">Bearbeiten</v-btn>
        <v-btn @click="cancel" variant="elevated" color="secondary">Abbrechen</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import store from "@/modules/user.store";

export default {
  name: "NoteComponent",
  props: ["data"],
  data() {
    return {
      dialog: false,
      modifiedNote: {
        title: this.data.title,
        content: this.data.content,
        startDate: this.data.startDate,
        endDate: this.data.endDate,
      }
    }
  },
  computed: {

  },
  methods: {
    cancel() {
      this.modifiedNote.title = this.data.title;
      this.modifiedNote.content = this.data.content;
      this.changeDialog();
    },
    changeDialog() {
      this.dialog = !this.dialog;
    },
    deleteNote() {
      store.dispatch("deleteNote", this.data.id)
    },
    modifyNote() {
      if (this.modifiedNote.title !== this.data.title || this.modifiedNote.content !== this.data.content ||
          this.modifiedNote.startDate !== this.data.startDate || this.modifiedNote.endDate !== this.data.endDate) {
        const exchangeObject = {
          id: this.data.id,
          body: {
            title: this.modifiedNote.title,
            content: this.modifiedNote.content,
            title_image_path: "",
            startDate: this.modifiedNote.startDate,
            endDate: this.modifiedNote.endDate,

          }
        }
        store.dispatch("modifyNote", exchangeObject);
        this.cancel()
      }
    }
  }

}
</script>

<style scoped>

</style>