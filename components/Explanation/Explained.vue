<template>
  <scroller v-slot="slotProps">
    {{slotProps.index}}
  </scroller>
</template>


<script>
import scroller from "./scroller.vue"

export default {
  components: {
    scroller,
  },

}
</script>


<style>
</style>