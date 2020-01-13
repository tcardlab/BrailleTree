<template>
  <svg id="cell" :x="x" :y="y">
    <rect x="-1mm" y="-1mm"
      width="100%" height="100%" fill="lightgreen"/>
    <circle
      v-for="(dot, i) in binaryarray" :key="(dot, i)"
      :display="dot === '' ? 'none' : 'visible'"
      :fill="dot ? 'black' : 'none'"
      :cx="i>2 ? '3.25mm' : '0.75mm'"
      :cy="(i % 3) * 2.5 + 0.75 + 'mm'"
      x="300"
      r="0.75mm"
    />
  </svg>  
</template>

<script>
export default {
  props: ['x', 'y','binaryarray'],
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