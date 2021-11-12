<template>
  <div v-if="mounted" class="h-full">
    <component
      :is="stage.comp"
      v-bind="testData"
      @start="start"
      @next="next"
      @proceed="proceed"
      @finish="finish"
    />
  </div>
</template>

<script>
import tests from '~/assets/json/tests.json'
import objects from '~/assets/json/objects.json'
import stages from '~/assets/json/stages.json'

export default {
  props: {
    self: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      test: null,
      fulfilled: [],
      entities: [],
      used: [],
      stage: null,
      mounted: false
    }
  },
  computed: {
    testData () {
      return {
        test: this.test,
        entities: this.entities
      }
    }
  },
  mounted () {
    this.setStage(this.$storage.getLocalStorage('stage') || stages[0])
    this.setTest(this.$storage.getLocalStorage('test') || tests[0])
    this.setFulfilled(this.$storage.getLocalStorage('fulfilled') || [])
    this.setEntities(this.$storage.getLocalStorage('entities') || [])
    this.setUsed(this.$storage.getLocalStorage('used') || [])
    this.mounted = true
  },
  methods: {
    start () {
      if (this.entities.length === 0) {
        this.aggregateEntities()
      }
      this.setStage(stages[1])
    },
    next () {
      this.setStage(stages[2])
    },
    finish () {
      this.$emit('finish')
    },
    proceed () {
      this.addFulfilled(this.test)
      this.resetIndex()
      const remaining = tests.filter(t => !this.fulfilled.find(f => f.id === t.id))
      const next = remaining[Math.random() * remaining.length | 0]
      if (!next) {
        this.finish()
      } else {
        this.aggregateEntities()
        this.setTest(next)
        this.setStage(stages[0])
      }
    },
    aggregateEntities () {
      const usableEntities = objects.filter(o => !this.used.find(u => u.id === o.id))
      const fits = this.shuffle(usableEntities.filter(ue => ue.fits))
      const fitsNot = this.shuffle(usableEntities.filter(ue => !ue.fits))

      const newFits = fits.slice(0, 10)
      const newFitsNot = fitsNot.slice(0, 10)

      this.setUsed(this.used.concat(newFits, newFitsNot))
      this.setEntities(this.shuffle(newFits.concat(newFitsNot)))
    },
    addFulfilled (test) {
      this.fulfilled.push(test)
      this.$storage.setLocalStorage('fulfilled', this.fulfilled)
    },
    setStage (stage) {
      this.$storage.setLocalStorage('stage', stage)
      this.stage = stage
    },
    setTest (test) {
      this.$storage.setLocalStorage('test', test)
      this.test = test
    },
    setFulfilled (fulfilled) {
      this.fulfilled = fulfilled
      this.$storage.setLocalStorage('fulfilled', fulfilled)
    },
    setUsed (used) {
      this.used = used
      this.$storage.setLocalStorage('used', used)
    },
    setEntities (entities) {
      this.entities = entities
      this.$storage.setLocalStorage('entities', entities)
    },
    resetIndex () {
      this.$storage.setLocalStorage('index', 0)
    },
    shuffle (array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
      return array
    }
  }
}
</script>
