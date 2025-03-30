<template>
  <div id="app" class="dashboard-layout">
    <Loading v-if="globalState.isLoading" /> <!-- Show loading state -->
    <Sidebar v-if="showSidebar" />
    <router-view />
  </div>
</template>

<script>
import { computed, inject } from "vue"; // Import inject
import { useRoute } from "vue-router";
import Sidebar from "./components/Navbar.vue";

export default {
  components: {
    Sidebar,
  },
  setup() {
    const route = useRoute();
    const globalState = inject("globalState"); // Inject the global state

    const showSidebar = computed(() => !route.path.startsWith("/auth"));

    return {
      showSidebar,
      globalState, // Return globalState to use in the template
    };
  },
};
</script>

<style scoped>
.dashboard-layout {
  display: flex;
background-color: #D9F7FF;
}

#app {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>


