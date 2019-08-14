<!-- Places All letters and numbers in tree structure-->
<!-- Very similar to Letters, but i used v-html for better formatting -->
<template>
  <svg :x="x" :y="y" style="overflow:visible;">
    <letter :size="size" v-html="LetterArray()" :dx="0" :dy="0"></letter>
    <g v-for="(j, j2) in [-1, 0, 1]" :key="j2">
      <letter
        :size="size"
        v-html="LetterArray(j2)"
        :dx="x1 - 1.5 + 'mm'"
        :dy="j * y1 + 'mm'"
      />
      <!-- ^made room for number x1-? -->
      <letter
        v-for="(k, k2) in [-1, 0, 1]"
        :key="k2"
        :size="size"
        v-html="LetterArray(j2, k2)"
        :dx="+x1 + +x2 + 'mm'"
        :dy="k * y2 + j * y1 + 'mm'"
      />
    </g>
  </svg>
</template>

<script>
import Letter from './Letter.vue'

// retruns SVG-subscript html for numbers
const rawHtml = function(size, number) {
  // <tspan baseline-shift="sub" :font-size="size / 2 + 'mm'" dx="-1em">
  return `<tspan font-size="${size}mm"> ${number} </tspan>`
}

// Defines alph,nums,etc in branch order, indexs list, and returns glyph
const findGlyph = function(num, for1, for2) {
  const alph = 'AB,CDEFGHIJ.KL;MNOPQRST!UV?XYZ'
    .split(/'|/)
    .concat(['and', 'for', 'of', 'the', 'with', '(...)'])
    .concat("12''34567890''".split(/'|/))
  if (typeof for2 === 'undefined') {
    return alph[for1 + num * 12]
  } else {
    return alph[3 + for1 * 3 + for2 + num * 12]
  }
}

export default {
  components: {
    Letter
  },
  props: ['x', 'y', 'x1', 'x2', 'y1', 'y2', 'size', 'display', 'gap'],
  methods: {
    // Top-2-Bottom
    LetterArray: function(for1, for2) {
      if (typeof for1 === 'undefined') {
        // First cell
        const init = [' ', "'", '-', '']
        const disp = +this.gap + +this.size + 3 // column displacement
        return (
          init[0] +
          `<tspan x="${-disp}mm" > ${init[1]} <tspan>` +
          `<tspan x="${-disp / 2}mm" > ${init[2]} <tspan>`
        )
      } else if (typeof for2 === 'undefined') {
        // 1st branch cells
        const range = [0, 1, 2, 3]
        const [col1, col2, col3, num] = range.map(i => findGlyph(i, for1))
        const x = +this.x1 + 2 // 2nd branch location
        const disp = +this.gap + +this.size - 3 // column displacement
        return (
          col1 +
          rawHtml(this.size / 2, num) +
          `<tspan x="${x - disp * 2}mm" dy='10mm'> ${col2} <tspan>` +
          `<tspan x="${x - disp}mm"> ${col3} <tspan>`
        ) // dy affexts both <tspan> for some reason...?
      } else {
        // 2nd branch cells
        /* eslint-disable one-var, no-var, no-redeclare */
        const range = [0, 1, 2, 3]
        var [col1, col2, col3, num] = range.map(i => findGlyph(i, for1, for2))
        const x = +this.x1 + +this.x2 // 2nd branch location
        const disp = +this.gap + +this.size + 1 // column displacement
        return (
          col1 +
          rawHtml(this.size / 2, num) +
          `<tspan x="${x + disp}mm" > ${col2} <tspan>` +
          `<tspan x="${x + disp * 2}mm" > ${col3} <tspan>`
        )
      }
    }
  }
}
</script>
