<template>
  <div  align="center">
    <h1>BrailleTree</h1>
    <hr>
    <b-alert show> 
      This article is for sighted people who wish to lean Grade 1 Braille and spread this method to the blind.
      <br>
      <strong>3D models are availible as teaching aid to the blind at thingiverse?.</strong>
      <br>
      If you unfamiliar with Braille please see the <b-badge href="/faq" variant="info">FAQ Page</b-badge>.<!--info vs primary?-->
    </b-alert>
    <p>
      Braille, as I see it, is divided and organized by defineing features. 
      The Alphabet is easily destinguishable from punctuation and end marks from the remaining punctuation.
    </p>
    ⠦= ? How ""
    ⠖= ! Forte
    ⠲= . Dot

    <Static-Cell color="#9dd" :binaryarray="[1,0,0,0,0,1]" style="fill: var(--info) !important;" />

    <Static-Cell v-for="(arr,i) in [[0,1,1,0,0,1], [0,0,1,0,1,1], [0,1,0,0,1,1]]" :key="'test-'+i" color="#9dd" :binaryarray="arr" style="fill: var(--info) !important;" />

    <!--Display Braille @ proper mm sale -->
    <BrailleTree class="d-none d-sm-table-cell"/>
    <!--Display scaled braille for mobile -->
    <div class="d-sm-none" align="center" style="user-select: none;">
      <svg viewBox="0 0 434.641 462.984">
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
    <br>

    <br>
    learn more at BrailleTree.com
    history of braille
    other braille projects
    </p>

  </div>
</template>

<script>
import BaseCheckbox from '~/components/BrailleTree/BaseCheckbox.vue'
import BrailleTree from '~/components/BrailleTree/BrailleTree.vue'
import StaticCell from '~/components/Practice/StaticCell.vue'

export default {
  layout: 'basic',
  components: {
    BrailleTree,
    BaseCheckbox,
    StaticCell
  },
}
</script>


<style >
#Bottom, .Bottom-1 {
  fill: var(--info);
}
</style>