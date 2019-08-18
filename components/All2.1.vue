<!-- Places All letters and numbers in tree structure-->
<!-- Very similar to Letters, but i used v-html for better formatting -->
<template>
  <svg :x="x" :y="y" style="overflow:visible;">
    <all-braille x="0" y="0"/>
    <letter :size="_$.size" v-html="LetterArray()" dx="0" dy="0"/>
    <g v-for="(j, j2) in [-1, 0, 1]" :key="j2">
      <letter
        :size="_$.size"
        v-html="LetterArray(j2)"
        :dx="_$.x1 - 1.5 + 'mm'"
        :dy="j * _$.y1 + 'mm'"
      />
      <!-- ^made room for number _$.x1-? -->
      <letter
        v-for="(k, k2) in [-1, 0, 1]"
        :key="k2"
        :size="_$.size"
        v-html="LetterArray(j2, k2)"
        :dx="+_$.x1 + +_$.x2 + 'mm'"
        :dy="k * _$.y2 + j * _$.y1 + 'mm'"
      />
    </g>
  </svg>
</template>

<script>
import Letter from './Letter.vue'
import Tree from './Tree.vue'
import AllBraille from './AllBraille.vue'

// retruns SVG-subscript html for numbers
const rawHtml = function(size, number) {
  // <tspan baseline-shift="sub" :font-_$.size="_$.size / 2 + 'mm'" dx="-1em">
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

/* eslint-disable vue/no-unused-components */
export default {
  components: {
    Letter,
    Tree,
    AllBraille
  },
  props: ['x', 'y'],
  methods: {
    // Top-2-Bottom
    LetterArray: function(for1, for2) {
      if (typeof for1 === 'undefined') {
        // First cell
        const init = [' ', "'", '-', '']
        const disp = +this._$.gap + +this._$.size + 3 // column displacement
        return (
          init[0] +
          `<tspan x="${-disp}mm" dy='3.5mm' > ${init[1]} </tspan>` +
          `<tspan x="${-disp / 2}mm" > ${init[2]} </tspan>`
        )
      } else if (typeof for2 === 'undefined') {
        // 1st branch cells
        const range = [0, 1, 2, 3]
        const [col1, col2, col3, num] = range.map(i => findGlyph(i, for1))
        const x = +this._$.x1 + 2 // 2nd branch location
        const disp = +this._$.gap + +this._$.size - 3 // column displacement
        return (
          `<tspan x="${x - disp * 1.5}mm" dy='12mm'> ${col1 +
            rawHtml(this._$.size / 2, num)} </tspan>` +
          `<tspan x="${x - disp * 2}mm" dy='8mm'> ${col2} </tspan>` +
          `<tspan x="${x - disp}mm"> ${col3} </tspan>`
        ) // dy affexts both <tspan> for some reason...?
      } else {
        // 2nd branch cells
        /* eslint-disable one-var, no-var, no-redeclare */
        const range = [0, 1, 2, 3]
        var [col1, col2, col3, num] = range.map(i => findGlyph(i, for1, for2))
        const x = +this._$.x1 + +this._$.x2 // 2nd branch location
        const disp = +this._$.gap + +this._$.size + 1 // column displacement
        return (
          `<tspan x="${x + disp}mm" dy='3.5mm' > ${col1 +
            rawHtml(this._$.size / 2, num)} </tspan>` +
          `<tspan x="${x + disp * 2}mm" > ${col2} </tspan>` +
          `<tspan x="${x + disp * 3}mm" > ${col3} </tspan>`
        )
      }
    }
  }
}
</script>
