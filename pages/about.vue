<template>
  <div class="container">
    <div>
      <div>
        <label>x1</label>
        <input v-model="_$.x1" type="range" min="10" max="30" />
        <span>{{ _$.x1 }}</span>
      </div>
      <div>
        <label>x2</label>
        <input v-model="_$.x2" type="range" min="10" max="18" />
        <span>{{ _$.x2 }}</span>
      </div>
      <div>
        <label>y1</label>
        <input v-model="_$.y1" type="range" min="10" max="40" />
        <span>{{ _$.y1 }}</span>
      </div>
      <div>
        <label>y2</label>
        <input v-model="_$.y2" type="range" min="10" max="20" />
        <span>{{ _$.y2 }}</span>
      </div>
      <div>
        <label>width</label>
        <input v-model="_$.width" type="range" min="0" max="6.5" step="0.25" />
        <span>{{ _$.width }}</span>
      </div>
      <div>
        <label>gap</label>
        <!--or if x1/2-2 if it is smaller...-->
        <input
          v-model="_$.gap"
          type="range"
          min="0"
          :max="Math.min(_$.x1, _$.x2) / 2 - 2"
          step="0.25"
        />
        <span>{{ _$.gap }}mm</span>
      </div>
      <div>
        <label>font size</label>
        <input v-model="_$.size" type="range" min="4" max="8" step="0.25" />
        <span>{{ _$.size }}mm</span>
      </div>

      <base-checkbox v-model="_$.vueblank" />
      <h4>Toggle Outline</h4>

      <base-checkbox v-model="_$.vuepath" />
      <h4>Toggle Paths</h4>

      <base-checkbox v-model="_$.vuelabel" />
      <h4>Toggle lables</h4>

      <h4>Braille <base-checkbox v-model="_$.vuealph" /> Letters</h4>
    </div>

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
