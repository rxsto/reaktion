<template>
  <div class="h-full flex flex-col items-center justify-center">
    <div v-if="starting" class="flex flex-col items-center gap-4">
      <h1 class="text-xl opacity-75">
        Ready?
      </h1>
      <p class="text-4xl font-bold">
        {{ tick }}
      </p>
    </div>
    <div v-else class="flex flex-col max-w-screen-md gap-4">
      <p v-for="(line, index) in test.content" :key="`line-${index}`" class="text-xl">
        {{ line }}
      </p>
      <div class="flex justify-center">
        <a class="btn" @click="start">
          Starten
        </a>
      </div>
      <div class="flex justify-center">
        <img v-if="test.training" src="/img/Schuhkarton.png" style="height: 240px; width: auto;">
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
    }
  },
  data () {
    return {
      starting: false,
      tick: 3
    }
  },
  methods: {
    start () {
      this.starting = true
      this.interval = setInterval(() => {
        if (this.tick <= 1) {
          this.$emit('start')
          clearInterval(this.interval)
        } else {
          this.tick--
        }
      }, 1000)
    }
  }
}
</script>
