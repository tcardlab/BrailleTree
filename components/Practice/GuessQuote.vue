<template>
  <div class='Hwrapper'>
    <div>
      <cell v-for="(arr, i) in qArr" :key="i" :class="answer" :color="qMatch[i]" :binaryarray="arr"/>
    </div>
    <br>
    <div><cell v-for="(arr, i) in pArr" :key="i" :class="answer" :color="pMatch[i]"  :binaryarray="arr"/> 
    </div>
    <textarea
           class="input-quote" 
           v-model="responseQ" 
           placeholder="Quote?"
           >
    </textarea>
    <span align="left">
      <strong>–</strong>
      <input
           class="input-person"
           v-model="responseP"
           placeholder="Person?"
           >
    
      <button @click="pick()">Next</button>
    </span>
  </div>  
</template>

<script>
import Cell from "./HighlightCell.vue"

/* const mods = {
  num:[0, 0, 1, 1, 1, 1],
  cap:[0, 0, 0, 0, 0, 1],
} */

const quotes = [
  {'quote': "believe in the me that believes in you",
   'person': "Kamina"},
  {'quote': "life is like a pencil that will surely run out, but will leave the beautiful writing of life.",
   'person': "Nami"}
]

const braille = {
  'a': [1, 0, 0, 0, 0, 0],
  'b': [1, 1, 0, 0, 0, 0],
  'c': [1, 0, 0, 1, 0, 0],
  'd': [1, 0, 0, 1, 1, 0],
  'e': [1, 0, 0, 0, 1, 0],
  'f': [1, 1, 0, 1, 0, 0],
  'g': [1, 1, 0, 1, 1, 0],
  'h': [1, 1, 0, 0, 1, 0],
  'i': [0, 1, 0, 1, 0, 0],
  'j': [0, 1, 0, 1, 1, 0],
  'k': [1, 0, 1, 0, 0, 0],
  'l': [1, 1, 1, 0, 0, 0],
  'm': [1, 0, 1, 1, 0, 0],
  'n': [1, 0, 1, 1, 1, 0],
  'o': [1, 0, 1, 0, 1, 0],
  'p': [1, 1, 1, 1, 0, 0],
  'q': [1, 1, 1, 1, 1, 0],
  'r': [1, 1, 1, 0, 1, 0],
  's': [0, 1, 1, 1, 0, 0],
  't': [0, 1, 1, 1, 1, 0],
  'u': [1, 0, 1, 0, 0, 1],
  'v': [1, 1, 1, 0, 0, 1],
  'w': [0, 1, 0, 1, 1, 1],
  'x': [1, 0, 1, 1, 0, 1],
  'y': [1, 0, 1, 1, 1, 1],
  'z': [1, 0, 1, 0, 1, 1],
  '1': [1, 0, 0, 0, 0, 0],
  '2': [1, 1, 0, 0, 0, 0],
  '3': [1, 0, 0, 1, 0, 0],
  '4': [1, 0, 0, 1, 1, 0],
  '5': [1, 0, 0, 0, 1, 0],
  '6': [1, 1, 0, 1, 0, 0],
  '7': [1, 1, 0, 1, 1, 0],
  '8': [1, 1, 0, 0, 1, 0],
  '9': [0, 1, 0, 1, 0, 0],
  '0': [0, 1, 0, 1, 1, 0],
  ',': [0, 1, 0, 0, 0, 0],
  ';': [0, 1, 1, 0, 0, 0],
  ':': [0, 1, 0, 0, 1, 0],
  '.': [0, 1, 0, 0, 1, 1],
  '?': [0, 1, 1, 0, 0, 1],
  '!': [0, 1, 1, 0, 1, 0],
  "'": [0, 0, 1, 0, 0, 0],
  '-': [0, 0, 1, 0, 0, 1],
  ' ': [0, 0, 0, 0, 0, 0]
 }

export default {
  components: {Cell},
  data() {
    return {
      picked: {},
      answer: '',
      qArr: [],
      pArr: [],
      responseQ: '',
      responseP: '',
      score: 0,
      seen: 0,
      index: 0,
    }
  },
  created(){
    this.pick()
  },
  computed: {
    qMatch(){
      var resp = this.responseQ
      var ans = this.answer.quote
      var len = Math.min(this.responseQ.length, this.answer.quote.length)
      var compare = []
      for(let i = 0; i<len; i++) {
        compare.push(resp[i]===ans[i])
      }
      return compare
    },
    pMatch(){ //condensed version of the prior method
      var comp = Number(this.responseP.length <= this.answer.person.length)
      var strs = [[...this.answer.person], [...this.responseP]]
      return strs[comp].map((s,i) => s===strs[1-comp][i])
    } 
  },
  methods: {
    pick() {
      this.answer = this.randArr(quotes)
      this.qArr = this.textToBArr(this.answer.quote)
      this.pArr = this.textToBArr(this.answer.person)
      this.responseQ = ''
      this.responseP = ''
    },
    textToBArr(quote) {
      return [...quote.toLowerCase()].map(s => braille[s])
    },
    randArr(arr) { 
      var index = arr.length * Math.random() << 0
      // prevent repeat
      this.index = index===this.index? (index+1)%arr.length: index
      var val = arr[this.index]
      return val
    },
  },
}
</script>

<style scoped>
/* #cell {
  width: 6mm;
  height: 8.5mm;
  position: relative;
  display: inline;
  overflow: visible;
  stroke: black;
} */

.Hwrapper {
  width: 80%;
  height: auto;
  display: flex;
  justify-content: left; 
  align-items: left;
  /* background-color: red; */
  border: 2px solid  gray !important;
  flex-direction: column;
  padding: 15px;
}

.input-quote {
  width: 100%;
  min-height: 50px;
  height: auto;
  vertical-align: top !important;
  overflow-wrap: normal !important;
}

textarea {
  max-width: 100%;
  margin: 5px;
}

input {
  margin-top: 8px !important;
  justify-content: left;
}
</style>