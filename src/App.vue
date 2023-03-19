<template>
    <v-app>
        <v-main>
            <NavBar></NavBar>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script>
import {defineComponent} from "vue";
import NavBar from "@/components/NavBar.vue";

export default defineComponent({
    components: {NavBar},
})
</script>

