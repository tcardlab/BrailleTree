<template>
  <svg id="cell">
    <rect :fill="color"/>
    <circle
      v-for="(dot, i) in binaryArr" :key="(dot, i)"
      :display="dot === '' ? 'none' : 'visible'"
      :fill="dot ? 'black' : 'rgba(0,0,0,0)' /*'none' is not interactive*/"
      :cx="i>2 ? '4.25mm' : '1.75mm'"
      :cy="(i % 3) * 2.5 + 1.75 + 'mm'"
      r="0.75mm"

      :id="touch&&(cellIndex+''+i)"
      @mousedown="touch&&($parent.updateArr(cellIndex, i))"
      @mouseover="click&&($parent.updateArr(cellIndex, i))"
    />
  </svg>
</template>

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
    color: {
      type: String,
      default: '#9dd' //#d1ecf1
    },
    touch: {
      type: Boolean
    },
    click: {
      type: Boolean
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
