<template>
  <div class="h-full flex flex-col items-center justify-center">
    <div class="flex flex-col max-w-screen-md gap-4">
      <p v-for="(line, index) in self.content" :key="`line-${index}`" class="text-xl">
        {{ line }}
      </p>
      <div class="flex justify-center">
        <a class="btn" @click="initialize">
          Los geht's
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    self: {
      type: Object,
      default: null
    }
  },
  methods: {
    initialize () {
      this.$emit('initialize')
    }
  }
}
</script>
