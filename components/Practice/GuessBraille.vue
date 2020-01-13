<template>
  <div class='wrapper'>
    <div>
      <cell v-for="(arr,i) in bArr" :key="i" :class="answer"
            :cellindex="i"
            :binaryarray="arr"
            @braillechange="updateResponse"/>
    </div>
    <div>
    <h3> {{answer}} </h3>
    <button @click="pick()">Pass</button>
    <p>Score: {{score}} / {{seen-1}}</p>
    </div>
  </div>
</template>

<script>
import Cell from "./Cell.vue"
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
      bArr: [],
      response: [],
      score: 0,
      seen: 0,
    }
  },
  created(){
    this.pick()
  },
  methods: {
    pick() {
      this.picked = this.randObj(braille)
      this.seen += 1
      var answer = this.selectTens(this.picked.val)
      if (parseInt(this.picked.key)){
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
      return {ans: arr[1][indx], bArr: bArr}
    },
    checkAnswer() {
      if(_.isEqual(this.response,this.bArr)) {
        this.score += 1
        this.response = []
        this.pick()
      }
    },
    updateResponse(variable) {
      var test = this.response
      test[variable.index] = variable.bArr
      this.response = [...test]
      this.checkAnswer()
    },
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
  background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>