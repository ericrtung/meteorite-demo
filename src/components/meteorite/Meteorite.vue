<script setup lang="ts">
import type { Meteorite } from '@/models/Meteorite';
import { useMeteoriteStore } from '@/stores/meteorite'
import { storeToRefs } from 'pinia';

const store = useMeteoriteStore();

// No idea why the type is getting lost on iport
//const { data } = storeToRefs(store);

const data = storeToRefs(store).data as unknown as Meteorite[];

store.load();
</script>

<template>
  <v-sheet class="overflow-auto" v-resize="onResize" :height="viewHeight">
    <v-sheet class="h-50">
      Fancy map here
    </v-sheet>
    <v-sheet class="h-50">
      <v-table fixed-header :height="viewHeight / 2" class="meteorite-table">
        <thead>
          <tr>
            <th class="text-left bg-blue-darken-3">
              ID
            </th>
            <th class="text-left bg-blue-darken-3">
              Name
            </th>
            <th class="text-left bg-blue-darken-3">
              RecClass
            </th>
            <th class="text-left bg-blue-darken-3">
              Year
            </th>
            <th class="text-right bg-blue-darken-3">
              Mass
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.recclass }}</td>
            <td>{{ item.year }}</td>
            <td class="text-right">{{ item.mass }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-sheet>
  </v-sheet>
</template>

<script lang="ts">
export default {
  // setup() {
  //     const store = useMeteoriteStore();
  //     store.load();
  //     return { store };
  // },
  data: () => ({
    selected: [],
    windowSize: {
        x: 0,
        y: 0,
      },
  }),

  computed:{
    viewHeight() {
      // Do something more duable than this in a real solution
      return this.windowSize.y - 48;
    }
  },

  mounted () {
    this.onResize()
  },

  methods: {
      onResize () {
        this.windowSize = { x: window.innerWidth, y: window.innerHeight }
        console.log("this.windowSize: ", this.windowSize);
      },
    },
}
</script>

<style>
/* quick hack to hide second scroll bar, not ideal way to do this */
html {
  overflow: hidden;
}

/* .meteorite-table th {
  background: transparent !important;
} */
</style>