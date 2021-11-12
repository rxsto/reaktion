<template>
  <div class="h-full flex flex-col items-center justify-center">
    <div class="flex flex-col max-w-screen-md">
      <a class="btn" @click="proceed">
        Weiter
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
    proceed () {
      this.$emit('proceed')
    }
  }
}
</script>
