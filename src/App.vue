<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
</script>

<template>
  <v-app>
    <v-app-bar
        color="info"
        density="compact"
      >
        <template v-slot:prepend>
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>{{ $router.currentRoute.value?.meta?.title }}</v-app-bar-title>
      </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary class="pa-4">
      Possible site navigation items here
    </v-navigation-drawer>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script lang="ts">
export default {
  data: () => ({
    drawer: false
  }),

  mounted() {
    console.log("App:mounted", this);
  }
}
</script>
