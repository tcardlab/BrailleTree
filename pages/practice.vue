<template>
  <b-container class="practice-page">
    <b-row class="practice-row">
      <b-col class="practice-col" md="6">
         <h3>Guess The Braille:</h3>
         <Guess-Braille/> 
      </b-col>
      <b-col class="practice-col" md="6"> 
        <h3>Guess The Letter:</h3>
        <Guess-Letter/>  
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import GuessBraille from "../components/Practice/GuessBraille.vue"
import GuessLetter from "../components/Practice/GuessLetter.vue"
export default {
  layout: 'basic',
  components: {GuessBraille, GuessLetter}
}
</script>

<style scoped>
.practice-page {
  height: calc(100vh - 159px);
}

.practice-row {
  padding: 15px;
}

.practice-col {
  border: 2px solid  gray !important;
}
</style>