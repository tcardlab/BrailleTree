<!--Renders indevidual SVG letter-->
<template>
  <text
    :x="dx"
    :y="dy"
    :dx="2 - _$.size / 3 + 'mm'"
    :dy="3.25 + _$.size / 3 + 'mm'"
    :font-size="_$.size + 'mm'"
    v-if="_$.display < 4 && _$.vuealph == 1"
  >
    {{ LetterArray(_$.display, for1, for2) }}
  </text>
</template>

<script>
export default {
  props: ['for1', 'for2', 'dx', 'dy',],
  methods: {
    // Top-2-Bottom
    LetterArray: function(pick, for1, for2) {
      //Define Glyph set
      const numbers = '12,34567890.'.split(/'|/)
      let alph = 'AB,CDEFGHIJ.KL;MNOPQRST!UV?XYZ'
        .split(/'|/)
        .concat(['and', 'for', 'of', 'the', 'with', '(...)'])
      alph = numbers.concat(alph)
      //Assign to branch given location in set
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
