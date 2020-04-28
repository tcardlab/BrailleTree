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
      const svg = this.$refs.svg
      this.assignEvents(this.events.svg, svg, 'addEventListener' )

      const circleArr = this.$refs.circle
      circleArr.forEach((c, i) => {
        this.assignEvents(this.events.circle, c, 'addEventListener', i)
      })
    }
  },
  beforeDestroy() {
    if (this.touch) {
      const svg = this.$refs.svg
      this.assignEvents(this.events.svg, svg, 'removeEventListener' )

      const circleArr = this.$refs.circle
      circleArr.forEach((c, i) => {
        this.assignEvents(this.events.circle, c, 'removeEventListener', i)
      })
    }
  },
  methods: {
    assignEvents(eventObj, el, method, payload={}) {
      //For each event in eventObj, apply method to given element + payload if needed
      for (let [k, v] of Object.entries(eventObj)) {
        el[method](k, ()=>v(payload))
      }
    },
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
