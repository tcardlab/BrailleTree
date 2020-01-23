<template>
  <b-container class="practice-page">
    <h1 align="center">Practice</h1>
    <hr>
    <b-row class="practice-row">
      <b-col class="practice-col" md="5">
         <h3>Solve For Braille:</h3>
         <p>Translate the given glyph to Braille using "click and drag" to toggle dots.</p>
         <Guess-Braille/> 
      </b-col>
      <b-col align="right" md="2">
        <div class="vl"/>
      </b-col>
      <b-col class="practice-col" md="5"> 
        <h3>Solve For Glyphs:</h3>
        <p>Type the translation of the given braille.</p>
        <Guess-Letter/>
      </b-col>
    </b-row>
      <b-button v-b-toggle.collapse-1 variant="primary">Hint</b-button>
      <div>
        <b-collapse id="collapse-1" class="mt-2">
          <b-card>
            <!--Display Braille @ proper mm sale -->
            <BrailleTree align="center" class="d-none d-sm-table mx-auto"/>
            <!--Display scaled braille for mobile -->
            <div class="d-sm-none" align="center" style="user-select: none;">
              <svg viewBox="0 0 434.641 462.984">
                <BrailleTree />
              </svg>
            </div>

            <div align="center" style="user-select: none;">
              <h5>Braille <base-checkbox v-model="_$.vuealph" :disable="_$.display==='5'? true:false"/> Letters</h5>
              <label>display</label>
              <input v-model="_$.display" type="range" min="0" max="5" />
              <span>{{ ["#'s", 'A-J', 'K-T', 'U-Z', 'All', 'All2'][_$.display] }}</span>
            </div>
          </b-card>
        </b-collapse>
      </div>
      <b-row class="quote-row">
        <GuessQuote/>
      </b-row>
  </b-container>
</template>

<script>
import GuessBraille from "../components/Practice/GuessBraille.vue"
import GuessLetter from "../components/Practice/GuessLetter.vue"
import GuessQuote from "../components/Practice/GuessQuote.vue"

import BaseCheckbox from '~/components/BrailleTree/BaseCheckbox.vue'
import BrailleTree from '~/components/BrailleTree/BrailleTree.vue'


export default {
  layout: 'basic',
  components: {GuessBraille, GuessLetter, GuessQuote, BaseCheckbox, BrailleTree}
}
</script>

<style scoped>
.practice-page {
  min-height: calc(100vh - 159px);
  height: auto;
}

.practice-row {
  padding: 15px;
}

.quote-row {
  padding: 15px;
  justify-content: center;
}

.practice-col {
  /* border: 2px solid  gray !important; */
}
.vl {
  border-left: 1px solid lightgrey;
  height: 100%;
  width: 50%
}

</style>