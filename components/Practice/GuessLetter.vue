<template>
  <div class='wrapper'>
    <br/>
    <!-- Mobile Scale Wrapper -->
    <div :style="windowWidth<768?mobileStyle:desktopStyle">
      <!-- static Cell -->
      <cell 
        v-for="(arr,i) in bArr" :key="answer+'-'+i" 
        :cellIndex="i"
        :binaryArr="arr"
      />
    </div>

    <!-- Input UI -->
    <div>
      <input
        v-model="response" 
        placeholder="answer?"
        @keyup="checkAnswer"
      >
      <button @click="pick()">Pass</button>
      <p style="transition: all 1s">Score: {{score}} / {{seen-1}}</p>
    </div>

  </div>
</template>

<script>
import Cell from './Cell.vue'
import { ScreenSizeMixin } from './ScreenSizeMixin.js'
import { BraillePickerMixin } from './BraillePickerMixin.js'

export default {
  mixins: [ ScreenSizeMixin, BraillePickerMixin ],
  components: {Cell},
  data() {
    return{
      response: '',
      score: 0,
      seen: 0
    }
  },
  mounted(){
    this.pick()
  },
  methods: {
    setResponse() {
      // Called in pick() - resets answer after correct answer
      this.response = ''
    }
  }
}
</script>

<style scoped>
h2 {
  display: inline;
  margin: 0px;
}

.wrapper {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  user-select: none;
}

input {
  margin-top: 5px;
  width: 50%;
}
</style>