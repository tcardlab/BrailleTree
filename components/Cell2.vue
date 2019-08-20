<!--Renders indevidual Braille Cells-->
<template>
  <svg :x="dx" :y="dy" style="overflow:visible;"
    v-if="_$.vuealph == 0">
    <circle
      v-for="(dot, i) in BinaryArray(for1, for2)"
      :key="(dot, i)"
      :display="dot === '' ? 'none' : 'visible'"
      :fill="dot ? 'black' : 'none'"
      :cx="i > 2 ? '3.25mm' : '0.75mm'"
      :cy="(i % 3) * 2.5 + 0.75 + 'mm'"
      :stroke="_$.vueblank ? 'black' : 'none'"
      r="0.75mm"
    />
    <g v-if="_$.display > 3" v-html="Iterate(for1, for2)"></g>
  </svg>
</template>

<script>
// html of each dot in iterCell
const Dot = function(dot, i, dx, stroke, dy) {
  const fill = ['none', 'black'][dot]
  const cx = i > 2 ? 3.25 : 0.75
  const cy = (i % 3) * 2.5 + 0.75
  dy = typeof dy === 'undefined' ? 0 : dy
  return `<circle 
            r="0.75mm" 
            fill=${fill}
            stroke=${stroke}
            cx="${cx + dx}mm"
            cy="${cy + dy}mm"
          />`
}

// Recreation of Cell as components cannot be passed through v-html
const iterCell = function(arr, dx, stroke, dy) {
  let rawhtml = ''
  let i
  for (i = 0; i < arr.length; i++) {
    if (arr[i] in [0, 1]) {
      rawhtml += Dot(arr[i], i, dx, stroke, dy)
    }
  }
  return rawhtml
}

export default {
  props: ['for1', 'for2', 'dx', 'dy', 'rawhtml'],
  methods: {
    // Top-2-Bottom
    BinaryArray: function(for1, for2, display) {
      //Note: 'Binarray' is called in 'Iterate', hence the 'display' parameter.
      display = typeof display === 'undefined' ? this._$.display : display
      const [dot3, dot6] = [[0, 0], [0, 0], [1, 0], [1, 1], [0, 0], [0, 0]][display]
      if (typeof for1 === 'undefined') {
        // First cell
        const cell1 = [0, 0, dot3, 0, 0, dot6]
        const numsign = [0, 0, 1, 1, 1, 1]
        return +this._$.display === 0 ? numsign : cell1
      } else if (typeof for2 === 'undefined') {
        //     [Top, 2, Bottom]choose + dots[3, [4,5], 6]
        const lst = [[1, 0], [1, 1], [0, 1]][for1].concat(
          [dot3],
          [0, 0],
          [dot6]
        )
        return lst // 1st branch cells
      } else {
        //     [T,2,B]choose + dot3 + [T,2,B]choose2 + 6
        const lst = [[1, 0], [1, 1], [0, 1]][for1].concat(
          [dot3],
          [[1, 0], [1, 1], [0, 1]][for2],
          [dot6]
        )
        return lst // 2nd branch cells
      }
    },
    Iterate: function(for1, for2) {
      /* eslint-disable no-unused-vars, no-var, prefer-const */
      // _$.display == 5 add dots bellow letter
      const stroke = this._$.vueblank ? 'black' : 'none'
      var cell0 = ['', '', 0, '', '', 0]
      var cell1 = ['', '', 1, '', '', 0]
      var cell2 = ['', '', 1, '', '', 1]
      // _$.display == 4 add whole cell
      if (+this._$.display === 4) {
        cell0 = this.BinaryArray(for1, for2, 1)
        cell1 = this.BinaryArray(for1, for2, 2)
        cell2 = this.BinaryArray(for1, for2, 3)
      }
      if (typeof for1 === 'undefined') {
        // First cell
        const dx = +this._$.gap + +this._$.size + 4 // column displacement
        return iterCell(cell1, -dx, stroke) + iterCell(cell2, -dx / 2, stroke)
      } else if (typeof for2 === 'undefined') {
        // 1st branch cells
        const x = +this._$.x1 + 2 // 2nd branch location
        const dx = +this._$.gap + +this._$.size - 3 // column displacement
        const dy = +this._$.display === 4 ? 11 : 17
        return (
          iterCell(cell2, -dx + 2.4, stroke, dy) +
          // iterCell(cell0, -dx * 1.5 - 1, stroke, 8) +
          iterCell(cell1, -dx * 2 + 2, stroke, dy)
        )
      } else {
        // 2nd branch cells
        const x = +this._$.x1 + +this._$.x2 // 2nd branch location
        const dx = +this._$.gap + +this._$.size + 1.1 // column displacement
        if (+this._$.display === 5) {
          return (
            iterCell(cell0, dx, stroke) +
            iterCell(cell1, dx * 2, stroke) +
            iterCell(cell2, dx * 3, stroke)
          )
        } else {
          return iterCell(cell1, dx, stroke) + iterCell(cell2, dx * 2, stroke)
        }
      }
    }
  }
}
</script>