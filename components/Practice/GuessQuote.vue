<template>
  <div class='Hwrapper'>
    <h3>Solve Quotes:</h3>
    <p>NOTE: These quotes do not include numbers, contractions, nor abbreviated words. Correct answers are <strong>NOT</strong> automaticaly submitted.</p>
    <div ref="scroll" :style="windowWidth<768? {'max-height':'150px', 'overflow-y':'scroll'}:{}">
      <div>
      <span class="braille-set" v-for="(arr, i) in qArr" :key="'q-'+i">
        <!-- Maybe add number mod later. Will have to check if prior(i-1) was num too-->
        <cell v-if="isUpperCase(answer.quote[i])" :class="answer" :color="getColor(qMatch[i])" :binaryArr="mods['cap']" />
        <cell :class="answer" :color="getColor(qMatch[i])" :binaryArr="arr"/>
      </span>
      </div>
      <br/>
      <div>
        <span class="braille-set" v-for="(arr, i) in pArr" :key="'p-'+i">
          <cell v-if="isUpperCase(answer.person[i])" :class="answer" :color="getColor(pMatch[i])" :binaryArr="mods['cap']" />
          <cell :class="answer" :color="getColor(pMatch[i])"  :binaryArr="arr"/> 
        </span>
      </div>
    </div>
    <textarea
      ref="quote"
      class="input-quote" 
      v-model="responseQ" 
      placeholder="Quote?"
      @keypress.enter="focus('person')"
    > </textarea>
    <span align="left">
      <strong>–</strong>
      <input
        ref="person"
        class="input-person"
        v-model="responseP"
        placeholder="Person?"
        @keypress.enter="pick()"
        @keydown.delete="responseP.length===0?focus('quote'):{}"
      >
    
      <button @click="pick()">Next</button>
    </span>
  </div>  
</template>

<script>
import Cell from './Cell'
import { quotes, braille, mods } from "./Quotes"

export default {
  components: {Cell},
  data() {
    return {
      mods: mods,
      answer: '',
      qArr: [],
      pArr: [],
      responseQ: '',
      responseP: '',
      score: 0,
      seen: 0,
      index: 0,
      windowWidth: 1000,
    }
  },
  mounted(){
    this.pick()
    this.windowWidth = window.innerWidth
    window.onresize = () => {
        this.windowWidth = window.innerWidth
    }
  },
  watch: {
    responseQ() {
      const rMods = this.responseQ.replace(/[^A-Z]/g, "").length
      const column = (this.responseQ.length+rMods) * 22.677 / this.$refs.scroll.clientWidth | 0
      this.$refs.scroll.scrollTop = column * 37.79

      const qMods = this.answer.quote.replace(/[^A-Z]/g, "").length
      if (this.responseQ.length+rMods === qMods + this.qArr.length) {
        this.focus('person')
      }
    }
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
    getColor(bool) {
      return {true:'green', false:'red', undefined: 'white'}[bool]
    },
    isUpperCase(string){ 
      return /^[A-Z]*$/.test(string)
    },
    pick() {
      this.answer = this.randArr(quotes)
      this.qArr = this.textToBArr(this.answer.quote)
      this.pArr = this.textToBArr(this.answer.person)
      this.responseQ = ''
      this.responseP = ''
      this.focus('quote')
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
    focus(el) {
      this.$refs[el].focus()
    }
  },
}
</script>

<style scoped>

svg {
  margin: 0 !important; /* idk margin-top might be good here */
}

.Hwrapper {
  max-width: 687px;
  width: 100%;
  min-width: 70%;
  height: auto;
  display: flex;
  justify-content: left; 
  align-items: left;
  flex-direction: column;
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

.braille-set {
  display: inline-flex;
}
</style>