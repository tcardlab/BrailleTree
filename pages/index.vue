<template>
  <div class="container" align="center">
    
    <BrailleTree />

    <div>
      <h5>Braille <base-checkbox v-model="_$.vuealph"/> Letters</h5>
      <label>display</label>
      <input v-model="_$.display" type="range" min="0" max="5" />
      <span>{{ ["#'s", 'A-J', 'K-T', 'U-Z', 'All', 'All2'][_$.display] }}</span>
    </div>

  </div>
</template>

<script>
import BaseCheckbox from '~/components/BaseCheckbox.vue'
import BrailleTree from '~/components/BrailleTree.vue'

export default {
  layout: 'basic',
  components: {
    BrailleTree,
    BaseCheckbox,
  },
}
</script>
