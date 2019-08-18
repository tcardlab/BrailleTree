<template>
  <div class="container">
    <svg id="htmlsvg" :width="compwidth + 'mm'" :height="compheight + 'mm'">
      <Tree
        v-if="_$.vuebraille == 1"
        :x="_$.boarder + 'mm'"
        :y="compheight / 2 - 3.25 + 'mm'"
        :x1="_$.x1"
        :y1="_$.y1"
        :x2="_$.x2"
        :y2="_$.y2"
        :vueblank="_$.vueblank"
        :display="_$.display"
      ></Tree>
      <branches
        :x="_$.boarder + 'mm'"
        :y="compheight / 2 - 3.25 + 'mm'"
      ></branches>
    </svg>
    vuex store: {{ $store.state.x1 }}
    {{ this._$.x1 }}
    {{ this._$.y1 }}
    {{ _$.y1 }}
  </div>
</template>

<script>
import Tree from '~/components/Tree.vue'
import Branches from '~/components/Branches.vue'

export default {
  components: {
    Tree,
    Branches
  },
  computed: {
    compheight() {
      return 2 * (+this._$.y1 + +this._$.y2 + 3.25 + +this._$.boarder) // 6.5 or 3.25?
    },
    compwidth() {
      return +this._$.x1 + +this._$.x2 + 4 + 2 * this._$.boarder
    },
  }
}
</script>
