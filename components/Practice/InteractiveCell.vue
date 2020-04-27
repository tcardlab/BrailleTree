<template>
  <svg id="cell" 
    @mousedown="click=true"
    @mouseup="click=false" 
    @mouseleave="click=false"
  >
    <rect x="-1mm" y="-1mm" fill="lightgreen"/>
    <circle
      v-for="(dot, i) in binaryArr" :key="(dot, i)"
      :id="cellindex+''+i"
      :display="dot === '' ? 'none' : 'visible'"
      :fill="dot ? 'black' : 'rgba(225,225,225,0)'"
      :cx="i>2 ? '3.25mm' : '0.75mm'"
      :cy="(i % 3) * 2.5 + 0.75 + 'mm'"
      x="300"
      r="0.75mm"
      @mousedown="$parent.updateArr(cellindex, i)"
      @mouseover="click?$parent.updateArr(cellindex, i):null"
    />
  </svg>
</template>

<script> 
export default {
  props: ['binaryArr', 'cellindex'],
  data(){
    return{
      click: false
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
