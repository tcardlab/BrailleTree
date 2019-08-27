<template>
  <div class="container">

    <Formatter/>
    
    <BrailleTree ref="htmlsvg"/>

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
      ref="dwnld"
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
import Formatter from '~/components/Formatter.vue'
import BrailleTree from '~/components/BrailleTree.vue'

export default {
  components: {
    Formatter,
    BrailleTree
  },
  methods: {
    /* eslint-disable no-unused-vars, no-var */
    downloadSVG() {
      var svgRoot = this.$refs.htmlsvg
      var svgSource = svgRoot.outerHTML
      var svgDataUri = 'data:image/svg+xml;base64,' + btoa(svgSource)
      var link = this.$refs.dwnld
      link.setAttribute('href', svgDataUri)
    }
  }
}
</script>
