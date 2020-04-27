<template>
  <svg id="cell" 
    @mousedown="click=true"
    @mouseup="checkAnswer()" 
    @mouseleave="checkAnswer()"
  >
    <rect x="-1mm" y="-1mm" fill="lightgreen"/>
    <circle
      v-for="(dot, i) in binaryArr" :key="(dot, i)"
      :id="cellIndex+''+i"
      :display="dot === '' ? 'none' : 'visible'"
      :fill="dot ? 'black' : 'rgba(225,225,225,0)'"
      :cx="i>2 ? '3.25mm' : '0.75mm'"
      :cy="(i % 3) * 2.5 + 0.75 + 'mm'"
      x="300"
      r="0.75mm"
      @mousedown="update(cellIndex, i)"
      @mouseover="click?update(cellIndex, i):null"
    />
  </svg>
</template>

<script> 
export default {
  props: ['binaryArr', 'cellIndex'],
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
}
</style>
