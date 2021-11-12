<template>
  <div class="h-full flex items-center justify-center">
    <a class="btn" @click="start">
      Initialisieren
    </a>
  </div>
</template>

<script>
export default {
  methods: {
    start () {
      this.$router.push('/app')
    }
  }
}
</script>
