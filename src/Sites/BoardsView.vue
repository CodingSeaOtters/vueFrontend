<template>
    <v-card title="Boards" width="600" class="pa-5 ma-auto mt-16 bg-blue-grey-darken-2">
        <div v-for="(boardId,index) in boardIds" :key="index">
            <board-component :connection-base="connectionBase" :id="boardId"/>
        </div>
        <v-text-field v-model="newBoard" type="text" label="Neues Board"></v-text-field>

        <v-card-actions class="d-flex align-items-center justify-center">
            <v-btn @click="createBoard" variant="elevated" color="warning"><b>Erstellen</b></v-btn>
        </v-card-actions>
    </v-card>

</template>

<script>
import axios from "axios";
import BoardComponent from "@/components/Board.vue";

export default {

    name: "BoardsView",
    components: {BoardComponent},
    props: ["connectionBase"],
    data() {
        return {
            userId: this.$route.params.id,
            boardIds: [],
            newBoard: ""
        }
    },
    created() {
        if (!document.cookie.split(';').some((item) => item.trim().startsWith('login='))) {
            this.$router.push('/');
        }
        this.getAllBoards();
    },
    methods: {
        getAllBoards() {

            axios.get(this.connectionBase + "/board/all/" + this.userId, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("JWT")
                }
            })
                .then(response => {
                    if (response.status === 200) {
                        this.boardIds.splice(0, this.boardIds.length, ...response.data);
                    }
                })
                .catch(e => console.log(e))
        },
        createBoard() {
            if (this.newBoard !== "") {
                let body = {
                    boardName: this.newBoard
                }
                axios.post(this.connectionBase + '/board/' + this.userId, body, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("JWT")
                    }
                })
                    .then(() => {
                        this.newBoard = "";
                        this.getAllBoards();
                    })

            }
        },
        isLoggedIn(){
            const cookieValue = document.cookie
                .split('; ')
                .find(row => row.startsWith('login='))
                .split('=')[1];
            return (cookieValue === 'true');
        }
    }
}
</script>
