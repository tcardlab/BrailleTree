<template>
  <div class="container">
    <svg id="htmlsvg" :width="compwidth + 'mm'" :height="compheight + 'mm'">
      <Tree
        v-if="vuebraille == 1"
        :x="boarder + 'mm'"
        :y="compheight / 2 - 3.25 + 'mm'"
        :x1="x1"
        :y1="y1"
        :x2="x2"
        :y2="y2"
        :vueblank="vueblank"
        :display="display"
      ></Tree>
      <branches
        :x="boarder + 'mm'"
        :y="compheight / 2 - 3.25 + 'mm'"
        :x1="x1"
        :y1="y1"
        :x2="x2"
        :y2="y2"
        :gap="gap"
        :width="width"
        :size="size"
        :vuelabel="vuelabel"
        :vuepath="vuepath"
      ></branches>
    </svg>
    vuex store: {{ $store.state.x1 }}
    {{ this.x1 }}
    {{ this.y1 }}
    {{ _$.y1 }}
  </div>
</template>

<script>
import Tree from '~/components/Tree.vue'
import Branches from '~/components/Branches.vue'
//import StoreRoute from '~/store/storeRoute.js'

export default {
  components: {
    Tree,
    Branches
  },
  data() {
    return {
      boarder: 10, // 3
      // tree
      x1: 25, // 25
      x2: 15, // 15
      y1: 36,
      y2: 12, // 10
      vueblank: true,
      vuebraille: true,
      // Branches
      width: 2.5,
      gap: 1.5,
      vuepath: true,
      // letters
      size: 8,
      vuealph: false,
      vuelabel: true,
      display: 0 // 0(first 12),1(dot3),2(dot3&6),3(all)
    }
  },
  computed: {
    /*_$() {
      return this.$store.state
    },*/
    compheight() {
      return 2 * (+this.y1 + +this.y2 + 3.25 + +this.boarder) // 6.5 or 3.25?
    },
    compwidth() {
      return +this.x1 + +this.x2 + 4 + 2 * this.boarder
    },
    test() {
      return this.$store
    }
  }
}
</script>
