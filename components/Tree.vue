<!--Renders all braille cells in Ternary Tree-->
<template>
  <svg :x="x" :y="y" style="overflow:visible;">
    <Cell :vueblank="_$.vueblank" :binarr="BinaryArray()" :dx="0" :dy="0" />
    <g v-for="(j, j2) in [-1, 0, 1]" :key="j2">
      <Cell
        :vueblank="_$.vueblank"
        :binarr="BinaryArray(j2)"
        :dx="_$.x1 + 'mm'"
        :dy="j * _$.y1 + 'mm'"
      />
      <Cell
        v-for="(k, k2) in [-1, 0, 1]"
        :key="k2"
        :binarr="BinaryArray(j2, k2)"
        :dx="+_$.x1 + +_$.x2 + 'mm'"
        :dy="k * _$.y2 + j * _$.y1 + 'mm'"
        :vueblank="_$.vueblank"
      />
    </g>
  </svg>
</template>

<script>
import Cell from './Cell.vue'

export default {
  components: {
    Cell
  },
  props: ['x', 'y'],
  methods: {
    // Top-2-Bottom
    BinaryArray: function(for1, for2) {
      if (this._$.display > 3) {
        /* eslint-disable no-console */
        console.log('tree cant take _$.display>3')
      }
      // NOTE: this controles bottom dots for non-all _$.displays
      const [dot3, dot6] = [[0, 0], [0, 0], [1, 0], [1, 1]][this._$.display]
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
    }
  }
}
</script>
