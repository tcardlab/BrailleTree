<template>
  <svg id="cell" 
    @mousedown="click=true"
    @mouseup="click=false" 
    @mouseleave="click=false"
  >
    <rect x="-1mm" y="-1mm"
      width="6mm" height="8.5mm" fill="lightgreen"/>
    <circle
      v-for="(dot, i) in binaryarray" :key="(dot, i)"
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
//@mouseover="updateArr(i)"
export default {
  props: ['binaryarray', 'cellindex'],
  data(){
    return{
      cellArr: this.binaryarray,
      click: false
    }
  },
  methods: {
    updateArr(i) {
      var tmp =  [...this.binaryarray]
      tmp.splice(i, 1, Number(!this.binaryarray[i]))
      this.$emit('braillechange', {bArr: tmp, index: this.cellindex})
    },
  }
}

</script>

<style>
#cell {
  width: 6mm;
  height: 8.5mm;
  overflow: visible;
  stroke: black;
}
</style>