// Picks random glyph(alph, num, punc) and convert to [binary array, ...]
import { mods, denseBraille } from './Data.js'

export const BraillePickerMixin = {
  data() {
    return {
      picked: {},
      answer: '',
      bArr: [
        [0,0,0,0,0,0]
      ],
    }
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
      // Delete current answer and initialize shape/type
      this.setResponse()
    },
    randArr(arr) { 
      var val = arr[arr.length * Math.random() << 0]
      return val
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
    selectTens(arr) {
      var indx = arr[1].length * Math.random() << 0
      var tens = ['','3','36','6'][indx]
      var bArr = arr[0].map((el, i) => {
        if (tens.includes(i+1)) {return 1} else {return el}
      })
      var answer = arr[1][indx]
      if (answer===" "|| answer===this.answer) { // if space or repeat
        return this.selectTens(arr) // try again (wanted to call pick again, but its a pain)
      } else {
        return {ans: answer, bArr: bArr}
      }
    },
  }
}