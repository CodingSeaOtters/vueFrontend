<template>
  <v-card width="300" class="pa-5 ma-auto mt-16 bg-blue-grey-darken-2">
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
    <v-card-text>{{ data.content }}</v-card-text>
  </v-card>

  <v-dialog v-model="dialog" width="auto">
    <v-card title="Notiz bearbeiten" width="400" class="pa-5 ma-auto mt-16 bg-blue-grey-darken-2">
      <v-text-field v-model="modifiedNode.title" label="Titel"></v-text-field>
      <v-text-field v-model="modifiedNode.content" label="Notiz"></v-text-field>
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
      modifiedNode: {
        title: this.data.title,
        content: this.data.content,
      }
    }
  },
  methods: {
    cancel() {
      this.modifiedNode.title = this.data.title;
      this.modifiedNode.content = this.data.content;
      this.changeDialog();
    },
    changeDialog() {
      this.dialog = !this.dialog;
    },
    deleteNote() {
      store.dispatch("deleteNote", this.data.id)
    },
    modifyNote() {
      if (this.modifiedNode.title !== this.data.title || this.modifiedNode.content !== this.data.content) {
        const exchangeObject = {
          id: this.data.id,
          body: {
            title: this.modifiedNode.title,
            content: this.modifiedNode.content,
            title_image_path: "",
            startDate: "2023-01-12",
            endDate: "2023-01-12",

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