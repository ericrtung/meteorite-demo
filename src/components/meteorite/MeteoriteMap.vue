<template>
  <div class="map h-100 w-100"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

import { useMeteoriteStore } from '@/stores/meteorite';
import type { Meteorite } from '@/models/Meteorite';

const getLatLong = (m : Meteorite) : [number, number] => {
  return [m.geolocation.coordinates[1], m.geolocation.coordinates[0]];
}

export default defineComponent({
  setup() {
    const meteoriteStore = useMeteoriteStore();

    let mapObject : L.Map | undefined;
    let meteorPinLayer : L.LayerGroup | undefined;

    return { meteoriteStore, mapObject, meteorPinLayer };
  },

  beforeCreate() {
    this.meteorPinLayer = L.layerGroup([]);

    this.meteoriteStore.$subscribe((mut, state) => {
      //console.log({ mut, state });

      // // https://pinia.vuejs.org/core-concepts/state.html#subscribing-to-the-state
      // if ((mut as any).payload?.data) {
      //   this.mapMeteorites();
      // }

      // Looks like the easiest thing is to let the render update on every store touch rather than trying to filter on individual property mutations
      this.mapMeteorites();
    });
  },

  beforeDestroy() {
    if (this.mapObject) {
      this.mapObject.remove();
    }
  },

  mounted() {
    this.$nextTick(() => {
      let tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      });

      this.mapObject = L.map(this.$el, { layers: [tiles] });
      this.mapObject.fitWorld();
      this.mapObject.setZoom(2);

      this.mapObject.on('moveend', this.moveEndHandler);

      this.mapMeteorites();
    });
  },

  methods: {
    mapMeteorites() {
      if(!this.mapObject) return;

      console.log("mapMeteorites()", this.meteoriteStore.meteorites?.length);

      this.meteorPinLayer?.removeFrom(this.mapObject)

      let pins = this.meteoriteStore.meteorites.reduce((arr, m) => {
        if (m.geolocation) {
          arr.push(L.marker(getLatLong(m)));
        }
        return arr;
      }, [] as L.Marker[]);

      this.meteorPinLayer = L.layerGroup(pins);
      this.meteorPinLayer.addTo(this.mapObject)
    },

    zoomTo(meteorite : Meteorite) {
      console.log("zoomTo():", meteorite);

      if (meteorite.geolocation)
        this.mapObject?.setView(getLatLong(meteorite), 6, { animate: true, duration: 1 });
    },

    // debugging method
    moveEndHandler() {
      if(!this.mapObject) return;

      let zoom = this.mapObject.getZoom();
      let center = this.mapObject.getCenter();
      let bounds = this.mapObject.getBounds();

      console.log({ zoom, center, bounds });
    },
  },
})
</script>