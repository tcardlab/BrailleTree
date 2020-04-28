<template>
  <svg id="cell" 
    ref="svg"
  >
    <rect :fill="color"/>
    <circle
      v-for="(dot, i) in binaryArr" :key="(dot, i)"
      :display="dot === '' ? 'none' : 'visible'"
      :fill="dot ? 'black' : 'rgba(0,0,0,0)' /*'none' is not interactive*/"
      :cx="i>2 ? '4.25mm' : '1.75mm'"
      :cy="(i % 3) * 2.5 + 1.75 + 'mm'"
      r="0.75mm"

      ref="circle"
      :id="touch&&(cellIndex+''+i)"
    />
  </svg>
</template>

<!-- move touch stuff to mixin and explode with v-bind="attrs" -->
<!-- v-bind="touch&&(attr.circle)" -->
<script> 
export default {
  props: {
    binaryArr: {
      type: Array,
      required: true,
      default: () => [0,0,0,0,0,0]
    },
    cellIndex: {
      type: [Number, String],
    },
    touch: {
      type: Boolean
    },
    color: {
      type: String,
      default: 'lightgreen'
    }
  },
  data(){
    return{
      click: false,
      events: {
        svg: {
          mousedown: 'this.clicked()',
          mouseup: 'this.checkAnswer()', 
          mouseleave: "this.touch&&(thischeckAnswer())",
        },
        circle: {
          mousedown: "touch&&(update(cellIndex, i))",
          mouseover: "click&&(update(cellIndex, i))",
        }
      }
    }
  },
  mounted() {
    if (this.touch) {
      const svg = this.$refs.svg
      /* this.events.svg.forEach((k,v) => {
        svg.addEventListener(k, ()=>eval(v))
      }) */
      svg.addEventListener('mousedown', ()=>this.clicked()) 
      svg.addEventListener('mouseup', ()=>this.checkAnswer())
      svg.addEventListener('mouseleave', ()=>this.checkAnswer())

      const circleArr = this.$refs.circle
      circleArr.forEach((c, i) => {
        c.addEventListener('mousedown', ()=>this.update(this.cellIndex, i)) 
        c.addEventListener('mouseover', ()=>this.click&&(this.update(this.cellIndex, i)))
      })
    }
  },
  beforeDestroy() {
    if (this.touch) {
      const svg = this.$refs.svg
      svg.removeEventListener('mousedown', ()=>this.clicked()) 
      svg.removeEventListener('mouseup', ()=>this.checkAnswer())
      svg.removeEventListener('mouseleave', ()=>this.checkAnswer())
    }
  },
  methods: {
    $eval (payload) {
      return eval(payload) // eslint-disable-line
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
</script>

<style>
#cell, rect {
  width: 6mm;
  height: 8.5mm;
  overflow: visible;
  stroke: black;
  margin: 5mm 0mm 3mm 0mm
}
</style>
