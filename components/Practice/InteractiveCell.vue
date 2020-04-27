<template>
  <svg id="cell" 
    @mousedown="click=true"
    @mouseup="braillechange(cellindex)" 
    @mouseleave="braillechange(cellindex)"
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
  props: ['i', 'binaryarray', 'cellindex'],
  data(){
    return{
      cellArr: [0,0,0,0,0,0],
      click: false
    }
  },
  methods: {
    updateArr(i) {
      this.cellArr.splice(i, 1, Number(!this.binaryarray[i]))
    },
    braillechange: function (i) {
      this.$emit('braillechange', {bArr:this.cellArr, index:i})
      this.click=false
    }
  }
}

</script>

<style>
#cell {
  width: 6mm;
  height: 8.5mm;
  overflow: visible;
  stroke: black;
  /* transform: translate(2mm, 2mm) */
  /*margin: 5mm 0mm 0mm 0mm*/
}
</style>