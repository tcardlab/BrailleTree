export const InteractiveCellMixin = {
  /* data() {
    return {
      events:{
        wrapper: {
          touchmove: (e) => this.touchToggle(e),
          touchend: this.checkAnswer
        },
        svg: {
          touchstart: (e) => this.noScroll(e),
          mouseleave: this.checkAnswer(),
          mousedown: (i) => this.click=i,
          mouseup: this.checkAnswer()
        },
        circle: {
          mousedown: (i) => this.updateArr(this.cellIndex, i),
          mouseover: (i) => this.click&&(this.updateArr(this.cellIndex, i))
        }
      }
    }
  }, */
  methods: {
    // Event Handler
    //toggleEvents(bool) {
      //this.quickEvents(bool, wrapper, payload={})
    //},
    // Interactivity
    updateArr(cellindex, i) {
      // Update cells given dot(i) on mouse event
      const alias = this.response[cellindex]
      alias.splice(i, 1, Number(!alias[i]))
    },

    // Mobile Interactivity
    touchToggle(e) {
      // Get touched element 
      var touch = e.touches[0]
      const xy = [touch.clientX, touch.clientY]
      var el = document.elementFromPoint(...xy)
      // If touching new Dot => update; else => check answer
      if (el.tagName === 'circle' && this.lastID !== el.id) {
        this.updateArr(+el.id[0], +el.id[1]) 
        this.lastID = el.id
      } else if (!['rect', 'circle'].includes(el.tagName)){
        this.checkAnswer()
      }
    },
    noScroll(e) {
      // Dragging with one finger won't scroll on touch devices
      if (e.touches.length == 1) { 
        this.touchToggle(e) // tap will toggle dot
        e.preventDefault()
      }
    }
  }
}