<!--Defines alphabet and places letters in tree structure-->
<template>
  <svg :x="x" :y="y" style="overflow:visible;">
    <letter :size="_$.size" :glyph="LetterArray(_$.display)" :dx="0" :dy="0" />
    <g v-for="(j, j2) in [-1, 0, 1]" :key="j2">
      <letter
        :size="_$.size"
        :glyph="LetterArray(_$.display, j2)"
        :dx="_$.x1 + 'mm'"
        :dy="j * _$.y1 + 'mm'"
      />
      <letter
        v-for="(k, k2) in [-1, 0, 1]"
        :key="k2"
        :size="_$.size"
        :glyph="LetterArray(_$.display, j2, k2)"
        :dx="+_$.x1 + +_$.x2 + 'mm'"
        :dy="k * _$.y2 + j * _$.y1 + 'mm'"
      />
    </g>
  </svg>
</template>

<script>
import Letter from './Letter.vue'

export default {
  components: {
    Letter
  },
  props: ['x', 'y'],
  methods: {
    // Top-2-Bottom
    LetterArray: function(pick, for1, for2) {
      const numbers = '12,34567890.'.split(/'|/)
      let alph = 'AB,CDEFGHIJ.KL;MNOPQRST!UV?XYZ'
        .split(/'|/)
        .concat(['and', 'for', 'of', 'the', 'with', '(...)'])
      alph = numbers.concat(alph)
      if (typeof for1 === 'undefined') {
        return ['#', ' ', "'", '-'][pick] // First cell
      } else if (typeof for2 === 'undefined') {
        return alph[for1 + pick * 12] // 1st branch cells
      } else {
        return alph[3 + for1 * 3 + for2 + pick * 12] // 2nd branch cells
      }
    }
  }
}
</script>
