<template>
  <div class="h-full flex flex-col justify-center items-center">
    <div class="flex flex-col max-w-screen-md">
      <h2>
        {{ test.description }}
      </h2>
      <a class="btn" @click="start">
        Starten
      </a>
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
  methods: {
    start () {
      this.$emit('start')
    }
  }
}
</script>
