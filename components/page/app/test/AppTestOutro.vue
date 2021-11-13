<template>
  <div class="h-full flex flex-col items-center justify-center">
    <div class="flex flex-col max-w-screen-md gap-4">
      <p v-for="(line, index) in current.content" :key="`line-${index}`" class="text-xl">
        {{ line }}
      </p>
      <div class="flex">
        <a class="btn" @click="proceed">
          Weiter
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import outros from '~/assets/json/outros.json'

export default {
  props: {
    test: {
      type: Object,
      default: null
    },
    round: {
      type: Number,
      default: 0
    }
  },
  computed: {
    current () {
      return outros[this.round]
    }
  },
  methods: {
    proceed () {
      this.$emit('proceed')
    }
  }
}
</script>
