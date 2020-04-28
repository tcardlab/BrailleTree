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
