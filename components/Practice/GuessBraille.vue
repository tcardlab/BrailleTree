<template>
  <div class='wrapper'>
    <!-- Mobile Scale Wrapper -->
    <div :style="windowWidth<768?mobileStyle:desktopStyle">
      <!-- Interactive Cell: Mouse & touch events separated -->
      <Cell 
        v-for="(arr, i) in response" :key="answer+'-'+i"
        :cellIndex="i"
        :binaryArr="arr"
        touch

        :click="click===i&&(true)"
        @mousedown.native="click=i"
        @mouseup.native="callCheckAnswer()"
        @mouseleave.native="callCheckAnswer()"

        @touchstart.native="noScroll"
        @touchmove.native="touchToggle($event)"
        @touchend.native="callCheckAnswer()"
      />
    </div>

    <!-- Letter + Next Button -->
    <div>
      <h3 class="answer"> {{answer}} </h3>
      <button @click="pick()">Pass</button>
      <p>Score: {{score}} / {{seen-1}}</p>
    </div>

  </div>
</template>

<script>
import Cell from './Cell.vue'
import { ScreenSizeMixin } from './ScreenSizeMixin.js'
import { BraillePickerMixin } from './BraillePickerMixin.js'
import { InteractiveCellMixin } from './InteractiveCellMixin'

export default {
  mixins: [ 
    ScreenSizeMixin, 
    BraillePickerMixin, 
    InteractiveCellMixin
  ],
  components: { Cell },
  data(){
    return {
      response: [],
      score: 0,
      seen: 0
    }
  },
  mounted(){
    this.pick()
  },
  methods: {
    setResponse() {
      // Called in pick() – important to initialize cell with correct shape
      this.response = this.bArr.length===2? [[0,0,0,0,0,0], [0,0,0,0,0,0]]: [[0,0,0,0,0,0]]
    },
    callCheckAnswer () {
      this.checkAnswer()
      this.click = false
      this.lastID = ''
    }
  }
}
</script>

<style scoped>
h3 {
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

.answer {
  font-family: "Times New Roman"
}
</style>