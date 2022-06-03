<script setup lang="ts">
import MeteoriteFavorite from './MeteoriteFavorite.vue'

import { useMeteoriteStore } from '@/stores/meteorite';
const meteoriteStore = useMeteoriteStore();

defineProps<{
  height: string | number
}>();
</script>

<template>
  <v-table fixed-header :height="height" class="w-100 meteorite-table">
    <thead>
      <tr>
        <th class="text-left bg-blue-darken-3">
        </th>
        <th class="text-left bg-blue-darken-3">
          Name
        </th>
        <th class="text-right bg-blue-darken-3">
          ID
        </th>
        <th class="text-left bg-blue-darken-3">
          Class
        </th>
        <th class="text-left bg-blue-darken-3">
          Year
        </th>
        <th class="text-right bg-blue-darken-3">
          Mass
        </th>
        <th class="text-left bg-blue-darken-3">
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in meteoriteStore.meteorites" :key="item.id">
        <td>
          <MeteoriteFavorite :meteorite="item" />
        </td>
        <td>{{ item.name }}</td>
        <td class="text-right">{{ item.id }}</td>
        <td>{{ item.recclass }}</td>
        <td>{{ item.year }}</td>
        <td class="text-right">{{ item.mass }}</td>
        <td>
          <v-icon @click.stop="() => emitMapPinClick(item)">
            mdi-map-marker-outline
          </v-icon>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts">
import type { Meteorite } from '@/models/Meteorite'

export default {
  methods: {
    emitMapPinClick(meteorite : Meteorite) {
      this.$emit('pin-click', { meteorite });
    }
  }
}
</script>

<style scoped>
.v-icon {
  position: static !important;
}
</style>