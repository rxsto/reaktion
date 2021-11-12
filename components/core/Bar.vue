<template>
  <div class="flex justify-between bg-gray-800 p-2 text-gray-300 text-sm">
    <p class="opacity-50">
      © Oskar Lang
    </p>
    <a class="cursor-pointer opacity-75 transition hover:opacity-100 hover:underline" @click="reset">
      Reset
    </a>
  </div>
</template>

<script>
export default {
  methods: {
    reset () {
      this.$storage.removeLocalStorage('state')
      this.$storage.removeLocalStorage('stage')
      this.$storage.removeLocalStorage('test')
      this.$storage.removeLocalStorage('fulfilled')
      this.$storage.removeLocalStorage('used')
      this.$storage.removeLocalStorage('entities')
      this.$storage.removeLocalStorage('index')
      this.$storage.removeLocalStorage('checkpoints')
      this.$storage.removeLocalStorage('contexts')
      this.$router.push('/')
    }
  }
}
</script>
