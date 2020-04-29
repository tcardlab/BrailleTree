export const InteractiveCellMixin = {
  data() {
    return {
      click: false,
      events:{
        svg: {
          touchstart: (e)=>this.noScroll(e),
          touchmove: (e)=>this.$parent.touchToggle(e),
          touchend: this.checkAnswer,

          mouseleave: this.checkAnswer,
          mouseup: this.checkAnswer,
          mousedown: () => this.click=true
        },
        circle: {
          mousedown: (e, i) => this.$parent.updateArr(this.cellIndex, i),
          mouseover: (e, i) => this.click&&(this.$parent.updateArr(this.cellIndex, i))
        }
      }
    }
  },
  methods: {
   // Event Handler
    toggleEvents(bool) {
      // auto-run via EventHandlerMixin
      if(this.touch) {
        this.quickEvents(bool, 'svg')
        this.quickEvents(bool, 'circle')
      }
    },

   // Cell
    noScroll(e) {
      // Dragging with one finger won't scroll on touch devices
      if (e.touches.length == 1) { 
        this.$parent.touchToggle(e) // tap will toggle dot
        e.preventDefault()
      }
    },
    checkAnswer() {
      this.click = false
      this.$parent.checkAnswer()
    },

   // Parent
    touchToggle(e) {
      // Get touched element
      var touch = e.touches[0]
      const xy = [touch.clientX, touch.clientY]
      var el = document.elementFromPoint(...xy)
      if (el.tagName === 'circle' && this.lastID !== el.id) {
        // If touching new Dot => update
        this.updateArr(+el.id[0], +el.id[1]) 
        this.lastID = el.id
      } else if (!['rect', 'circle'].includes(el.tagName)){
        // touch off svg => check answer
        this.checkAnswer()
      }
    },
    updateArr(cellindex, i) {
      // Update cells given dot(i) on mouse event
      const alias = this.response[cellindex]
      alias.splice(i, 1, Number(!alias[i]))
    }
  }
}