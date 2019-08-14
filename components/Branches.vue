<!--Renders all branches and determines branch labels-->
<template>
  <svg
    :x="x"
    :y="y"
    style="overflow:visible;"
    :visibility="vuepath ? 'show' : 'hidden'"
  >
    <g v-for="(j, j2) in [-1, 0, 1]" :key="j2">
      <branch
        :dstr="dStr(j)"
        :id="vuelabel ? ['Top', 'Both', 'Bottom'][j2] : ''"
        :dx="0"
        :dy="0"
        :size="size"
      ></branch>
      <g v-for="k in [-1, 0, 1]" :key="k">
        <branch
          :dstr="dStr(j, k)"
          id
          :dx="x1 + 'mm'"
          :dy="j * y1 + 'mm'"
        ></branch>
      </g>
    </g>
  </svg>
</template>

<script>
import Branch from './Branch.vue'

export default {
  components: {
    Branch
  },
  props: [
    'x',
    'y',
    'x1',
    'y1',
    'x2',
    'y2',
    'vuelabel',
    'gap',
    'width',
    'size',
    'vuepath'
  ],
  methods: {
    /* eslint-disable eqeqeq, no-undef, no-unused-vars, 
       no-var, no-redeclare */
    dStr: function(j, k) {
      // Cell = 4mm x 6.5mm  /2=  2 x 3.25
      // Quadratic Curve
      //  pt1  bez   pt2   bez  pt3 close
      // 'M0,0 Q0,10 10,15 Q5,10 5,0 Z'
      if (typeof k === 'undefined') {
        // For primary branches
        var TBB = j
        var x = this.x1
        var y = j * this.y1
        var [bezX, bezY] = [4, 1.65]
      } else {
        // For secondary branches
        TBB = k
        x = this.x2
        y = k * this.y2
        var [bezX, bezY] = [3, 2]
      }

      if ((j == 0 && typeof k === 'undefined') || k == 0) {
        // For middle branch ie "Both"
        const xInit = +this.gap + +4
        const pt1 = `${xInit}, ${3.25 - this.width / 2}`
        const pt2 = `${x - this.gap}, 3.25`
        const pt3 = `${xInit}, ${3.25 + this.width / 2}`
        return `M${pt1} L${pt2} L${pt3}`
      } else {
        // For arced branch ie "Both"
        const yInit = 3.25 + TBB * 3.25 + TBB * this.gap
        const pt1 = `${2 - this.width / 2},${yInit}`
        const bez1 = `${x / (bezX + 2)},${yInit + y / bezY + TBB}` // `${x/6},${yInit+y/1.8+TBB}`
        const pt2 = `${x - this.gap},${y + 3.25}`
        const bez2 = `${x / bezX},${yInit + y / bezY}` // `${x/3.5},${yInit+y/1.8}`
        const pt3 = `${2 + this.width / 2},${yInit}` // half+-half+-gap
        return `M${pt1} Q${bez1} ${pt2} Q${bez2} ${pt3} Z`
      }
    }
  }
}
</script>
