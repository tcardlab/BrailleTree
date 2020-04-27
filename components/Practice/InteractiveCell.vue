<template>
  <svg id="cell" 
    @mousedown="click=true"
    @mouseup="click=false" 
    @mouseleave="click=false"
  >
    <rect x="-1mm" y="-1mm" fill="lightgreen"/>
    <circle
      v-for="(dot, i) in response[cellindex]" :key="(dot, i)"
      :id="cellindex+''+i"
      :display="dot === '' ? 'none' : 'visible'"
      :fill="dot ? 'black' : 'rgba(225,225,225,0)'"
      :cx="i>2 ? '3.25mm' : '0.75mm'"
      :cy="(i % 3) * 2.5 + 0.75 + 'mm'"
      x="300"
      r="0.75mm"
      @mousedown="updateArr(i)"
      @mouseover="click?updateArr(i):null"
    />
  </svg>
</template>

<script> 
export default {
  props: ['response', 'cellindex'],
  data(){
    return{
      click: false
    }
  },
  methods: {
    updateArr(i) {
      const alias = this.response[this.cellindex]
      alias.splice(i, 1, Number(!alias[i]))
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
}
</style>