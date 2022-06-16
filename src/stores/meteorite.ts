import { useStorage, type RemovableRef } from '@vueuse/core'
import { defineStore } from 'pinia'
import axios from 'axios'

import { Meteorite } from '@/models/Meteorite'

export interface MeteoriteState {
  data: Meteorite[];
  favorites: RemovableRef<Meteorite[]>;
  loading: boolean;
  error: null | any;

  search: string;
};

export interface MeteoriteGetters {
  [key: string]: () => any;

  meteorites: () => Meteorite[];
  isFavorite: () => (meteorite: Meteorite) => boolean;
  classes: () => string[];
}

// Its debateable if mixing core data retrieval, favorites, and search all into the store makes sense
export const useMeteoriteStore = defineStore<string, MeteoriteState, MeteoriteGetters>('meteorites', {
  state: () => ({
    data: [],
    // Quick and dirty solution for persisting favorites
    favorites: useStorage<Meteorite[]>('meteorite-favorites', []),
    loading: false,
    error: null,
    search: "",
  }),

  actions: {
    favoriteAdd(meteorite: Meteorite) {
      if (!this.favorites.find(m => m.id == meteorite.id)) {
        this.favorites.push(meteorite);
      }
    },

    favoriteRemove(meteorite: Meteorite) {
      const index = this.favorites.findIndex(m => m.id == meteorite.id);
      if (index > -1) {
        this.favorites.splice(index, 1);
      }
    },

    toggleFavorite(meteorite: Meteorite) {
      let isFavorite = this.favorites.find(m => m.id == meteorite.id);

      if(!isFavorite) {
        this.favoriteAdd(meteorite);
      } else {
        this.favoriteRemove(meteorite);
      }
    },

    async load() {
      this.data = [];
      this.loading = true;
      try {
        const response = (await axios.get('https://data.nasa.gov/resource/y77d-th95.json')).data || []

        this.$patch({
          data: response.map((e: any) => new Meteorite(e))
        })

        //this.data = response.map((e: any) => parse(e));
      } catch (error: any) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
  },

  getters: {
    meteorites() : Meteorite[]  {
      return (this.data as Meteorite[]).filter(m => {
        return this.search == ""
          || m.id == +this.search
          || m.name.toLocaleLowerCase().includes(this.search.toLocaleLowerCase());
      }); //.slice(0, 100);
    },

    classes() : string[] {
      return [...new Set((this.data as Meteorite[]).map(m => m.recclass))].sort();
    },

    isFavorite() : (meteorite: Meteorite) => boolean {
      return (meteorite: Meteorite) => !!this.favorites.find(m => m.id == meteorite.id);
    }
  },
})