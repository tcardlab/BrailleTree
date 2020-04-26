<template>
  <div class='wrapper' @touchmove="test($event)" @touchend="lastID=''">
    <div>
      <cell v-for="(arr,i) in response" :key="answer+'-'+i" :class="answer"
            :cellindex="i"
            :binaryarray="arr"
            :style="`transform: scale(1.5) translate(${i*2}mm, 0mm)`"
            @braillechange="updateResponse"
            @touchstart.native="noScroll"
      /><!--  v-model="response" -->
    </div>
    <div>
    <h3 class="answer"> {{answer}} </h3>
    <button @click="pick()">Pass</button>
    <p>Score: {{score}} / {{seen-1}}</p>
    </div>
  </div>
</template>

<script>
import Cell from "./InteractiveCell.vue"
import _ from "lodash"


const mods = {
  num:[0, 0, 1, 1, 1, 1],
  cap:[0, 0, 0, 0, 0, 1],
}

const braille = {
    1:[[1, 0, 0, 0, 0, 0], ['a','k','u']],
    2:[[1, 1, 0, 0, 0, 0], ['b','l','v']],
    3:[[1, 0, 0, 1, 0, 0], ['c','m','x']],
    4:[[1, 0, 0, 1, 1, 0], ['d','n','y']],
    5:[[1, 0, 0, 0, 1, 0], ['e','o','z']],
    6:[[1, 1, 0, 1, 0, 0], ['f','p','and']],
    7:[[1, 1, 0, 1, 1, 0], ['g','q','for']],
    8:[[1, 1, 0, 0, 1, 0], ['h','r','of']],
    9:[[0, 1, 0, 1, 0, 0], ['i','s','the']],
    0:[[0, 1, 0, 1, 1, 0], ['j','t','with', 'w']],
    ' ':[[0, 0, 0, 0, 0, 0], [' ', "'",'-']],
    ',':[[0, 1, 0, 0, 0, 0], [',',';', '?']],
    ':':[[0, 1, 0, 0, 1, 0], [':','!', '(...)','.']],
 }

export default {
  components: {Cell},
  data(){
    return {
      picked: {},
      answer: '',
      bArr: [[0,0,0,0,0,0]],
      response: [],
      score: 0,
      seen: 0,
      lastID: '',
    }
  },
  created(){
    this.$nextTick(() => {
      this.pick()
    })
  },
  methods: {
    pick() {
      this.picked = this.randObj(braille)
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
    checkAnswer() {
      if(_.isEqual(this.response,this.bArr)) {
        this.score += 1
        this.response = []
        this.pick()
      }
    },
    updateResponse(emitedLoad) {
      this.response.splice(emitedLoad.index, 1, emitedLoad.bArr)
      this.checkAnswer()
    },
    test(e) {
      var touch = e.touches[0]
      const xy = [touch.clientX, touch.clientY]
      var el = document.elementFromPoint(...xy)
      if (el.tagName === 'circle' && this.lastID !== el.id) { 
        var arr = this.response[+el.id[0]] // eslint-disable-line
        arr = arr.splice(+el.id[1], 1, Number(!arr[+el.id[1]]))
        this.lastID = el.id
        this.checkAnswer()
      }
    },
    noScroll(e) {
      if (e.touches.length == 1) { 
        this.test(e)
        e.preventDefault() // Dragging with one finger won't scroll on touch devices
      }
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