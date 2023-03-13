<template>
  <v-card @click="showBoard" class="pa-3 my-2 bg-blue-grey-darken-3">
      {{name}}
  </v-card>
</template>

<script>
import axios from "axios";

export default {
    name: "BoardComponent",
    props:["id", "connectionBase"],
    data(){
        return{
            name : ""
        }

    },
    created() {
        this.getBoardInfo();
    },
    methods: {
        getBoardInfo(){
            axios.get(this.connectionBase + "/board/" + this.id, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("JWT")
                }
            })
                .then(response => {
                    if (response.status === 200) {

                        this.name = response.data.boardName;
                        console.log(response.data)
                    }
                })
                .catch(e => console.log(e))
        },
        showBoard(){
            this.$router.push("/notes/" + this.id)
        }
    }

}
</script>

<style scoped>

</style>