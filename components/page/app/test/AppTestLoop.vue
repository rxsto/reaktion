<template>
  <div v-if="mounted" class="flex flex-col items-center justify-evenly h-full">
    <h1 class="text-3xl">
      Passt dieses Objekt in einen Schuhkarton?
    </h1>
    <img style="height: 320px" class="w-auto" :src="`/img/objects/${current.id}`">
    <div class="flex items-end gap-4">
      <div class="flex flex-col items-center">
        <spacebar style="height: 48px" />
        <p>
          Passt
        </p>
      </div>
      <div class="flex flex-col items-center">
        <enter style="height: 96px" />
        <p>
          Passt nicht
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    test: {
      type: Object,
      default: null
    },
    entities: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      index: 0,
      mounted: false,
      checkpoints: [],
      contexts: []
    }
  },
  computed: {
    current () {
      return this.entities[this.index]
    }
  },
  mounted () {
    this.setIndex(this.$storage.getLocalStorage('index') || 0)
    this.setCheckpoints(this.$storage.getLocalStorage('checkpoints') || [])
    this.setContexts(this.$storage.getLocalStorage('contexts') || [])

    document.addEventListener('keydown', this.handleKeyDown)

    this.mounted = true

    this.checkpoint()
  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.handleKeyDown)
  },
  methods: {
    fits (fits) {
      this.checkpoint()

      const start = this.checkpoints[this.checkpoints.length - 2]
      const end = this.checkpoints[this.checkpoints.length - 1]

      const difference = end - start

      const last = { ...this.current }

      const context = {
        time: difference,
        answer: fits ? 'passt' : 'passt nicht',
        object: last,
        test: this.test.id,
        correct: fits === last.fits
      }

      this.addContext(context)

      if (this.index < this.entities.length - 1) {
        this.increaseIndex()
      } else {
        this.$emit('next')
      }
    },
    checkpoint () {
      this.checkpoints.push(Date.now())
      this.$storage.setLocalStorage('checkpoints', this.checkpoints)
    },
    increaseIndex () {
      this.index++
      this.$storage.setLocalStorage('index', this.index)
    },
    addContext (context) {
      this.contexts.push(context)
      this.$storage.setLocalStorage('contexts', this.contexts)
    },
    setIndex (index) {
      this.index = index
      this.$storage.setLocalStorage('index', index)
    },
    setCheckpoints (checkpoints) {
      this.checkpoints = checkpoints
      this.$storage.setLocalStorage('checkpoints', checkpoints)
    },
    setContexts (contexts) {
      this.contexts = contexts
      this.$storage.setLocalStorage('contexts', contexts)
    },
    handleKeyDown (e) {
      e.preventDefault()
      if (e.key === 'Enter') {
        this.fits(false)
      } else if (e.key === ' ') {
        this.fits(true)
      } else {
        // NOTHING
      }
    }
  }
}
</script>
