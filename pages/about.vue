<template>
  <div class="container">

    <Formatter/>

    <svg
      ref="htmlsvg"
      :width="compwidth + 'mm'"
      :height="compheight + 'mm'"
      xmlns="http://www.w3.org/2000/svg"
    >

      <Tree
        v-if="_$.display < 4 && _$.vuealph == 0"
        :x="_$.boarder + 'mm'"
        :y="compheight / 2 - 3.25 + 'mm'"
      />

      <branches
        :x="_$.boarder + 'mm'"
        :y="compheight / 2 - 3.25 + 'mm'"
      />

      <letters
        v-if="_$.display < 4 && _$.vuealph == 1"
        :x="_$.boarder + 'mm'"
        :y="compheight / 2 - 3.25 + 'mm'"
      />

      <all
        v-if="_$.display == 4 && _$.vuealph == 1"
        :x="_$.boarder + 'mm'"
        :y="compheight / 2 - 3.25 + 'mm'"
      />

      <all-braille
        v-if="_$.display == 4 && _$.vuealph == 0"
        :x="_$.boarder + 'mm'"
        :y="compheight / 2 - 3.25 + 'mm'"
      />

      <all2
        v-if="_$.display == 5"
        :x="_$.boarder + 'mm'"
        :y="compheight / 2 - 3.25 + 'mm'"
      />
    </svg>



    <div>
      <label>display</label>
      <input v-model="_$.display" type="range" min="0" max="5" />
      <span>{{ ["#'s", 'A-J', 'K-T', 'U-Z', 'All', 'All2'][_$.display] }}</span>
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
import Formatter from '~/components/Formatter.vue'
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
    Formatter,
    Branches,
    AllBraille
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
    }
  },
  methods: {
    /* eslint-disable no-unused-vars, no-var */
    downloadSVG: function() {
      // var svgRoot = document.getElementById('htmlsvg')
      var svgRoot = this._$.$refs.htmlsvg
      var svgSource = svgRoot.outerHTML
      var svgDataUri = 'data:image/svg+xml;base64,' + btoa(svgSource)
      var link = document.getElementById('dwnld')
      link.setAttribute('href', svgDataUri)
    }
  }
}
</script>
