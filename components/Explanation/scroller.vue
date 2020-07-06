<template>
  <div @wheel="handleWheel" @keyup="nextItem">
    <slot :index="index"/>
  </div>
</template>

<script>
export default {
  props: ['maxIndex'],
  data() {
    return {
      test: false,
      scroll: 0,
      index: 0
    }
  },
  watch: {
    scroll() {
      const deltaIndex = this.scroll / 50 | 0
      if (deltaIndex !== 0) {
        const sum = this.index + deltaIndex
        this.index = sum <= 0 ? 0 : sum >= +this.maxIndex ? +this.maxIndex : sum
        this.scroll = 0
      }
    }
  },
  methods: {
    handleWheel(e) {
      if(!((this.index===+this.maxIndex&&e.deltaY>0)||(this.index===0&&e.deltaY<0))){
        e.preventDefault()
      }
      this.scroll += e.deltaY
    },
    setIndex(n) {
      this.index=n
    },
    nextItem(e) {
      e.preventDefault()
      if (e.keyCode === 38 && this.index >= 1) {
        this.index--
      } else if (e.keyCode === 40 && this.index < this.maxIndex) {
        this.index++
      }
    }
  },
  mounted () {
    document.addEventListener("keydown", this.nextItem)
  },
  beforeDestroy () {
    document.removeEventListener("keydown", this.nextItem);
  }
}
</script>

<style>

</style>