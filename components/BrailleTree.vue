<template>
  <svg
    ref="htmlsvg"
    :width="compwidth + 'mm'"
    :height="compheight + 'mm'"
    xmlns="http://www.w3.org/2000/svg"
  >

    <svg 
      :x="_$.boarder + 'mm'" 
      :y="compheight / 2 - 3.25 + 'mm'" 
      style="overflow:visible;">
      
        
      <!-- Init Cell -->
      <Cell2 :dx="0" :dy="0"/>
      <Letter2 dx="0" dy="0"/>

      <g v-for="(j, j2) in [-1, 0, 1]" :key="j2">
        <!--First Branch-->
        <Cell2 :for1="j2" :dx="_$.x1 + 'mm'" :dy="j * _$.y1 + 'mm'" />
        <Branch2 :for1="j" dx="0" dy="0" :id="_$.vuelabel ? ['Top', 'Both', 'Bottom'][j2] : ''"/>
        <Letter2 :for1="j2" :dx="_$.x1 + 'mm'" :dy="j * _$.y1 + 'mm'"/>

        <g v-for="(k, k2) in [-1, 0, 1]" :key="k2">
          <!--Second Branching-->
          <Cell2 :for1="j2" :for2="k2"
            :dx="+_$.x1 + +_$.x2 + 'mm'"
            :dy="k * _$.y2 + j * _$.y1 + 'mm'"
          />
          <Branch2 :for1="j2" :for2="k"
            :dx="_$.x1 + 'mm'"
            :dy="j * _$.y1 + 'mm'"
          />
          <Letter2 :for1="j2" :for2="k2"
            :dx="+_$.x1 + +_$.x2 + 'mm'"
            :dy="k * _$.y2 + j * _$.y1 + 'mm'"
          />
        </g>
      </g>
    </svg>


  </svg>
</template>




<script>
/* eslint-disable vue/no-unused-components */
import All from '~/components/All.vue'
import All2 from '~/components/All2.1.vue'
import Formatter from '~/components/Formatter.vue'
import Tree from '~/components/Tree.vue'
import Branches from '~/components/Branches.vue'
import AllBraille from '~/components/AllBraille.vue'
/* eslint-disable vue/no-unused-components */
import Cell2 from './Cell2.vue'
import Branch2 from './Branch2.vue'
import Letter2 from '~/components/Letter2.vue'

export default {
  components: {
    Tree,
    All,
    All2,
    Formatter,
    Branches,
    AllBraille,
    Cell2,
    Branch2,
    Letter2,
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