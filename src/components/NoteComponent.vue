<template>
    <v-card :text="data.content" :title="data.title" width="300" class="pa-5 ma-auto mt-16 bg-blue-grey-darken-2">
    </v-card>
</template>

<script>

export default {
    name: "NoteComponent",
    props: ["data"],

}
</script>

<style scoped>

</style>