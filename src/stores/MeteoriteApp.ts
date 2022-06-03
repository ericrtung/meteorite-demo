import type { Meteorite } from '@/models/Meteorite'
import { defineStore } from 'pinia'

export interface MeteoriteState {
  render: Meteorite[];
  selected: Meteorite[];
};

export const useMeteoriteStore = defineStore<string, MeteoriteState>('meteorites', {
  state: () : MeteoriteState => ({
    render: [],
    selected: [],
  }),
})