<template>
  <div class="h-full flex flex-col items-center justify-center">
    <div class="flex flex-col max-w-screen-md gap-4">
      <p v-for="(line, index) in test.content" :key="`line-${index}`" class="text-xl">
        {{ line }}
      </p>
      <div class="flex">
        <a class="btn" @click="start">
          Starten
        </a>
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
  methods: {
    start () {
      this.$emit('start')
    }
  }
}
</script>
