<template>
  <div
    class='wrapper'
    @touchmove="touchToggle($event)"
    @touchend="checkAnswer()"
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

export default {
  mixins: [ ScreenSizeMixin, BraillePickerMixin ],
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
    },

    // Interactivity
    updateArr(cellindex, i) {
      // Update cells given dot(i) on mouse event
      const alias = this.response[cellindex]
      alias.splice(i, 1, Number(!alias[i]))
    },

    // Mobile Interactivity
    touchToggle(e) {
      // Get touched element 
      var touch = e.touches[0]
      const xy = [touch.clientX, touch.clientY]
      var el = document.elementFromPoint(...xy)
      // If touching new Dot => update; else => check answer
      if (el.tagName === 'circle' && this.lastID !== el.id) {
        this.updateArr(+el.id[0], +el.id[1]) 
        this.lastID = el.id
      } else if (!['rect', 'circle'].includes(el.tagName)){
        this.checkAnswer()
      }
    },
    noScroll(e) {
      // Dragging with one finger won't scroll on touch devices
      if (e.touches.length == 1) { 
        this.touchToggle(e) // tap will toggle dot
        e.preventDefault()
      }
    },
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