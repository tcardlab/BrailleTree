// define a mixin object
export const CellClickMixin = {
  data(){
    return{
      click: false,
      events: {
        svg: {
          mousedown: this.clicked,
          mouseup: this.checkAnswer, 
          mouseleave: this.checkAnswer,
        },
        circle: {
          mousedown: (i)=>this.update(this.cellIndex, i),
          mouseover: (i)=>this.click&&(this.update(this.cellIndex, i)),
        }
      }
    }
  },
  mounted() {
    if (this.touch) {
      this.quickEvents(true, 'svg')
      this.quickEvents(true, 'circle')
      this.toggleEvents(true)
    }
  },
  beforeDestroy() {
    if (this.touch) {
      this.quickEvents(false, 'svg')
      this.quickEvents(false, 'circle')
      this.toggleEvents(false)
    }
  },
  methods: {
    // Event Handler
    toggleEvents(bool) {
      const method = bool?'addEventListener':'removeEventListener'

      const el = this.$refs['svg']
      this.assignEvents(this.events['svg'], el, method)

      const elArr = this.$refs['circle']
      elArr.forEach((el, i) => {
        this.assignEvents(this.events['circle'], el, method, i)
      })
    },
    quickEvents(bool, key) {
      // ensure ref name === this.events key
      const ref = this.$refs[key]

      const method = bool?'addEventListener':'removeEventListener'
      if ( typeof ref ===  Array) {
        ref.forEach((el, i) => {
          this.assignEvents(this.events[key], el, method, i)
        })
      } else if ( typeof ref ===  Object ) {
        this.assignEvents(this.events[key], ref, method)
      }
    },
    assignEvents(eventObj, el, method, payload={}) {
      //For each event in eventObj, apply method to given element + payload if needed
      for (let [k, v] of Object.entries(eventObj)) {
        el[method](k, ()=>v(payload))
      }
    },
    // Events
    clicked() {
      this.click=true
    },
    checkAnswer() {
      this.click = false
      this.$parent.checkAnswer()
    },
    update(cellIndex, i) {
      this.$parent.updateArr(cellIndex, i)
    },
  }
}
