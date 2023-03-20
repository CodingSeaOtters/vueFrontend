<template>
  <v-card @click="showBoard" class="d-flex justify-space-between pa-3 my-2 bg-blue-grey-darken-3">
    {{ board.boardName }}

    <v-btn class="justiy-self-end" color="warning" variant="elevated">
      <v-menu activator="parent">
        <v-list>
          <v-list-item>
            <v-card @click="changeDialog">Bearbeiten</v-card>
          </v-list-item>
          <v-list-item>
            <v-card @click="deleteBoard">Löschen</v-card>
          </v-list-item>

        </v-list>
      </v-menu>
      <b>...</b></v-btn>
  </v-card>

  <v-dialog v-model="dialog" width="auto">
    <v-card title="Neue Notiz erstellen" width="400" class="pa-5 ma-auto mt-16 bg-blue-grey-darken-2">
      <v-text-field v-model="newName" label="Notiz"></v-text-field>
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
  name: "BoardComponent",
  props: ["board"],
  data() {
    return {
      dialog: false,
      newName: "",
    }
  },
  methods: {
    changeDialog() {
      this.dialog = !this.dialog;
    },
    cancel() {
      this.newName = "";
      this.changeDialog();
    },
    modifyNote() {
      const exchangeObject = {
        boardId: this.board.boardId,
        body: {
          boardName: this.newName
        }
      }
      store.dispatch("modifyNote", exchangeObject);
      this.cancel();
    },
    showBoard() {
      store.dispatch("showBoard", this.board.boardId);
    },
    deleteBoard() {
      store.dispatch("deleteBoard", this.board.boardId);
    },
  }
}
</script>
