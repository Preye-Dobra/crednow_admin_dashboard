<template>
  <div id="app">

    <Sidebar v-if="showSidebar" />
    <router-view />
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Sidebar from "./components/Navbar.vue";

export default {
  components: {
    Sidebar,
  },
  setup() {
    const route = useRoute();


    const showSidebar = computed(() => !route.path.startsWith("/auth"));

    return {
      showSidebar,
    };
  },
};
</script>

<style>
</style>

