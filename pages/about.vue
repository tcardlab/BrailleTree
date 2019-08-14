<template>
  <div class="container">
    <div>
      <div>
        <label>x1</label>
        <input v-model="x1" type="range" min="10" max="30" />
        <span>{{ x1 }}</span>
      </div>
      <div>
        <label>x2</label>
        <input v-model="x2" type="range" min="10" max="18" />
        <span>{{ x2 }}</span>
      </div>
      <div>
        <label>y1</label>
        <input v-model="yGroup" type="range" min="10" max="40" />
        <span>{{ yGroup }}</span>
      </div>
      <div>
        <label>y2</label>
        <input v-model="yInner" type="range" min="10" max="20" />
        <span>{{ yInner }}</span>
      </div>
      <div>
        <label>width</label>
        <input v-model="width" type="range" min="0" max="6.5" step="0.25" />
        <span>{{ width }}</span>
      </div>
      <div>
        <label>gap</label>
        <!--or if x1/2-2 if it is smaller...-->
        <input
          v-model="gap"
          type="range"
          min="0"
          :max="Math.min(x1, x2) / 2 - 2"
          step="0.25"
        />
        <span>{{ gap }}mm</span>
      </div>
      <div>
        <label>font size</label>
        <input v-model="size" type="range" min="4" max="8" step="0.25" />
        <span>{{ size }}mm</span>
      </div>

      <base-checkbox v-model="vueblank" />
      <h4>Toggle Outline</h4>

      <base-checkbox v-model="vuepath" />
      <h4>Toggle Paths</h4>

      <base-checkbox v-model="vuelabel" />
      <h4>Toggle lables</h4>

      <h4>Braille <base-checkbox v-model="vuealph" /> Letters</h4>

      <!--<base-checkbox v-model="vuebraille"></base-checkbox>
      <h4>Toggle braille</h4>-->
    </div>

    <svg
      ref="htmlsvg"
      :width="compwidth + 'mm'"
      :height="compheight + 'mm'"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!--Overflow does not work... so negatives dont show...-->
      <!--works in cli and codepen, nuxt issue?-->
      <Tree
        v-if="display < 4 && vuealph == 0"
        :x="boarder + 'mm'"
        :y="compheight / 2 - 3.25 + 'mm'"
        :x1="x1"
        :y1="yGroup"
        :x2="x2"
        :y2="yInner"
        :vueblank="vueblank"
        :display="display"
      />
      <!--need to add dot[3,6] selector-->
      <!--<choices ></choices> DELETE?-->

      <!--Doesnt show for some reason... oveflow?-->
      <!--works in cli and codepen, nuxt issue?-->
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
      />
      <!--add toggle labels-->

      <!--[0-10], [11-20], [21-25], numbers, all-->
      <letters
        v-if="display < 4 && vuealph == 1"
        :x="boarder + 'mm'"
        :y="compheight / 2 - 3.25 + 'mm'"
        :x1="x1"
        :y1="yGroup"
        :x2="x2"
        :y2="yInner"
        :size="size"
        :display="display"
      />

      <all
        v-if="display == 4 && vuealph == 1"
        :x="boarder + 'mm'"
        :y="compheight / 2 - 3.25 + 'mm'"
        :x1="x1"
        :y1="yGroup"
        :x2="x2"
        :y2="yInner"
        :size="size"
        :gap="gap"
      />

      <all-braille
        v-if="display == 4 && vuealph == 0"
        :x="boarder + 'mm'"
        :y="compheight / 2 - 3.25 + 'mm'"
        :x1="x1"
        :y1="yGroup"
        :x2="x2"
        :y2="yInner"
        :vueblank="vueblank"
        :display="display"
        :size="size"
        :gap="gap"
      />

      <all2
        v-if="display == 5"
        :x="boarder + 'mm'"
        :y="compheight / 2 - 3.25 + 'mm'"
        :x1="x1"
        :y1="yGroup"
        :x2="x2"
        :y2="yInner"
        :vueblank="vueblank"
        :size="size"
        :gap="gap"
      />
    </svg>
    <div>
      <label>display</label>
      <input v-model="display" type="range" min="0" max="5" />
      <span>{{ ["#'s", 'A-J', 'K-T', 'U-Z', 'All', 'All2'][display] }}</span>
    </div>

    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <!--Bootstrap button-->
    <a
      id="dwnld"
      class="btn"
      href="#htmlsvg"
      @click="downloadSVG()"
      download="BrailleTree"
    >
      <i class="fa fa-download" />
      Download
    </a>
  </div>
</template>

<script>
import All from '~/components/All.vue'
import All2 from '~/components/All2.1.vue'
import BaseCheckbox from '~/components/BaseCheckbox.vue'
import Letters from '~/components/Letters.vue'
import Tree from '~/components/Tree.vue'
import Branches from '~/components/Branches.vue'
import AllBraille from '~/components/AllBraille.vue'

export default {
  components: {
    Tree,
    Letters,
    All,
    All2,
    BaseCheckbox,
    Branches,
    AllBraille
  },
  data() {
    return {
      boarder: 20, // 3 or 10
      // tree
      x1: 25, // 25
      x2: 15, // 15
      yGroup: 36, // 35
      yInner: 12, // 10
      vueblank: true,
      vuebraille: true, // !vuealph and delete this or vice versa 1 switch
      display: 1, // #'s, A-J, K-T, U-Z, All[braille||Alph], All2[Both]
      // Branches
      width: 2.5,
      gap: 2.5,
      vuepath: true,
      // letters
      size: 7,
      vuealph: false,
      vuelabel: true
    }
  },
  computed: {
    compheight() {
      // moved boarder out of multiplication it needs to be large for All
      return 2 * (+this.yGroup + +this.yInner + 3.25) + +this.boarder
    },
    compwidth() {
      if (this.display > '3') {
        const initial = +this.x1 + +this.x2 + 4 + 2 * this.boarder
        const expanded = 2 * (+this.gap + +this.size + 1)
        return initial + expanded // extra width for All, give 2 extra columns
      } else {
        return +this.x1 + +this.x2 + 4 + 2 * this.boarder
      }
    }
  },
  methods: {
    /* eslint-disable no-unused-vars, no-var */
    downloadSVG: function() {
      // var svgRoot = document.getElementById('htmlsvg')
      var svgRoot = this.$refs.htmlsvg
      var svgSource = svgRoot.outerHTML
      var svgDataUri = 'data:image/svg+xml;base64,' + btoa(svgSource)
      var link = document.getElementById('dwnld')
      link.setAttribute('href', svgDataUri)
    }
  }
}
</script>
