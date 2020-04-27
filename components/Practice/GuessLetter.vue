<template>
  <div class='wrapper'>
    <div>
      <cell 
        v-for="(arr,i) in bArr" 
        :cellIndex="i"
        :binaryArr="arr"
        :style="`transform: scale(1.5) translate(${i*2}mm, 0mm)`" 
        :key="answer+'-'+i" 
        :class="answer"
      />
    </div>
    <div>
      <input v-model="response" 
            placeholder="answer?"
            @keyup="checkAnswer"> <!--{{answer}}-->
      <button @click="pick()">Pass</button>
      <p style="transition: all 1s">Score: {{score}} / {{seen-1}}</p>
    </div>
  </div>
</template>

<script>
import Cell from './Cell.vue'
import { mods, denseBraille } from './Quotes'

export default {
  components: {Cell},
  data() {
    return{
      picked: {},
      answer: '',
      bArr: [[0,0,0,0,0,0]],
      response: '',
      score: 0,
      seen: 0,
    }
  },
  created(){
    this.$nextTick(() => {
      this.pick()
    })
  },
  methods: {
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
            this.answer = answer.ans.replace(/^\w/, c => c.toUpperCase())
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
    },
    randObj(obj) { 
      var keys = Object.keys(obj)
      var k = keys[keys.length * Math.random() << 0]
      if (k === this.picked.key) {  // prevents repeats AND ensures good spread of types
        var output = this.randObj(obj)
        return output
      } else {
         return {key:k, val:obj[k]}
      }
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
      return {ans: arr[1][indx], bArr: bArr}
    },
    checkAnswer() {
      if(this.response===this.answer) {
        this.score += 1
        this.response = ''
        this.pick()
      }
    }
  },
}
</script>

<style scoped>
h2 {
  display: inline;
  margin: 0px;
}

#cell {
  transform: scale(1.5);
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

input {
  margin-top: 5px;
  width: 50%;
}
</style>