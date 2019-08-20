<!--Renders indevidual Braille Cells-->
<template>
  <svg :x="dx" :y="dy" style="overflow:visible;"
    v-if="_$.display < 4 && _$.vuealph == 0">
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
    <g v-html="rawhtml"></g>
  </svg>
</template>

<script>
export default {
  props: ['for1', 'for2', 'dx', 'dy', 'rawhtml'],
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