<script setup lang="ts">
import type { Meteorite } from '@/models/Meteorite';
import { useMeteoriteStore } from '@/stores/meteorite';
const meteoriteStore = useMeteoriteStore();

const isFavorite = meteoriteStore.isFavorite;
const toggleFavorite = meteoriteStore.toggleFavorite;

defineProps<{
  meteorite: Meteorite,
}>();
</script>

<template>
  <v-icon
    :color="isFavorite(meteorite) ?  'yellow darken-3' : 'grey lighten-1'"
    @click.stop="() => toggleFavorite(meteorite)"
  >
    {{ isFavorite(meteorite) ? 'mdi-star' : 'mdi-star-outline' }}
  </v-icon>
</template>