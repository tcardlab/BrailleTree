<template>
  <scroller v-slot="slotProps">
    <img v-show="i===slotProps.index" height="200" :src="require(`~/static/BrailleImages/${steps[slotProps.index]}`)"/>
    {{slotProps.index}}
  </scroller>
</template>


<script>
import scroller from "./scroller.vue"

export default {
  components: {
    scroller,
  },
  data() {
    return {
      steps: {
        0: "ternaryTree(Columns).svg",
        1: "ternaryTree(Columns2).svg",
        2: "assignDots.svg",
        3: "Punctuation4.svg",
        4: "Nums.svg",
        5: "AJ.svg",
      },
      active: "ternaryTree(Columns).svg"
    }
  }
}
</script>


<style>
</style>