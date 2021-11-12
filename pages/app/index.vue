<template>
  <div v-if="mounted" class="h-full">
    <component
      :is="state.comp"
      v-bind="appState"
      @initialize="initialize"
      @finish="finish"
    />
  </div>
  <div v-else class="h-full flex items-center justify-center">
    <loading class="text-gray-900 stroke-current h-16" />
  </div>
</template>

<script>
import states from '~/assets/json/states.json'
import objects from '~/assets/json/objects.json'

export default {
  data () {
    return {
      state: null,
      mounted: false,
      preloaded: []
    }
  },
  computed: {
    appState () {
      return {
        self: this.state
      }
    }
  },
  mounted () {
    this.setState(this.$storage.getLocalStorage('state') || states[0])
    for (const object of objects) {
      this.preload(`/img/objects/${object.id}`)
    }
    this.mounted = true
  },
  methods: {
    initialize () {
      this.setState(states[1])
    },
    finish () {
      this.setState(states[2])
    },
    preload (url) {
      const img = new Image()
      img.src = url
      this.preloaded.push(img)
    },
    setState (state) {
      this.$storage.setLocalStorage('state', state)
      this.state = state
    }
  }
}
</script>
