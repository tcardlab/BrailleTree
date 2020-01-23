<template>
  <b-container class="editor-page">
    <b-row class="format-row">
      <b-col class="format-col" md="4">
        <div>
          <h2 align="center">Editor</h2>
          <hr>
          <Formatter/>
        </div>
        
        <div align="right">
          <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            />
            <!--Bootstrap button-->
          <b-button
            ref="dwnld"
            class="btn"
            href="#htmlsvg"
            @click="downloadSVG()"
            download="BrailleTree"
          >
            <i class="fa fa-download" />
            Download
          </b-button>
        </div>
      </b-col>
     <!--  <b-col align="right" md="1">
        <div class="vl"/>
      </b-col> -->
      <b-col align="center"  class="svg-col " md="8"> 
        <BrailleTree ref="htmlsvg"/>

        <div>
          <div>
            <h4>Braille <base-checkbox v-model="_$.vuealph" :disable="_$.display==='5'? true:false"/> Letters</h4>
          </div>

          <label>display</label>
          <input v-model="_$.display" type="range" min="0" max="5" />
          <span>{{ ["#'s", 'A-J', 'K-T', 'U-Z', 'All', 'All2'][_$.display] }}</span>
        </div>
      </b-col>
    </b-row>
  </b-container>


    
    
    <!-- 
    <b-button v-b-toggle.collapse-1 variant="primary">Advanced</b-button>
    <div>
      <b-collapse id="collapse-1" class="mt-2">
        <b-card>
          <Formatter/>
        </b-card>
      </b-collapse>
    </div> -->
</template>

<script>
import Formatter from '~/components/BrailleTree/Formatter.vue'
import BrailleTree from '~/components/BrailleTree/BrailleTree.vue'
import BaseCheckbox from '~/components/BrailleTree/BaseCheckbox.vue'

export default {
  layout: 'basic',
  components: {
    Formatter,
    BrailleTree,
    BaseCheckbox
  },
  methods: {
    /* eslint-disable no-unused-vars, no-var */
    downloadSVG() {
      var svgRoot = this.$refs.htmlsvg.$el //ref identifies component, el gets its child svg
      var svgSource = svgRoot.outerHTML
      var svgDataUri = 'data:image/svg+xml;base64,' + btoa(svgSource)
      var link = this.$refs.dwnld
      link.setAttribute('href', svgDataUri)
    }
  }
}
</script>

<style scoped>

.editor-page {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
  min-height: calc(100vh - 159px);
  height: auto;
}

.format-row {
  height: 640px
}

.format-col{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: lightgrey;
  /* outline: 2px solid grey; */
  border-width: 0px 2px 0px 0px;
  border-color: grey;
  border-style: solid;
  padding: 15px
}

.svg-col {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  justify-items: center;
  /* outline: 2px solid grey; */
  /* border-color: grey;
  border-style: solid;
  border-width: 2px 2px 2px 0px; */
}

.vl {
  border-left: 1px solid lightgrey;
  height: 100%;
  width: 50%
}

</style>