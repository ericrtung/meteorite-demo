<script setup lang="ts">
import { nextTick } from 'vue';
import MeteoriteMap from './MeteoriteMap.vue';
import MeteoriteTable from './MeteoriteTable.vue';
import MeteoriteFilters from './MeteoriteFilters.vue';

import { useMeteoriteStore } from '@/stores/meteorite';
import { storeToRefs } from 'pinia';
const { search } = storeToRefs(useMeteoriteStore());
</script>

<template>
  <v-sheet class="overflow-auto d-flex flex-column flex-lg-row" v-resize="onResize" :height="viewHeight">
    <v-app-bar color="info" density="compact">
      <template v-slot:prepend>
        <v-btn icon="mdi-map-outline" @click.stop="showMap = !showMap"></v-btn>
      </template>

      <v-text-field
        prepend-inner-icon="mdi-magnify"
        single-line placeholder="Search ..."
        v-model="search"
        bg-color="white"
        hide-details
        clearable
      ></v-text-field>

      <template v-slot:append>
        <MeteoriteFilters class="ml-2" />
      </template>
    </v-app-bar>

    <v-sheet v-if="showMap" :class="['d-flex', ...(isViewLarge ? ['h-100', 'w-65'] : ['h-40', 'w-100'])]">
      <MeteoriteMap ref="map" />
    </v-sheet>

    <!-- Class could be a computed prop ...  -->
    <v-sheet :class="['d-flex',
      ...(showMap
        ? (isViewLarge ? ['h-100', 'w-35'] : ['h-60', 'w-100'])
        : ['h-100', 'w-100'])
    ]">
      <MeteoriteTable
        :height="showMap ? tableHeight : viewHeight"
        @pin-click="handlePinClick"
      />
    </v-sheet>
  </v-sheet>
</template>

<script lang="ts">
const vHeightOffset = (48 * 2);

export default {

  data: () => ({
    showMap: true,
    selected: [],
    windowSize: {
      x: 0,
      y: 0,
    },
  }),

  computed: {
    // Do something more durable than this in a real solution
    viewHeight() {
      return this.windowSize.y - vHeightOffset
    },

    tableHeight() {
      return (this.isViewLarge)
        ? this.windowSize.y - vHeightOffset
        : (this.windowSize.y - vHeightOffset) * 0.60;
    },

    isViewLarge() {
      return this.windowSize.x > 1280;
    }
  },

  async mounted() {
    await nextTick();
    this.onResize();
  },

  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
      //console.log("this.windowSize", this.windowSize)
    },

    handlePinClick({ meteorite }) {
      (this.$refs as any).map.zoomTo(meteorite);
    }
  },
}
</script>

<style>
/* quick hack to hide page level scroll bar, not ideal way to do this */
html {
  overflow: hidden;
}

/* custom sizing dimensions */
.w-35 {
  width: 35% !important;
}

.w-65 {
  width: 65% !important;
}

.h-40 {
  height: 40% !important;
}

.h-60 {
  height: 60% !important;
}
</style>