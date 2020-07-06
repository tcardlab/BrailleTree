<template>
  <div 
    @wheel="handleScroll" 
    style="overflow: scroll; height: 50px; background-color: red">
    <slot :index="index"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: false,
      scroll: 0,
      index: 0
    }
  },
  watch: {
    scroll() {
      const deltaIndex = this.scroll / 30 | 0
      if (Math.abs(deltaIndex) > 1) {
        const sum = this.index + deltaIndex
        this.index = sum <= 0 ? 0 : sum >= 5 ? 5 : sum
        this.scroll = 0
      }
    }
  },
  methods: {
    handleScroll(e) {
      e.preventDefault();
      this.scroll += e.deltaY
    }
  }
}
</script>

<style>

</style>