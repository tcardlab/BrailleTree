<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col> <Guess-Braille/> </b-col>
      <b-col> <Guess-Letter/>  </b-col>
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

<style>

</style>