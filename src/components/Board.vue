<template>
    <v-card @click="showBoard" class="pa-3 my-2 bg-blue-grey-darken-3">
        {{ board.boardName }}
    </v-card>
</template>

<script>
import store from "@/modules/user.store";

export default {
    name: "BoardComponent",
    props: ["board"],
    methods: {
        showBoard() {
            store.dispatch("showBoard", this.board.boardId)
        }
    }
}
</script>
