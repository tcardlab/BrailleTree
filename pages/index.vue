<template>
  <div  align="center" >

    <!--Display Braille @ proper mm sale -->
    <BrailleTree class="d-none d-sm-table-cell"/>
    <!--Display scaled braille for mobile -->
    <div class="d-sm-none" align="center" style="user-select: none;">
      <svg viewBox="0 0 434.641 462.984"> <!-- 500 600 :viewBox="viewbox"-->
        <BrailleTree />
      </svg>
    </div>

    <div style="user-select: none;">
      <h5>Braille <base-checkbox v-model="_$.vuealph" :disable="_$.display==='5'? true:false"/> Letters</h5>
      <label>display</label>
      <input v-model="_$.display" type="range" min="0" max="5" />
      <span>{{ ["#'s", 'A-J', 'K-T', 'U-Z', 'All', 'All2'][_$.display] }}</span>
    </div>
    
    <p style="word-wrap:break-word;">
    Brialle is a different typographic representation of the alphabet.
    wiki – "... the dots are assigned in no obvious order" https://en.wikipedia.org/wiki/Braille#Derivation

    root/fluency
    root/editor
    root/FAQ
    root/Braille

    learn more at BrailleTree.com
    history of braille
    other braille projects
    </p>
    
  </div>
</template>

<script>
import BaseCheckbox from '~/components/BrailleTree/BaseCheckbox.vue'
import BrailleTree from '~/components/BrailleTree/BrailleTree.vue'

export default {
  layout: 'basic',
  components: {
    BrailleTree,
    BaseCheckbox,
  },
  computed: {
    viewbox() {
      if (this._$.display<4) {
        return "0 0 400 500" //"0 0 300 450"
      } else {
        return "0 0 400 500"
      } 
    }
  }
}
</script>
