<template>
  <!-- 
    @touchmove="touchToggle($event)"
    @touchend="checkAnswer()" 
  -->
  <div
    class='wrapper'
    ref="wrapper"
  >
    <!-- Mobile Scale Wrapper -->
    <div :style="windowWidth<768?mobileStyle:desktopStyle">
      <!-- Interactive Cell -->
      <Cell 
        v-for="(arr, i) in response" :key="answer+'-'+i"
        :cellIndex="i"
        :binaryArr="arr"

        @touchstart.native="noScroll"

        @mouseup.native="checkAnswer()"
        @mouseleave.native="checkAnswer()"
        @mousedown.native="click=i"
        :click="click===i&&(true)" 
        touch
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
import _ from "lodash"
import { ScreenSizeMixin } from './ScreenSizeMixin.js'
import { BraillePickerMixin } from './BraillePickerMixin.js'
// interactivity
import { EventHandlerMixin } from '../EventHandlerMixin.js'
import { InteractiveCellMixin } from './InteractiveCellMixin'

export default {
  mixins: [ 
    ScreenSizeMixin,     // Mobile Scale Wrapper
    BraillePickerMixin,  // pick()
    EventHandlerMixin,   // Applies events
    InteractiveCellMixin // interactive events
  ],
  components: { Cell },
  data(){
    return {
      response: [],
      lastID: '',
      click: false,
      // UI
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
    checkAnswer() {
      this.lastID = ''
      this.click = false
      if(_.isEqual(this.response, this.bArr)) {
        this.score += 1
        this.pick()
      }
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