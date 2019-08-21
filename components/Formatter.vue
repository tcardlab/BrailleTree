<!--
Renders a series of sliders and toggles to 
adjust dimensions and format visability of
BrailleTree features
-->

<template>
  <div>
      <div v-for = "(v,k) in slider" :key="k" >
        <label>{{ k }}</label>
        <input v-model="_$[v.model]" type="range" :min="v.range[0]" :max="v.range[1]" :step="v.step" />
        <span>{{ _$[v.model] }} mm</span>
      </div>

      <div>
        <!-- 
          to prevent "both" arrow from inverting, gap:[–>] inverted: ]<–[
          get min of x1 and x2 and determin max allowed value
        -->
        <label>gap</label>
        <input
          v-model="_$.gap"
          type="range"
          min="0"
          :max="Math.min(_$.x1, _$.x2) / 2 - 2"
          step="0.25"
        />
        <span>{{ _$.gap }} mm</span>
      </div>

      <div v-for = "(v,k) in toggle" :key="k" >
        <base-checkbox v-model="_$[k]" />
        <h4>{{v}}</h4>
      </div>

      <div>
        <h4>Braille <base-checkbox v-model="_$.vuealph" /> Letters</h4>
      </div>
    </div>
</template>

<script>
import BaseCheckbox from '~/components/BaseCheckbox.vue'

export default {
  components: {
    BaseCheckbox
  },
  data(){
    return {
      slider:{
        x1:{
          model: 'x1',
          range: [10, 30]
        },
        x2:{
          model: 'x2',
          range: [10, 18]
        },
        y1:{
          model: 'y1',
          range: [10, 40]
        },
        y2:{
          model: 'y2',
          range: [10, 20]
        },
        width:{
          model: 'width',
          range: [0, 6.5],
          step: 0.25,
        },
        "Font Size": {
          model: 'size',
          range: [4, 8],
          step: 0.25,
        },
      },
      toggle:{
        vueblank: "Toggle Outline",
        vuepath: "Toggle Paths",
        vuelabel: "Toggle lables"
      },
    }
  },
}
</script>