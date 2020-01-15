<template>
  <svg id="cell" :x="x" :y="y">
    <rect x="-1mm" y="-1mm"
      width="100%" height="100%" fill="lightgreen"/>
    <circle
      v-for="(dot, i) in Number.isInteger(cellindex)?cellArr:binaryarray" :key="(dot, i)"
      :display="dot === '' ? 'none' : 'visible'"
      :fill="dot ? 'black' : 'rgba(225,225,225,0)'"
      :cx="i>2 ? '3.25mm' : '0.75mm'"
      :cy="(i % 3) * 2.5 + 0.75 + 'mm'"
      x="300"
      r="0.75mm"
      @mousedown="updateArr(i)"
      @mouseup="braillechange(cellindex)"
    />
  </svg>
</template>

<script>
export default {
  props: ['x', 'y','binaryarray', 'cellindex'],
  data(){
    return{
      cellArr: [0,0,0,0,0,0]
    }
  },
  watch:{
    binaryarray(){
      this.cellArr=[0,0,0,0,0,0]
    }
  },
  methods: {
    updateArr(i) {
      var test = this.cellArr
      test[i] = Number(!this.cellArr[i])
      this.cellArr = [...test]
    },
    braillechange: function (i) {
      this.$emit('braillechange', 
                 {bArr:this.cellArr, index:i})
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
  margin: 5mm 0mm 1mm 0mm
}
</style>