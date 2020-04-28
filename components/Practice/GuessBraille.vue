<template>
  <div class='wrapper' @touchmove="touchToggle($event)" @touchend="checkAnswer()">
    <div :style="windowWidth<768?mobileStyle:desktopStyle">
        <Cell 
          v-for="(arr, i) in response" :key="answer+'-'+i" :class="answer"
          :cellIndex="i"
          :binaryArr="arr"
          @touchstart.native="noScroll"
          touch
        />
    </div>
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
import { mods, denseBraille } from './Quotes'

export default {
  components: { Cell },
  data(){
    return {
      picked: {},
      answer: '',
      bArr: [[0,0,0,0,0,0]],
      response: [],
      score: 0,
      seen: 0,
      lastID: '',
      windowWidth: 0
    }
  },
  mounted() {
    this.pick()
    this.windowWidth = window.innerWidth
    window.onresize = () => {
      this.windowWidth = window.innerWidth
    }
  },
  computed: {
    mobileStyle() {
      const cell = 22.677 // 6mm * 3.779px/mm
      const scale = (0.5 * this.windowWidth) / (2 * cell) // both cells should fill half the screen
      return {
        transform: `scale(${scale}) translate(0%, 0%)`, 
        'margin-top': `${(scale * 4) - 10}mm`,
        'margin-bottom': `${(scale * 5.5) - 5}mm`
      }
    },
    desktopStyle() {
      const scale = 1.5 // both cells should fill half the screen
      return {
        transform: `scale(${scale}) translate(0%, 0%)`, 
        'margin-top': `${(scale * 4) - 10}mm`,
        'margin-bottom': `${(scale * 5.5) - 5}mm`
      }
    }
  },
  methods: {
    checkAnswer() { // Check Answer
      this.lastID = ''
      if(_.isEqual(this.response, this.bArr)) {
        this.score += 1
        this.response = []
        this.pick()
      }
    },
    pick() {
      this.picked = this.randObj(denseBraille)
      this.seen += 1
      var answer = this.selectTens(this.picked.val)
      if (!isNaN(parseInt(this.picked.key))){
        // Num or Letter
        var mod = this.randArr(['low', 'cap' , 'num'])
        switch(mod){
          case 'cap': // multiple potential caps
            this.bArr = [mods['cap'], answer.bArr]
            this.answer = answer.ans.replace(/^\w/, c => c.toUpperCase())//charAt(0).toUpperCase()
            //console.log(answer)
            break
          case 'num': // Num only 1 choice
            this.bArr = [mods['num'], this.picked.val[0]]
            this.answer = this.picked.key
            break
          default: // multiple tens choices
            this.bArr = [answer.bArr]
            this.answer = answer.ans
            break
        }
      } else {
        // Punctuation
        this.bArr = [answer.bArr]
        this.answer = answer.ans
      }
      this.response = this.bArr.length===2? [[0,0,0,0,0,0], [0,0,0,0,0,0]]: [[0,0,0,0,0,0]]
    },
    randObj(obj) { 
      var keys = Object.keys(obj)
      var k = keys[keys.length * Math.random() << 0]
      return {key:k, val:obj[k]}
    },
    randArr(arr) { 
      var val = arr[arr.length * Math.random() << 0]
      return val
    },
    selectTens(arr) {
      var indx = arr[1].length * Math.random() << 0
      var tens = ['','3','36','6'][indx]
      var bArr = arr[0].map((el, i) => {
        if (tens.includes(i+1)) {return 1} else {return el}
      })
      var answer = arr[1][indx]
      if (answer===" "|| answer===this.answer) { // if space of repeat
        return this.selectTens(arr) // try again (wanted to call pick again, but its a pain)
      } else {
        return {ans: answer, bArr: bArr}
      }
    },
    touchToggle(e) {
      var touch = e.touches[0]
      const xy = [touch.clientX, touch.clientY]
      var el = document.elementFromPoint(...xy)
      if (el.tagName === 'circle' && this.lastID !== el.id) { 
        var arr = this.response[+el.id[0]] // eslint-disable-line
        arr = arr.splice(+el.id[1], 1, Number(!arr[+el.id[1]]))
        this.lastID = el.id
      } else if (!['rect', 'circle'].includes(el.tagName)){
        this.checkAnswer()
      }
    },
    noScroll(e) {
      if (e.touches.length == 1) { 
        this.touchToggle(e)
        e.preventDefault() // Dragging with one finger won't scroll on touch devices
      }
    },
    updateArr(cellindex, i) {
      const alias = this.response[cellindex]
      alias.splice(i, 1, Number(!alias[i]))
    }
  }
}
</script>

<style>
h3 {
  display: inline;
  margin: 0px;
}

.wrapper {
  width: 100%;
  height: auto;
  /* background-color: red; */
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