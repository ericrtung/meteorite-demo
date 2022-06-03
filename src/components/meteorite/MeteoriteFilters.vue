<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" transition="dialog-bottom-transition">
      <template v-slot:activator="{ props }">
        <v-btn icon="mdi-filter-variant" v-bind="props"></v-btn>
      </template>
      <v-card min-width="80vw">
        <v-toolbar color="info">
          <v-toolbar-title>Search Filters</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn @click="dialog = false">
              Close
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-sheet class="pa-4">
          <div class="pb-4">(not implemented)</div>

          <v-select
            v-model="classFilter"
            :items="meteoriteStore.classes"
            label="Meteorite Class"
            multiple
            chips
          ></v-select>

          <!-- Values for these could be computed -->
          <div>Year Landed</div>
          <v-range-slider
            v-model="yearRange"
            :max="2022"
            :min="0"
            :step="1"
            hide-details
            class="align-center"
          >
            <template v-slot:prepend>
              <v-text-field
                :model-value="yearRange[0]"
                hide-details
                single-line
                type="number"
                variant="outlined"
                density="compact"
                style="width: 8em"
                @change="$set(yearRange, 0, $event)"
              ></v-text-field>
            </template>
            <template v-slot:append>
              <v-text-field
                :model-value="yearRange[1]"
                hide-details
                single-line
                type="number"
                variant="outlined"
                style="width: 8em"
                density="compact"
                @change="$set(yearRange, 1, $event)"
              ></v-text-field>
            </template>
          </v-range-slider>

          <div class="mt-4">Meteorite Mass</div>
          <v-range-slider
            v-model="massRange"
            :max="100000"
            :min="0"
            :step="100"
            hide-details
            class="align-center"
          >
            <template v-slot:prepend>
              <v-text-field
                :model-value="massRange[0]"
                hide-details
                single-line
                type="number"
                variant="outlined"
                density="compact"
                style="width: 8em"
                @change="$set(massRange, 0, $event)"
              ></v-text-field>
            </template>
            <template v-slot:append>
              <v-text-field
                :model-value="massRange[1]"
                hide-details
                single-line
                type="number"
                variant="outlined"
                style="width: 8em"
                density="compact"
                @change="$set(massRange, 1, $event)"
              ></v-text-field>
            </template>
          </v-range-slider>
        </v-sheet>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMeteoriteStore } from '@/stores/meteorite';

export default defineComponent({
  setup() {
    const meteoriteStore = useMeteoriteStore();

    return { meteoriteStore };
  },

  data: () => ({
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,

      yearRange: [0, 2022],
      massRange: [0, 100000],
      classFilter: [],
  }),
})
</script>

<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform .2s ease-in-out;
}
</style>