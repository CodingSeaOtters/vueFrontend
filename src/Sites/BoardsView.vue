<template>
  <v-card
    title="Boards"
    width="600"
    class="pa-5 ma-auto mt-16 bg-blue-grey-darken-2"
  >
    <div v-for="(board, index) in boards" :key="index">
      <BoardComponent :board="board" />
    </div>
    <v-text-field
      v-model="newBoard"
      type="text"
      label="Neues Board"
    ></v-text-field>
    <v-card-actions class="d-flex align-items-center justify-center">
      <v-btn @click="createBoard" variant="elevated" color="warning"
        ><b>Erstellen</b></v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import BoardComponent from "@/components/Board.vue";
import { mapState } from "vuex";
import store from "@/modules/user.store";

export default {
  name: "BoardsView",
  components: { BoardComponent },
  computed: {
    ...mapState({
      boards: "boards",
    }),
  },
  data() {
    return {
      newBoard: "",
    };
  },
    methods: {
    createBoard() {
      if (this.newBoard !== "") {
        let body = {
          boardName: this.newBoard,
        };
        store.dispatch("createBoard", body);
        this.newBoard = "";
      }
    },
  },
};
</script>
