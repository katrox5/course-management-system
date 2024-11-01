import { defineConfig } from 'unocss'

export default defineConfig({
  content: {
    filesystem: ['App.vue', './components/*.vue', './views/*.vue'],
  },
})
