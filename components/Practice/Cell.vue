<template>
  <svg id="cell" ref="svg">
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

<script> 
import { CellClickMixin } from './CellClickMixin.js'
export default {
  mixins: [CellClickMixin],
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
