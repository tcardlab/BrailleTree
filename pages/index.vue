<template>
  <div class="container">
    <BrailleTree/>

    <div>
      <label>display</label>
      <input v-model="_$.display" type="range" min="0" max="5" />
      <span>{{ ["#'s", 'A-J', 'K-T', 'U-Z', 'All', 'All2'][_$.display] }}</span>
    </div>

  </div>
</template>

<script>
import BrailleTree from '~/components/BrailleTree.vue'

export default {
  layout: 'basic',
  components: {
    BrailleTree,
  },
}
</script>
