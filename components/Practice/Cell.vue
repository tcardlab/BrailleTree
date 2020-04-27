<template>
  <svg id="cell" 
    @mousedown="touch&&(click=true)"
    @mouseup="touch&&(checkAnswer())" 
    @mouseleave="touch&&(checkAnswer())"
  >
    <rect :fill="color"/>
    <circle
      v-for="(dot, i) in binaryArr" :key="(dot, i)"
      :display="dot === '' ? 'none' : 'visible'"
      :fill="dot ? 'black' : 'rgba(0,0,0,0)' /*'none' is not interactive*/"
      :cx="i>2 ? '4.25mm' : '1.75mm'"
      :cy="(i % 3) * 2.5 + 1.75 + 'mm'"
      r="0.75mm"

      :id="touch&&(cellIndex+''+i)"
      @mousedown="touch&&(update(cellIndex, i))"
      @mouseover="click&&(update(cellIndex, i))"
    />
  </svg>
</template>

<!-- move touch stuff to mixin and explode with v-bind="attrs" -->

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
      click: false
    }
  },
  methods: {
    checkAnswer() {
      this.click = false
      this.$parent.checkAnswer()
    },
    update(cellIndex, i) {
      this.$parent.updateArr(cellIndex, i)
    }
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
