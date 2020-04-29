export const InteractiveCellMixin = {
  data(){
    return {
      lastID: '',
      click: false,
    }
  },
  methods: {
    updateArr(cellindex, i) {
      // Update cells given dot(i) on mouse event
      const id = [cellindex, i].join('')
      if (this.lastID !== id) { // if new dot on drag
        const alias = this.response[cellindex]
        alias.splice(i, 1, Number(!alias[i]))
        this.lastID = id
      }
    },
    // Mobile Interactivity
    touchToggle(e) {
      // Get touched element 
      var touch = e.touches[0]
      const xy = [touch.clientX, touch.clientY]
      var el = document.elementFromPoint(...xy)
      if (el.tagName === 'circle') {
        // If touching new Dot => update
        this.updateArr(+el.id[0], +el.id[1])
      } else if (!['rect', 'circle'].includes(el.tagName)){
        // else => check answer; resets lastID so tap dame dot on/off works
        this.callCheckAnswer()
      }
    },
    noScroll(e) {
      // Dragging with one finger won't scroll on touch devices
      if (e.touches.length == 1) { 
        this.touchToggle(e) // tap will toggle dot
        e.preventDefault()
      }
    },
  }
}