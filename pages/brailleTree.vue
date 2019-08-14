<template>
  <div class="container">
    <svg id="htmlsvg" :width="compwidth + 'mm'" :height="compheight + 'mm'">
      <Tree
        v-if="vuebraille == 1"
        :x="boarder + 'mm'"
        :y="compheight / 2 - 3.25 + 'mm'"
        :x1="x1"
        :y1="yGroup"
        :x2="x2"
        :y2="yInner"
        :vueblank="vueblank"
        :display="display"
      ></Tree>
      <branches
        :x="boarder + 'mm'"
        :y="compheight / 2 - 3.25 + 'mm'"
        :x1="x1"
        :y1="yGroup"
        :x2="x2"
        :y2="yInner"
        :gap="gap"
        :width="width"
        :size="size"
        :vuelabel="vuelabel"
        :vuepath="vuepath"
      ></branches>
    </svg>
  </div>
</template>

<script>
import Tree from '~/components/Tree.vue'
import Branches from '~/components/Branches.vue'

export default {
  name: 'test',
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
      yGroup: 36, // 35
      yInner: 12, // 10
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
    compheight() {
      return 2 * (+this.yGroup + +this.yInner + 3.25 + +this.boarder) // 6.5 or 3.25?
    },
    compwidth() {
      return +this.x1 + +this.x2 + 4 + 2 * this.boarder
    }
  }
}
</script>
