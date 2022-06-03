<script setup lang="ts">
import Meteorite from '@/components/meteorite/Meteorite.vue'
import { useMeteoriteStore } from '@/stores/meteorite';

const meteoriteStore = useMeteoriteStore();

console.log("meteoriteStore:init", meteoriteStore.favorites);

meteoriteStore.load();
</script>

<template>
  <Meteorite />
</template>

<style>

</style>
