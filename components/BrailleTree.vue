<template>
  <svg
    ref="htmlsvg"
    :width="compwidth + 'mm'"
    :height="compheight + 'mm'"
    xmlns="http://www.w3.org/2000/svg"
  >
    <svg :x="_$.boarder + 'mm'" :y="compheight / 2 - 3.25 + 'mm'" style="overflow:visible;"> 
      <!-- Init Cell -->
      <Cell :dx="0" :dy="0"/>
      <Letter dx="0" dy="0"/>

      <g v-for="(j, j2) in [-1, 0, 1]" :key="j2">
        <!--First Branch-->
        <Cell :for1="j2" :dx="_$.x1 + 'mm'" :dy="j * _$.y1 + 'mm'" />
        <Branch :for1="j" dx="0" dy="0" :id="_$.vuelabel ? ['Top', 'Both', 'Bottom'][j2] : ''"/>
        <Letter :for1="j2" :dx="_$.x1 + 'mm'" :dy="j * _$.y1 + 'mm'"/>

        <g v-for="(k, k2) in [-1, 0, 1]" :key="k2">
          <!--Second Branching-->
          <Cell :for1="j2" :for2="k2"
            :dx="+_$.x1 + +_$.x2 + 'mm'"
            :dy="k * _$.y2 + j * _$.y1 + 'mm'"
          />
          <Branch :for1="j2" :for2="k"
            :dx="_$.x1 + 'mm'"
            :dy="j * _$.y1 + 'mm'"
          />
          <Letter :for1="j2" :for2="k2"
            :dx="+_$.x1 + +_$.x2 + 'mm'"
            :dy="k * _$.y2 + j * _$.y1 + 'mm'"
          />
        </g>
      </g>
    </svg>
  </svg>
</template>

<script>
import Cell from './Cell.vue'
import Branch from './Branch.vue'
import Letter from '~/components/Letter.vue'

export default {
  components: {
    Cell,
    Branch,
    Letter,
  },
  computed: {
    compheight() {
      // moved boarder out of multiplication it needs to be large for All
      return 2 * (+this._$.y1 + +this._$.y2 + 3.25) + +this._$.boarder
    },
    compwidth() {
      if (this._$.display > '3') {
        const initial = +this._$.x1 + +this._$.x2 + 4 + 2 * this._$.boarder
        const expanded = 2 * (+this._$.gap + +this._$.size + 1)
        return initial + expanded // extra width for All, give 2 extra columns
      } else {
        return +this._$.x1 + +this._$.x2 + 4 + 2 * this._$.boarder
      }
    },
  }
}
</script>