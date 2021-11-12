<template>
  <div class="h-full flex flex-col items-center justify-center">
    <div class="flex flex-col max-w-screen-md">
      <h1>
        {{ self.description }}
      </h1>
      <a class="btn" @click="download">
        Download
      </a>
    </div>
  </div>
</template>

<script>
import xlsx from 'xlsx'

export default {
  props: {
    self: {
      type: Object,
      default: null
    }
  },
  methods: {
    download () {
      const contexts = this.$storage.getLocalStorage('contexts')

      const workBook = xlsx.utils.book_new()

      workBook.SheetNames.push('results')

      const mutatedData = contexts.map((context) => {
        const object = context.object
        object.fits = object.fits ? 'passt' : 'passt nicht'
        const objectString = Object.values(object).join(', ')
        context.object = objectString
        return Object.values(context)
      })

      workBook.Sheets.results = xlsx.utils.aoa_to_sheet(mutatedData)

      xlsx.writeFile(workBook, 'results.xlsx')
    }
  }
}
</script>
