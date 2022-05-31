import { defineStore } from 'pinia'
import axios from 'axios'

import type { Meteorite } from '@/models/Meteorite'
import { parse } from '@/models/Meteorite'

export interface MeteoriteState {
  data: Meteorite[];
  loading: boolean;
  error: null | any;
};

export const useMeteoriteStore = defineStore<string, MeteoriteState>('meteorites', {
  state: () : MeteoriteState => ({
    data: [],
    loading: false,
    error: null,
  } ),

  actions: {
    async load() {
      this.data = [];
      this.loading = true;
      try {
        // https://data.nasa.gov/resource/gh4g-9sfh.json // alternative link from website?
        // https://data.nasa.gov/resource/y77d-th95.json // 1000 records
        const response = (await axios.get('https://data.nasa.gov/resource/y77d-th95.json')).data || []

        this.data = response.map((e: any) => parse(e));
        
        console.log("meteorites.fetchPosts():response", this.data);
      } catch (error: any) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
  },
})