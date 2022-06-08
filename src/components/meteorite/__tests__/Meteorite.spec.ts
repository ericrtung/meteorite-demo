import { describe, it, expect, vi } from 'vitest'

import { h } from "vue";
import { VApp } from "vuetify/components";

import { createPinia } from 'pinia'

import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"

import { mount } from '@vue/test-utils'
import Meteorite from '../Meteorite.vue'

global.ResizeObserver =
  global.ResizeObserver ||
  vi.fn().mockImplementation(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    unobserve: vi.fn()
  }));

describe('Meteorite', () => {
  const vuetify = createVuetify({ components, directives });
  const pinia = createPinia();

  it('renders properly', () => {
    const wrapper = mount(VApp, {
      global: {
        plugins: [vuetify, pinia],
      },
      slots: {
        default: h(Meteorite),
      }
    })

    expect(wrapper.findComponent('MeteoriteFilters')).toBeTruthy();
    expect(wrapper.findComponent('MeteoriteMap')).toBeTruthy();
    expect(wrapper.findComponent('MeteoriteTable')).toBeTruthy();
  });
})
